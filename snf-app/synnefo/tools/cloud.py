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

from httplib import HTTPConnection, HTTPSConnection
from optparse import OptionParser
from os.path import basename
from sys import argv, exit
from urlparse import urlparse

import json


DEFAULT_API_URL = 'http://127.0.0.1:8000/api/v1.1'

MARGIN = 14

commands = {}

def command_name(name):
    def decorator(cls):
        commands[name] = cls
        return cls
    return decorator


def print_addresses(networks):
    for i, net in enumerate(networks):
        key = 'addresses:'.rjust(MARGIN + 1) if i == 0 else ' ' * (MARGIN + 1)
        addr = ''
        if 'values' in net:
            addr = '[%s]' % ' '.join(ip['addr'] for ip in net['values'])

        val = '%s/%s %s %s' % (net['id'], net['name'], net['mac'], addr)
        if 'firewallProfile' in net:
            val += ' - %s' % net['firewallProfile']
        print '%s %s' % (key, val)

def print_dict(d, show_empty=True):
    for key, val in sorted(d.items()):
        if key == 'metadata':
            val = ', '.join('%s="%s"' % x for x in val['values'].items())
        elif key == 'addresses':
            print_addresses(val['values'])
            continue
        elif key == 'servers':
            val = ', '.join(str(server_id) for server_id in val['values'])
        if val or show_empty:
            print '%s: %s' % (key.rjust(MARGIN), val)


class Command(object):
    def __init__(self, argv):
        parser = OptionParser()
        parser.add_option('--apiurl',
                            dest='apiurl',
                            metavar='URL',
                            default=DEFAULT_API_URL,
                            help='use api API')
        parser.add_option('--token',
                            dest='token',
                            metavar='TOKEN',
                            help='use user token TOKEN')
        parser.add_option('-v',
                            action='store_true',
                            dest='verbose',
                            default=False,
                            help='use verbose output')
        self.add_options(parser)
        options, args = parser.parse_args(argv)

        # Add options to self
        for opt in parser.option_list:
            key = opt.dest
            if key:
                val = getattr(options, key)
                setattr(self, key, val)

        self.execute(*args)

    def add_options(self, parser):
        pass

    def execute(self, *args):
        pass

    def http_cmd(self, method, path, body=None, expected_status=200):
        p = urlparse(self.apiurl)
        if p.scheme == 'https':
            conn = HTTPSConnection(p.netloc)
        else:
            conn = HTTPConnection(p.netloc)

        kwargs = {}
        kwargs['headers'] = {'X-Auth-Token': self.token}
        if body:
            kwargs['headers']['Content-Type'] = 'application/json'
            kwargs['body'] = body
        conn.request(method, p.path + path, **kwargs)

        resp = conn.getresponse()
        if self.verbose:
            print '%d %s' % (resp.status, resp.reason)
            for key, val in resp.getheaders():
                print '%s: %s' % (key.capitalize(), val)
            print

        buf = resp.read() or '{}'
        try:
            reply = json.loads(buf)
        except ValueError:
            print 'Invalid response from the server.'
            if self.verbose:
                print buf
            exit(1)

        # If the response status is not the expected one,
        # assume an error has occured and treat the body
        # as a cloudfault.
        if resp.status != expected_status:
            if len(reply) == 1:
                key = reply.keys()[0]
                val = reply[key]
                print '%s: %s' % (key, val.get('message', ''))
                if self.verbose:
                    print val.get('details', '')
            else:
                print 'Invalid response from the server.'
            exit(1)

        return reply

    def http_get(self, path, expected_status=200):
        return self.http_cmd('GET', path, None, expected_status)

    def http_post(self, path, body, expected_status=202):
        return self.http_cmd('POST', path, body, expected_status)

    def http_put(self, path, body, expected_status=204):
        return self.http_cmd('PUT', path, body, expected_status)

    def http_delete(self, path, expected_status=204):
        return self.http_cmd('DELETE', path, None, expected_status)


@command_name('ls')
class ListServers(Command):
    description = 'list servers'

    def add_options(self, parser):
        parser.add_option('-l', action='store_true', dest='detail', default=False,
                            help='show detailed output')
        parser.add_option('-a', action='store_true', dest='show_empty', default=False,
                            help='include empty values')

    def execute(self):
        path = '/servers/detail' if self.detail else '/servers'
        reply = self.http_get(path)

        for server in reply['servers']['values']:
            id = server.pop('id')
            name = server.pop('name')
            if self.detail:
                print '%d %s' % (id, name)
                print_dict(server, self.show_empty)
                print
            else:
                print '%3d %s' % (id, name)


@command_name('info')
class GetServerDetails(Command):
    description = 'get server details'
    syntax = '<server id>'

    def add_options(self, parser):
        parser.add_option('-a', action='store_true', dest='show_empty', default=False,
                            help='include empty values')

    def execute(self, server_id):
        path = '/servers/%d' % int(server_id)
        reply = self.http_get(path)
        server = reply['server']
        server.pop('id')
        print_dict(server, self.show_empty)


@command_name('create')
class CreateServer(Command):
    description = 'create server'
    syntax = '<server name>'

    def add_options(self, parser):
        parser.add_option('-f', dest='flavor', metavar='FLAVOR_ID', default=1,
                            help='use flavor FLAVOR_ID')
        parser.add_option('-i', dest='image', metavar='IMAGE_ID', default=1,
                            help='use image IMAGE_ID')

    def execute(self, name):
        server = {
            'name': name,
            'flavorRef': self.flavor,
            'imageRef': self.image}
        body = json.dumps({'server': server})
        reply = self.http_post('/servers', body)
        server = reply['server']
        print_dict(server)


@command_name('rename')
class UpdateServerName(Command):
    description = 'update server name'
    syntax = '<server id> <new name>'

    def execute(self, server_id, name):
        path = '/servers/%d' % int(server_id)
        body = json.dumps({'server': {'name': name}})
        self.http_put(path, body)


@command_name('delete')
class DeleteServer(Command):
    description = 'delete server'
    syntax = '<server id>'

    def execute(self, server_id):
        path = '/servers/%d' % int(server_id)
        self.http_delete(path)


@command_name('reboot')
class RebootServer(Command):
    description = 'reboot server'
    syntax = '<server id>'

    def add_options(self, parser):
        parser.add_option('-f', action='store_true', dest='hard', default=False,
                            help='perform a hard reboot')

    def execute(self, server_id):
        path = '/servers/%d/action' % int(server_id)
        type = 'HARD' if self.hard else 'SOFT'
        body = json.dumps({'reboot': {'type': type}})
        self.http_post(path, body)


@command_name('start')
class StartServer(Command):
    description = 'start server'
    syntax = '<server id>'

    def execute(self, server_id):
        path = '/servers/%d/action' % int(server_id)
        body = json.dumps({'start': {}})
        self.http_post(path, body)


@command_name('shutdown')
class StartServer(Command):
    description = 'shutdown server'
    syntax = '<server id>'

    def execute(self, server_id):
        path = '/servers/%d/action' % int(server_id)
        body = json.dumps({'shutdown': {}})
        self.http_post(path, body)


@command_name('console')
class ServerConsole(Command):
    description = 'get VNC console'
    syntax = '<server id>'

    def execute(self, server_id):
        path = '/servers/%d/action' % int(server_id)
        body = json.dumps({'console': {'type': 'vnc'}})
        reply = self.http_cmd('POST', path, body, 200)
        print_dict(reply['console'])


@command_name('profile')
class SetFirewallProfile(Command):
    description = 'set the firewall profile'
    syntax = '<server id> <profile>'

    def execute(self, server_id, profile):
        path = '/servers/%d/action' % int(server_id)
        body = json.dumps({'firewallProfile': {'profile': profile}})
        self.http_cmd('POST', path, body, 202)


@command_name('lsaddr')
class ListAddresses(Command):
    description = 'list server addresses'
    syntax = '<server id> [network]'

    def execute(self, server_id, network=None):
        path = '/servers/%d/ips' % int(server_id)
        if network:
            path += '/%s' % network
        reply = self.http_get(path)

        addresses = [reply['network']] if network else reply['addresses']['values']
        print_addresses(addresses)


@command_name('lsflv')
class ListFlavors(Command):
    description = 'list flavors'

    def add_options(self, parser):
        parser.add_option('-l', action='store_true', dest='detail', default=False,
                            help='show detailed output')

    def execute(self):
        path = '/flavors/detail' if self.detail else '/flavors'
        reply = self.http_get(path)

        for flavor in reply['flavors']['values']:
            id = flavor.pop('id')
            name = flavor.pop('name')
            details = ' '.join('%s=%s' % item for item in sorted(flavor.items()))
            print '%3d %s %s' % (id, name, details)


@command_name('flvinfo')
class GetFlavorDetails(Command):
    description = 'get flavor details'
    syntax = '<flavor id>'

    def execute(self, flavor_id):
        path = '/flavors/%d' % int(flavor_id)
        reply = self.http_get(path)

        flavor = reply['flavor']
        id = flavor.pop('id')
        name = flavor.pop('name')
        details = ' '.join('%s=%s' % item for item in sorted(flavor.items()))
        print '%3d %s %s' % (id, name, details)


@command_name('lsimg')
class ListImages(Command):
    description = 'list images'

    def add_options(self, parser):
        parser.add_option('-l', action='store_true', dest='detail', default=False,
                            help='show detailed output')

    def execute(self):
        path = '/images/detail' if self.detail else '/images'
        reply = self.http_get(path)

        for image in reply['images']['values']:
            id = image.pop('id')
            name = image.pop('name')
            if self.detail:
                print '%d %s' % (id, name)
                print_dict(image)
                print
            else:
                print '%3d %s' % (id, name)


@command_name('imginfo')
class GetImageDetails(Command):
    description = 'get image details'
    syntax = '<image id>'

    def execute(self, image_id):
        path = '/images/%d' % int(image_id)
        reply = self.http_get(path)
        image = reply['image']
        image.pop('id')
        print_dict(image)


@command_name('createimg')
class CreateImage(Command):
    description = 'create image'
    syntax = '<server id> <image name>'

    def execute(self, server_id, name):
        image = {'name': name, 'serverRef': int(server_id)}
        body = json.dumps({'image': image})
        reply = self.http_post('/images', body)
        print_dict(reply['image'])

@command_name('deleteimg')
class DeleteImage(Command):
    description = 'delete image'
    syntax = '<image id>'

    def execute(self, image_id):
        path = '/images/%d' % int(image_id)
        self.http_delete(path)

@command_name('lsmeta')
class ListServerMeta(Command):
    description = 'list server meta'
    syntax = '<server id> [key]'

    def execute(self, server_id, key=None):
        path = '/servers/%d/meta' % int(server_id)
        if key:
            path += '/' + key
        reply = self.http_get(path)
        if key:
            print_dict(reply['meta'])
        else:
            print_dict(reply['metadata']['values'])

@command_name('setmeta')
class UpdateServerMeta(Command):
    description = 'update server meta'
    syntax = '<server id> <key> <val>'

    def execute(self, server_id, key, val):
        path = '/servers/%d/meta' % int(server_id)
        metadata = {key: val}
        body = json.dumps({'metadata': metadata})
        reply = self.http_post(path, body, expected_status=201)
        print_dict(reply['metadata'])

@command_name('addmeta')
class CreateServerMeta(Command):
    description = 'add server meta'
    syntax = '<server id> <key> <val>'

    def execute(self, server_id, key, val):
        path = '/servers/%d/meta/%s' % (int(server_id), key)
        meta = {key: val}
        body = json.dumps({'meta': meta})
        reply = self.http_put(path, body, expected_status=201)
        print_dict(reply['meta'])

@command_name('delmeta')
class DeleteServerMeta(Command):
    description = 'delete server meta'
    syntax = '<server id> <key>'

    def execute(self, server_id, key):
        path = '/servers/%d/meta/%s' % (int(server_id), key)
        reply = self.http_delete(path)

@command_name('lsimgmeta')
class ListImageMeta(Command):
    description = 'list image meta'
    syntax = '<image id> [key]'

    def execute(self, image_id, key=None):
        path = '/images/%d/meta' % int(image_id)
        if key:
            path += '/' + key
        reply = self.http_get(path)
        if key:
            print_dict(reply['meta'])
        else:
            print_dict(reply['metadata']['values'])

@command_name('setimgmeta')
class UpdateImageMeta(Command):
    description = 'update image meta'
    syntax = '<image id> <key> <val>'

    def execute(self, image_id, key, val):
        path = '/images/%d/meta' % int(image_id)
        metadata = {key: val}
        body = json.dumps({'metadata': metadata})
        reply = self.http_post(path, body, expected_status=201)
        print_dict(reply['metadata'])

@command_name('addimgmeta')
class CreateImageMeta(Command):
    description = 'add image meta'
    syntax = '<image id> <key> <val>'

    def execute(self, image_id, key, val):
        path = '/images/%d/meta/%s' % (int(image_id), key)
        meta = {key: val}
        body = json.dumps({'meta': meta})
        reply = self.http_put(path, body, expected_status=201)
        print_dict(reply['meta'])

@command_name('delimgmeta')
class DeleteImageMeta(Command):
    description = 'delete image meta'
    syntax = '<image id> <key>'

    def execute(self, image_id, key):
        path = '/images/%d/meta/%s' % (int(image_id), key)
        reply = self.http_delete(path)


@command_name('lsnet')
class ListNetworks(Command):
    description = 'list networks'

    def add_options(self, parser):
        parser.add_option('-l', action='store_true', dest='detail', default=False,
                            help='show detailed output')

    def execute(self):
        path = '/networks/detail' if self.detail else '/networks'
        reply = self.http_get(path)

        for network in reply['networks']['values']:
            id = network.pop('id')
            name = network.pop('name')
            if self.detail:
                print '%s %s' % (id, name)
                print_dict(network)
                print
            else:
                print '%3s %s' % (id, name)


@command_name('createnet')
class CreateNetwork(Command):
    description = 'create network'
    syntax = '<network name>'

    def execute(self, name):
        network = {'name': name}
        body = json.dumps({'network': network})
        reply = self.http_post('/networks', body)
        print_dict(reply['network'])


@command_name('netinfo')
class GetNetworkDetails(Command):
    description = 'get network details'
    syntax = '<network id>'

    def execute(self, network_id):
        path = '/networks/%d' % int(network_id)
        reply = self.http_get(path)
        net = reply['network']
        name = net.pop('id')
        print_dict(net)


@command_name('renamenet')
class UpdateNetworkName(Command):
    description = 'update network name'
    syntax = '<network_id> <new name>'

    def execute(self, network_id, name):
        path = '/networks/%d' % int(network_id)
        body = json.dumps({'network': {'name': name}})
        self.http_put(path, body)


@command_name('deletenet')
class DeleteNetwork(Command):
    description = 'delete network'
    syntax = '<network id>'

    def execute(self, network_id):
        path = '/networks/%d' % int(network_id)
        self.http_delete(path)


@command_name('connect')
class AddNetwork(Command):
    description = 'connect a server to a network'
    syntax = '<server id> <network id>'

    def execute(self, server_id, network_id):
        path = '/networks/%d/action' % int(network_id)
        body = json.dumps({'add': {'serverRef': server_id}})
        self.http_post(path, body, expected_status=202)


@command_name('disconnect')
class RemoveNetwork(Command):
    description = 'disconnect a server from a network'
    syntax = '<server id> <network id>'

    def execute(self, server_id, network_id):
        path = '/networks/%s/action' % int(network_id)
        body = json.dumps({'remove': {'serverRef': server_id}})
        self.http_post(path, body, expected_status=202)

@command_name('stats')
class ServerStats(Command):
    description = 'get server stats'
    syntax = '<server id>'

    def execute(self, server_id):
        path = '/servers/%d/stats' % int(server_id)
        reply = self.http_get(path)
        stats = reply['stats']
        stats.pop('serverRef')
        print_dict(stats)


def print_usage():
    print 'Usage: %s <command>' % basename(argv[0])
    print
    print 'Commands:'
    for name, cls in sorted(commands.items()):
        description = getattr(cls, 'description', '')
        print '  %s %s' % (name.ljust(12), description)

def main():
    try:
        name = argv[1]
        cls = commands[name]
    except (IndexError, KeyError):
        print_usage()
        exit(1)

    try:
        cls(argv[2:])
    except TypeError:
        syntax = getattr(cls, 'syntax', '')
        if syntax:
            print 'Syntax: %s %s' % (name, syntax)
        else:
            print 'Invalid syntax'
        exit(1)


if __name__ == '__main__':
    main()
