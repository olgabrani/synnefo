#!/usr/bin/env python

# Copyright 2011 GRNET S.A. All rights reserved.
#
# Redistribution and use in source and binary forms, with or
# without modification, are permitted provided that the following
# conditions are met:
#
#   1. Redistributions of source code must retain the above
#      copyright notice, this list of conditions and the following
#      disclaimer.
#
#   2. Redistributions in binary form must reproduce the above
#      copyright notice, this list of conditions and the following
#      disclaimer in the documentation and/or other materials
#      provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY GRNET S.A. ``AS IS'' AND ANY EXPRESS
# OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
# PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GRNET S.A OR
# CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
# LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
# USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
# AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
# LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
# ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
#
# The views and conclusions contained in the software and
# documentation are those of the authors and should not be
# interpreted as representing official policies, either expressed
# or implied, of GRNET S.A.

"""Perform integration testing on a running Synnefo deployment"""

import __main__
import datetime
import inspect
import logging
import os
import paramiko
import prctl
import subprocess
import signal
import socket
import struct
import sys
import time

from IPy import IP
from multiprocessing import Process, Queue
from random import choice

from kamaki.client import Client, ClientError
from vncauthproxy.d3des import generate_response as d3des_generate_response

# Use backported unittest functionality if Python < 2.7
try:
    import unittest2 as unittest
except ImportError:
    if sys.version_info < (2, 7):
        raise Exception("The unittest2 package is required for Python < 2.7")
    import unittest


API = None
TOKEN = None
DEFAULT_API = "http://127.0.0.1:8000/api/v1.1"

# A unique id identifying this test run
TEST_RUN_ID = datetime.datetime.strftime(datetime.datetime.now(),
                                         "%Y%m%d%H%M%S")
SNF_TEST_PREFIX = "snf-test-"

# Setup logging (FIXME - verigak)
logging.basicConfig(format="%(message)s")
log = logging.getLogger("burnin")
log.setLevel(logging.INFO)


class UnauthorizedTestCase(unittest.TestCase):
    def test_unauthorized_access(self):
        """Test access without a valid token fails"""
        c = Client(API, "123")
        with self.assertRaises(ClientError) as cm:
            c.list_servers()
        self.assertEqual(cm.exception.status, 401)


class ImagesTestCase(unittest.TestCase):
    """Test image lists for consistency"""
    @classmethod
    def setUpClass(cls):
        """Initialize kamaki, get (detailed) list of images"""
        log.info("Getting simple and detailed list of images")
        cls.client = Client(API, TOKEN)
        cls.images = cls.client.list_images()
        cls.dimages = cls.client.list_images(detail=True)

    def test_001_list_images(self):
        """Test image list actually returns images"""
        self.assertGreater(len(self.images), 0)

    def test_002_list_images_detailed(self):
        """Test detailed image list is the same length as list"""
        self.assertEqual(len(self.dimages), len(self.images))

    def test_003_same_image_names(self):
        """Test detailed and simple image list contain same names"""
        names = sorted(map(lambda x: x["name"], self.images))
        dnames = sorted(map(lambda x: x["name"], self.dimages))
        self.assertEqual(names, dnames)

    def test_004_unique_image_names(self):
        """Test images have unique names"""
        names = sorted(map(lambda x: x["name"], self.images))
        self.assertEqual(sorted(list(set(names))), names)

    def test_005_image_metadata(self):
        """Test every image has specific metadata defined"""
        keys = frozenset(["OS", "description", "size"])
        for i in self.dimages:
            self.assertTrue(keys.issubset(i["metadata"]["values"].keys()))


class FlavorsTestCase(unittest.TestCase):
    """Test flavor lists for consistency"""
    @classmethod
    def setUpClass(cls):
        """Initialize kamaki, get (detailed) list of flavors"""
        log.info("Getting simple and detailed list of flavors")
        cls.client = Client(API, TOKEN)
        cls.flavors = cls.client.list_flavors()
        cls.dflavors = cls.client.list_flavors(detail=True)

    def test_001_list_flavors(self):
        """Test flavor list actually returns flavors"""
        self.assertGreater(len(self.flavors), 0)

    def test_002_list_flavors_detailed(self):
        """Test detailed flavor list is the same length as list"""
        self.assertEquals(len(self.dflavors), len(self.flavors))

    def test_003_same_flavor_names(self):
        """Test detailed and simple flavor list contain same names"""
        names = sorted(map(lambda x: x["name"], self.flavors))
        dnames = sorted(map(lambda x: x["name"], self.dflavors))
        self.assertEqual(names, dnames)

    def test_004_unique_flavor_names(self):
        """Test flavors have unique names"""
        names = sorted(map(lambda x: x["name"], self.flavors))
        self.assertEqual(sorted(list(set(names))), names)

    def test_005_well_formed_flavor_names(self):
        """Test flavors have names of the form CxxRyyDzz

        Where xx is vCPU count, yy is RAM in MiB, zz is Disk in GiB

        """
        for f in self.dflavors:
            self.assertEqual("C%dR%dD%d" % (f["cpu"], f["ram"], f["disk"]),
                             f["name"],
                             "Flavor %s does not match its specs." % f["name"])


class ServersTestCase(unittest.TestCase):
    """Test server lists for consistency"""
    @classmethod
    def setUpClass(cls):
        """Initialize kamaki, get (detailed) list of servers"""
        log.info("Getting simple and detailed list of servers")
        cls.client = Client(API, TOKEN)
        cls.servers = cls.client.list_servers()
        cls.dservers = cls.client.list_servers(detail=True)

    def test_001_list_servers(self):
        """Test server list actually returns servers"""
        self.assertGreater(len(self.servers), 0)

    def test_002_list_servers_detailed(self):
        """Test detailed server list is the same length as list"""
        self.assertEqual(len(self.dservers), len(self.servers))

    def test_003_same_server_names(self):
        """Test detailed and simple flavor list contain same names"""
        names = sorted(map(lambda x: x["name"], self.servers))
        dnames = sorted(map(lambda x: x["name"], self.dservers))
        self.assertEqual(names, dnames)


# This class gets replicated into actual TestCases dynamically
class SpawnServerTestCase(unittest.TestCase):
    """Test scenario for server of the specified image"""

    @classmethod
    def setUpClass(cls):
        """Initialize a kamaki instance"""
        log.info("Spawning server for image `%s'", cls.imagename)
        cls.client = Client(API, TOKEN)

    def _get_ipv4(self, server):
        """Get the public IPv4 of a server from the detailed server info"""
        public_addrs = filter(lambda x: x["id"] == "public",
                              server["addresses"]["values"])
        self.assertEqual(len(public_addrs), 1)
        ipv4_addrs = filter(lambda x: x["version"] == 4,
                            public_addrs[0]["values"])
        self.assertEqual(len(ipv4_addrs), 1)
        return ipv4_addrs[0]["addr"]

    def _get_ipv6(self, server):
        """Get the public IPv6 of a server from the detailed server info"""
        public_addrs = filter(lambda x: x["id"] == "public",
                              server["addresses"]["values"])
        self.assertEqual(len(public_addrs), 1)
        ipv6_addrs = filter(lambda x: x["version"] == 6,
                            public_addrs[0]["values"])
        self.assertEqual(len(ipv6_addrs), 1)
        return ipv6_addrs[0]["addr"]

    def _connect_loginname(self, os):
        """Return the login name for connections based on the server OS"""
        if os in ("ubuntu", "kubuntu", "fedora"):
            return "user"
        elif os == "windows":
            return "Administrator"
        else:
            return "root"

    def _verify_server_status(self, current_status, new_status):
        """Verify a server has switched to a specified status"""
        server = self.client.get_server_details(self.serverid)
        if server["status"] not in (current_status, new_status):
            return None  # Do not raise exception, return so the test fails
        self.assertEquals(server["status"], new_status)

    def _get_connected_tcp_socket(self, family, host, port):
        """Get a connected socket from the specified family to host:port"""
        sock = None
        for res in \
            socket.getaddrinfo(host, port, family, socket.SOCK_STREAM, 0,
                               socket.AI_PASSIVE):
            af, socktype, proto, canonname, sa = res
            try:
                sock = socket.socket(af, socktype, proto)
            except socket.error as msg:
                sock = None
                continue
            try:
                sock.connect(sa)
            except socket.error as msg:
                sock.close()
                sock = None
                continue
        self.assertIsNotNone(sock)
        return sock

    def _ping_once(self, ipv6, ip):
        """Test server responds to a single IPv4 or IPv6 ping"""
        cmd = "ping%s -c 2 -w 3 %s" % ("6" if ipv6 else "", ip)
        ping = subprocess.Popen(cmd, shell=True,
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        (stdout, stderr) = ping.communicate()
        ret = ping.wait()
        self.assertEquals(ret, 0)

    def _get_hostname_over_ssh(self, hostip, username, password):
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        try:
            ssh.connect(hostip, username=username, password=password)
        except socket.error:
            raise AssertionError
        stdin, stdout, stderr = ssh.exec_command("hostname")
        lines = stdout.readlines()
        self.assertEqual(len(lines), 1)
        return lines[0]

    def _try_until_timeout_expires(self, warn_timeout, fail_timeout,
                                   opmsg, callable, *args, **kwargs):
        if warn_timeout == fail_timeout:
            warn_timeout = fail_timeout + 1
        warn_tmout = time.time() + warn_timeout
        fail_tmout = time.time() + fail_timeout
        while True:
            self.assertLess(time.time(), fail_tmout,
                            "operation `%s' timed out" % opmsg)
            if time.time() > warn_tmout:
                log.warning("Server %d: `%s' operation `%s' not done yet",
                            self.serverid, self.servername, opmsg)
            try:
                log.info("%s... " % opmsg)
                return callable(*args, **kwargs)
            except AssertionError:
                pass
            time.sleep(self.query_interval)

    def _insist_on_tcp_connection(self, family, host, port):
        familystr = {socket.AF_INET: "IPv4", socket.AF_INET6: "IPv6",
                     socket.AF_UNSPEC: "Unspecified-IPv4/6"}
        msg = "connect over %s to %s:%s" % \
              (familystr.get(family, "Unknown"), host, port)
        sock = self._try_until_timeout_expires(
                self.action_timeout, self.action_timeout,
                msg, self._get_connected_tcp_socket,
                family, host, port)
        return sock

    def _insist_on_status_transition(self, current_status, new_status,
                                    fail_timeout, warn_timeout=None):
        msg = "Server %d: `%s', waiting for %s -> %s" % \
              (self.serverid, self.servername, current_status, new_status)
        if warn_timeout is None:
            warn_timeout = fail_timeout
        self._try_until_timeout_expires(warn_timeout, fail_timeout,
                                        msg, self._verify_server_status,
                                        current_status, new_status)
        # Ensure the status is actually the expected one
        server = self.client.get_server_details(self.serverid)
        self.assertEquals(server["status"], new_status)

    def _insist_on_ssh_hostname(self, hostip, username, password):
        msg = "SSH to %s, as %s/%s" % (hostip, username, password)
        hostname = self._try_until_timeout_expires(
                self.action_timeout, self.action_timeout,
                msg, self._get_hostname_over_ssh,
                hostip, username, password)

        # The hostname must be of the form 'prefix-id'
        self.assertTrue(hostname.endswith("-%d\n" % self.serverid))

    def _skipIf(self, condition, msg):
        if condition:
            self.skipTest(msg)

    def test_001_submit_create_server(self):
        """Test submit create server request"""
        server = self.client.create_server(self.servername, self.flavorid,
                                           self.imageid, self.personality)
        self.assertEqual(server["name"], self.servername)
        self.assertEqual(server["flavorRef"], self.flavorid)
        self.assertEqual(server["imageRef"], self.imageid)
        self.assertEqual(server["status"], "BUILD")

        # Update class attributes to reflect data on building server
        cls = type(self)
        cls.serverid = server["id"]
        cls.username = None
        cls.passwd = server["adminPass"]

    def test_002a_server_is_building_in_list(self):
        """Test server is in BUILD state, in server list"""
        servers = self.client.list_servers(detail=True)
        servers = filter(lambda x: x["name"] == self.servername, servers)
        self.assertEqual(len(servers), 1)
        server = servers[0]
        self.assertEqual(server["name"], self.servername)
        self.assertEqual(server["flavorRef"], self.flavorid)
        self.assertEqual(server["imageRef"], self.imageid)
        self.assertEqual(server["status"], "BUILD")

    def test_002b_server_is_building_in_details(self):
        """Test server is in BUILD state, in details"""
        server = self.client.get_server_details(self.serverid)
        self.assertEqual(server["name"], self.servername)
        self.assertEqual(server["flavorRef"], self.flavorid)
        self.assertEqual(server["imageRef"], self.imageid)
        self.assertEqual(server["status"], "BUILD")

    def test_002c_set_server_metadata(self):
        image = self.client.get_image_details(self.imageid)
        os = image["metadata"]["values"]["OS"]
        loginname = image["metadata"]["values"].get("loginname", None)
        self.client.update_server_metadata(self.serverid, OS=os)

        # Determine the username to use for future connections
        # to this host
        cls = type(self)
        cls.username = loginname
        if not cls.username:
            cls.username = self._connect_loginname(os)
        self.assertIsNotNone(cls.username)

    def test_002d_verify_server_metadata(self):
        """Test server metadata keys are set based on image metadata"""
        servermeta = self.client.get_server_metadata(self.serverid)
        imagemeta = self.client.get_image_metadata(self.imageid)
        self.assertEqual(servermeta["OS"], imagemeta["OS"])

    def test_003_server_becomes_active(self):
        """Test server becomes ACTIVE"""
        self._insist_on_status_transition("BUILD", "ACTIVE",
                                         self.build_fail, self.build_warning)

    def test_003a_get_server_oob_console(self):
        """Test getting OOB server console over VNC

        Implementation of RFB protocol follows
        http://www.realvnc.com/docs/rfbproto.pdf.

        """
        console = self.client.get_server_console(self.serverid)
        self.assertEquals(console['type'], "vnc")
        sock = self._insist_on_tcp_connection(socket.AF_UNSPEC,
                                        console["host"], console["port"])

        # Step 1. ProtocolVersion message (par. 6.1.1)
        version = sock.recv(1024)
        self.assertEquals(version, 'RFB 003.008\n')
        sock.send(version)

        # Step 2. Security (par 6.1.2): Only VNC Authentication supported
        sec = sock.recv(1024)
        self.assertEquals(list(sec), ['\x01', '\x02'])

        # Step 3. Request VNC Authentication (par 6.1.2)
        sock.send('\x02')

        # Step 4. Receive Challenge (par 6.2.2)
        challenge = sock.recv(1024)
        self.assertEquals(len(challenge), 16)

        # Step 5. DES-Encrypt challenge, use password as key (par 6.2.2)
        response = d3des_generate_response(
            (console["password"] + '\0' * 8)[:8], challenge)
        sock.send(response)

        # Step 6. SecurityResult (par 6.1.3)
        result = sock.recv(4)
        self.assertEquals(list(result), ['\x00', '\x00', '\x00', '\x00'])
        sock.close()

    def test_004_server_has_ipv4(self):
        """Test active server has a valid IPv4 address"""
        server = self.client.get_server_details(self.serverid)
        ipv4 = self._get_ipv4(server)
        self.assertEquals(IP(ipv4).version(), 4)

    def test_005_server_has_ipv6(self):
        """Test active server has a valid IPv6 address"""
        server = self.client.get_server_details(self.serverid)
        ipv6 = self._get_ipv6(server)
        self.assertEquals(IP(ipv6).version(), 6)

    def test_006_server_responds_to_ping_IPv4(self):
        """Test server responds to ping on IPv4 address"""
        server = self.client.get_server_details(self.serverid)
        ip = self._get_ipv4(server)
        self._try_until_timeout_expires(self.action_timeout,
                                        self.action_timeout,
                                        "PING IPv4 to %s" % ip,
                                        self._ping_once,
                                        False, ip)

    def test_007_server_responds_to_ping_IPv6(self):
        """Test server responds to ping on IPv6 address"""
        server = self.client.get_server_details(self.serverid)
        ip = self._get_ipv6(server)
        self._try_until_timeout_expires(self.action_timeout,
                                        self.action_timeout,
                                        "PING IPv6 to %s" % ip,
                                        self._ping_once,
                                        True, ip)

    def test_008_submit_shutdown_request(self):
        """Test submit request to shutdown server"""
        self.client.shutdown_server(self.serverid)

    def test_009_server_becomes_stopped(self):
        """Test server becomes STOPPED"""
        self._insist_on_status_transition("ACTIVE", "STOPPED",
                                         self.action_timeout,
                                         self.action_timeout)

    def test_010_submit_start_request(self):
        """Test submit start server request"""
        self.client.start_server(self.serverid)

    def test_011_server_becomes_active(self):
        """Test server becomes ACTIVE again"""
        self._insist_on_status_transition("STOPPED", "ACTIVE",
                                         self.action_timeout,
                                         self.action_timeout)

    def test_011a_server_responds_to_ping_IPv4(self):
        """Test server OS is actually up and running again"""
        self.test_006_server_responds_to_ping_IPv4()

    def test_012_ssh_to_server_IPv4(self):
        """Test SSH to server public IPv4 works, verify hostname"""
        self._skipIf(self.is_windows, "only valid for Linux servers")
        server = self.client.get_server_details(self.serverid)
        self._insist_on_ssh_hostname(self._get_ipv4(server),
                                     self.username, self.passwd)

    def test_013_ssh_to_server_IPv6(self):
        """Test SSH to server public IPv6 works, verify hostname"""
        self._skipIf(self.is_windows, "only valid for Linux servers")
        server = self.client.get_server_details(self.serverid)
        self._insist_on_ssh_hostname(self._get_ipv6(server),
                                     self.username, self.passwd)

    def test_014_rdp_to_server_IPv4(self):
        "Test RDP connection to server public IPv4 works"""
        self._skipIf(not self.is_windows, "only valid for Windows servers")
        server = self.client.get_server_details(self.serverid)
        ipv4 = self._get_ipv4(server)
        sock = _insist_on_tcp_connection(socket.AF_INET, ipv4, 3389)

        # No actual RDP processing done. We assume the RDP server is there
        # if the connection to the RDP port is successful.
        # FIXME: Use rdesktop, analyze exit code? see manpage [costasd]
        sock.close()

    def test_015_rdp_to_server_IPv6(self):
        "Test RDP connection to server public IPv6 works"""
        self._skipIf(not self.is_windows, "only valid for Windows servers")
        server = self.client.get_server_details(self.serverid)
        ipv6 = self._get_ipv6(server)
        sock = _get_tcp_connection(socket.AF_INET6, ipv6, 3389)

        # No actual RDP processing done. We assume the RDP server is there
        # if the connection to the RDP port is successful.
        sock.close()

    def test_016_personality_is_enforced(self):
        """Test file injection for personality enforcement"""
        self._skipIf(self.is_windows, "only implemented for Linux servers")
        self.assertTrue(False, "test not implemented, will fail")

    def test_017_submit_delete_request(self):
        """Test submit request to delete server"""
        self.client.delete_server(self.serverid)

    def test_018_server_becomes_deleted(self):
        """Test server becomes DELETED"""
        self._insist_on_status_transition("ACTIVE", "DELETED",
                                         self.action_timeout,
                                         self.action_timeout)

    def test_019_server_no_longer_in_server_list(self):
        """Test server is no longer in server list"""
        servers = self.client.list_servers()
        self.assertNotIn(self.serverid, [s["id"] for s in servers])


class TestRunnerProcess(Process):
    """A distinct process used to execute part of the tests in parallel"""
    def __init__(self, **kw):
        Process.__init__(self, **kw)
        kwargs = kw["kwargs"]
        self.testq = kwargs["testq"]
        self.runner = kwargs["runner"]

    def run(self):
        # Make sure this test runner process dies with the parent
        # and is not left behind.
        #
        # WARNING: This uses the prctl(2) call and is
        # Linux-specific.
        prctl.set_pdeathsig(signal.SIGHUP)

        while True:
            log.debug("I am process %d, GETting from queue is %s",
                     os.getpid(), self.testq)
            msg = self.testq.get()
            log.debug("Dequeued msg: %s", msg)

            if msg == "TEST_RUNNER_TERMINATE":
                raise SystemExit
            elif issubclass(msg, unittest.TestCase):
                # Assemble a TestSuite, and run it
                suite = unittest.TestLoader().loadTestsFromTestCase(msg)
                self.runner.run(suite)
            else:
                raise Exception("Cannot handle msg: %s" % msg)


def _run_cases_in_parallel(cases, fanout=1, runner=None):
    """Run instances of TestCase in parallel, in a number of distinct processes

    The cases iterable specifies the TestCases to be executed in parallel,
    by test runners running in distinct processes.
    The fanout parameter specifies the number of processes to spawn,
    and defaults to 1.
    The runner argument specifies the test runner class to use inside each
    runner process.

    """
    if runner is None:
        runner = unittest.TextTestRunner(verbosity=2, failfast=True)

    # testq: The master process enqueues TestCase objects into this queue,
    #        test runner processes pick them up for execution, in parallel.
    testq = Queue()
    runners = []
    for i in xrange(0, fanout):
        kwargs = dict(testq=testq, runner=runner)
        runners.append(TestRunnerProcess(kwargs=kwargs))

    log.info("Spawning %d test runner processes", len(runners))
    for p in runners:
        p.start()
    log.debug("Spawned %d test runners, PIDs are %s",
              len(runners), [p.pid for p in runners])

    # Enqueue test cases
    map(testq.put, cases)
    map(testq.put, ["TEST_RUNNER_TERMINATE"] * len(runners))

    log.debug("Joining %d processes", len(runners))
    for p in runners:
        p.join()
    log.debug("Done joining %d processes", len(runners))


def _spawn_server_test_case(**kwargs):
    """Construct a new unit test case class from SpawnServerTestCase"""

    name = "SpawnServerTestCase_%d" % kwargs["imageid"]
    cls = type(name, (SpawnServerTestCase,), kwargs)

    # Patch extra parameters into test names by manipulating method docstrings
    for (mname, m) in \
        inspect.getmembers(cls, lambda x: inspect.ismethod(x)):
            if hasattr(m, __doc__):
                m.__func__.__doc__ = "[%s] %s" % (imagename, m.__doc__)

    # Make sure the class can be pickled, by listing it among
    # the attributes of __main__. A PicklingError is raised otherwise.
    setattr(__main__, name, cls)
    return cls


def cleanup_servers(delete_stale=False):
    c = Client(API, TOKEN)
    servers = c.list_servers()
    stale = [s for s in servers if s["name"].startswith(SNF_TEST_PREFIX)]

    if len(stale) == 0:
        return

    print >> sys.stderr, "Found these stale servers from previous runs:"
    print "    " + \
          "\n    ".join(["%d: %s" % (s["id"], s["name"]) for s in stale])

    if delete_stale:
        print >> sys.stderr, "Deleting %d stale servers:" % len(stale)
        for server in stale:
            c.delete_server(server["id"])
        print >> sys.stderr, "    ...done"
    else:
        print >> sys.stderr, "Use --delete-stale to delete them."


def parse_arguments(args):
    from optparse import OptionParser

    kw = {}
    kw["usage"] = "%prog [options]"
    kw["description"] = \
        "%prog runs a number of test scenarios on a " \
        "Synnefo deployment."

    parser = OptionParser(**kw)
    parser.disable_interspersed_args()
    parser.add_option("--api",
                      action="store", type="string", dest="api",
                      help="The API URI to use to reach the Synnefo API",
                      default=DEFAULT_API)
    parser.add_option("--token",
                      action="store", type="string", dest="token",
                      help="The token to use for authentication to the API")
    parser.add_option("--nofailfast",
                      action="store_true", dest="nofailfast",
                      help="Do not fail immediately if one of the tests " \
                           "fails (EXPERIMENTAL)",
                      default=False)
    parser.add_option("--action-timeout",
                      action="store", type="int", dest="action_timeout",
                      metavar="TIMEOUT",
                      help="Wait SECONDS seconds for a server action to " \
                           "complete, then the test is considered failed",
                      default=20)
    parser.add_option("--build-warning",
                      action="store", type="int", dest="build_warning",
                      metavar="TIMEOUT",
                      help="Warn if TIMEOUT seconds have passed and a " \
                           "build operation is still pending",
                      default=600)
    parser.add_option("--build-fail",
                      action="store", type="int", dest="build_fail",
                      metavar="BUILD_TIMEOUT",
                      help="Fail the test if TIMEOUT seconds have passed " \
                           "and a build operation is still incomplete",
                      default=900)
    parser.add_option("--query-interval",
                      action="store", type="int", dest="query_interval",
                      metavar="INTERVAL",
                      help="Query server status when requests are pending " \
                           "every INTERVAL seconds",
                      default=3)
    parser.add_option("--fanout",
                      action="store", type="int", dest="fanout",
                      metavar="COUNT",
                      help="Spawn up to COUNT child processes to execute " \
                           "in parallel, essentially have up to COUNT " \
                           "server build requests outstanding (EXPERIMENTAL)",
                      default=1)
    parser.add_option("--force-flavor",
                      action="store", type="int", dest="force_flavorid",
                      metavar="FLAVOR ID",
                      help="Force all server creations to use the specified "\
                           "FLAVOR ID instead of a randomly chosen one, " \
                           "useful if disk space is scarce",
                      default=None)
    parser.add_option("--image-id",
                      action="store", type="string", dest="force_imageid",
                      metavar="IMAGE ID",
                      help="Test the specified image id, use 'all' to test " \
                           "all available images (mandatory argument)",
                      default=None)
    parser.add_option("--show-stale",
                      action="store_true", dest="show_stale",
                      help="Show stale servers from previous runs, whose "\
                           "name starts with `%s'" % SNF_TEST_PREFIX,
                      default=False)
    parser.add_option("--delete-stale",
                      action="store_true", dest="delete_stale",
                      help="Delete stale servers from previous runs, whose "\
                           "name starts with `%s'" % SNF_TEST_PREFIX,
                      default=False)

    # FIXME: Change the default for build-fanout to 10
    # FIXME: Allow the user to specify a specific set of Images to test

    (opts, args) = parser.parse_args(args)

    # Verify arguments
    if opts.delete_stale:
        opts.show_stale = True

    if not opts.show_stale:
        if not opts.force_imageid:
            print >>sys.stderr, "The --image-id argument is mandatory."
            parser.print_help()
            sys.exit(1)

        if opts.force_imageid != 'all':
            try:
                opts.force_imageid = int(opts.force_imageid)
            except ValueError:
                print >>sys.stderr, "Invalid value specified for --image-id." \
                                    "Use a numeric id, or `all'."
                sys.exit(1)

    return (opts, args)


def main():
    """Assemble test cases into a test suite, and run it

    IMPORTANT: Tests have dependencies and have to be run in the specified
    order inside a single test case. They communicate through attributes of the
    corresponding TestCase class (shared fixtures). Distinct subclasses of
    TestCase MAY SHARE NO DATA, since they are run in parallel, in distinct
    test runner processes.

    """
    (opts, args) = parse_arguments(sys.argv[1:])

    global API, TOKEN
    API = opts.api
    TOKEN = opts.token

    # Cleanup stale servers from previous runs
    if opts.show_stale:
        cleanup_servers(delete_stale=opts.delete_stale)
        return 0

    # Initialize a kamaki instance, get flavors, images
    c = Client(API, TOKEN)
    DIMAGES = c.list_images(detail=True)
    DFLAVORS = c.list_flavors(detail=True)

    # FIXME: logging, log, LOG PID, TEST_RUN_ID, arguments
    # FIXME: Network testing? Create, destroy, connect, ping, disconnect VMs?
    # Run them: FIXME: In parallel, FAILEARLY, catchbreak?
    #unittest.main(verbosity=2, catchbreak=True)

    runner = unittest.TextTestRunner(verbosity=2, failfast=not opts.nofailfast)
    # The following cases run sequentially
    seq_cases = [UnauthorizedTestCase, FlavorsTestCase, ImagesTestCase]
    _run_cases_in_parallel(seq_cases, fanout=3, runner=runner)

    # The following cases run in parallel
    par_cases = []

    if opts.force_imageid == 'all':
        test_images = DIMAGES
    else:
        test_images = filter(lambda x: x["id"] == opts.force_imageid, DIMAGES)

    for image in test_images:
        imageid = image["id"]
        imagename = image["name"]
        if opts.force_flavorid:
            flavorid = opts.force_flavorid
        else:
            flavorid = choice([f["id"] for f in DFLAVORS if f["disk"] >= 20])
        personality = None   # FIXME
        servername = "%s%s for %s" % (SNF_TEST_PREFIX, TEST_RUN_ID, imagename)
        is_windows = imagename.lower().find("windows") >= 0
        case = _spawn_server_test_case(imageid=imageid, flavorid=flavorid,
                                       imagename=imagename,
                                       personality=personality,
                                       servername=servername,
                                       is_windows=is_windows,
                                       action_timeout=opts.action_timeout,
                                       build_warning=opts.build_warning,
                                       build_fail=opts.build_fail,
                                       query_interval=opts.query_interval)
        par_cases.append(case)

    _run_cases_in_parallel(par_cases, fanout=opts.fanout, runner=runner)

if __name__ == "__main__":
    sys.exit(main())
