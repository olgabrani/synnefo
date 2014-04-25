var statusActionsServer = {
    'shutoff'      : {
        enabledActions : ['connect', 'start', 'destroy', ],
    },
    'error'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'build'      : {
        enabledActions : ['connect'],
    },
    'active'      : {
        enabledActions : ['connect', 'reboot', 'shutdown', 'destroy','connect', 'reboot',  ],
    },
    'reboot'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'unknown'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'stopped'      : {
        enabledActions : ['connect', 'start', 'destroy'],
    },
};

Snf.Server = DS.Model.extend({

    name        : DS.attr(), //OK
    status      : DS.attr(),  // OK
    metadata    : DS.attr('raw'), // OK metatadata.os
    'SNF:fqdn'  : DS.attr(),
    created     : DS.attr('date'), //OK
    updated     : DS.attr('date'), //OK
    tags        : DS.hasMany('tag', { async:true }), // ΝΟΤ ΟΚ. Where do we get tags from
    // http://www.synnefo.org/docs/synnefo/latest/compute-api-guide.html#flavor
    volumes     : DS.hasMany('volume', { async:true}),
    //ports       : DS.hasMany('port', { async: true}),
    attachments : DS.attr('raw'),
    tenant_id   : DS.belongsTo('project',{ async:true}), 
    
    enabledActions: function() {
        return statusActionsServer[this.get('status').toLowerCase()].enabledActions;
    }.property('status'),

    statusLowerCase: function() {
        return this.get('status').toLowerCase();
    }.property('status'),

/*    ports: function() {
        return [1,2];
    }.property('attachments'),*/

    // ember-data returns promise objects for blongsTo properties
    portsNetworksPromises: Ember.computed.mapBy('ports', 'network'),
    // resolve the content of the above promises
    portsNetworks: Ember.computed.mapBy('portsNetworksPromises', 'content'),
    // filter out un-fulfilled promise contents
    validNetworks: Ember.computed.filter('portsNetworks', function(n) { return n; }),
    // yay!!! server network objects
    networks: Ember.computed.uniq('validNetworks'),
    // ^^^ too verbose ? we need a way to shorten out above computed properties shitload.

});


Snf.Server.FIXTURES = [
    {
        "addresses": [
        { 
            "2718": [
            {
                "version": 6,
                "addr": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }],
            "2719": [
            {
                "version": 4,
                "addr": "192.168.1.2",
                "OS-EXT-IPS:type": "floating",
            }],
        }],
        "attachments": [
            {
                "id": "1",
                "network_id": "2718",
                "mac_address": "aa:01:02:6c:34:ab",
                "firewallProfile": "DISABLED",
                "ipv4": "",
                "ipv6": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }, {
                "id": "2",
                "network_id": "2719",
                "mac_address": "aa:00:0c:6d:34:bb",
                "firewallProfile": "PROTECTED",
                "ipv4": "192.168.1.2",
                "ipv6": "",
                "OS-EXT-IPS:type": "floating",
            },{
                "id": "6",
                "network_id": "2719",
                "mac_address": "aa:00:0c:6d:34:bb",
                "firewallProfile": "PROTECTED",
                "ipv4": "192.168.1.2",
                "ipv6": "",
                "OS-EXT-IPS:type": "floating",
            }
        ],
        "links": [
        {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "self"
        }, {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "bookmark"
        }],
        "image": {
            "id": "im4g3-1d",
            "links": [
            {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "self"
            }, {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "bookmark"
            }, {
                "href": "https://example.org/image/v1.0/images/im4g3-1d",
                "rel": "alternate"
            }]
        },
        "suspended": false,
        "flavor" : {
            "id": "1",
            "links": [
            {
                "href" : "https://example.org/compute/v2.0/flavors/1",
                "rel"  : "self",
            }, {
                "href": "https://example.org/compute/v2.0/flavors/1",
                "rel": "bookmark",
            }]
        },
        "id": "1",
        "security_groups": [{"name": "default"}],
        "user_id": "s0m5-u5e7-1d",
        "accessIPv4": "",
        "accessIPv6": "",
        "progress": 100,
        "config_drive": "",
        "status": "ACTIVE",
        "updated": "2011-05-29T14:07:07.037602+00:00",
        "hostId": "",
        "SNF:fqdn": "snf-42.vm.example.org",
        "key_name": null,
        "name": "My Server 1",
        "created": "2014-02-12T08:31:37.834542+00:00",
        "tenant_id": "1",
        "SNF:port_forwarding": {},
        "SNF:task_state": "",
        "diagnostics": [
            {
                "level": "DEBUG",
                "created": "2014-02-12T08:31:37.834542+00:00",
                "source": "image-info",
                "source_date": "2014-02-12T08:32:35.929507+00:00",
                "message": "Image customization finished successfully.",
                "details": null
            }
        ],
        "metadata": {
            "os": "debian",
            "users": "root"
        },
        'tags': [1,2],
        'project': 1,
        'volumes': [1,2]
    }, {
        "addresses": [
        { 
            "2718": [
            {
                "version": 6,
                "addr": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }],
            "2719": [
            {
                "version": 4,
                "addr": "192.168.1.2",
                "OS-EXT-IPS:type": "floating",
            }],
        }],
        "attachments": [
            {
                "id": "3",
                "network_id": "2718",
                "mac_address": "aa:01:02:6c:34:ab",
                "firewallProfile": "DISABLED",
                "ipv4": "",
                "ipv6": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }
        ],
        "links": [
        {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "self"
        }, {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "bookmark"
        }],
        "image": {
            "id": "im4g3-1d",
            "links": [
            {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "self"
            }, {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "bookmark"
            }, {
                "href": "https://example.org/image/v1.0/images/im4g3-1d",
                "rel": "alternate"
            }]
        },
        "suspended": false,
        "flavor" : {
            "id": "1",
            "links": [
            {
                "href" : "https://example.org/compute/v2.0/flavors/1",
                "rel"  : "self",
            }, {
                "href": "https://example.org/compute/v2.0/flavors/1",
                "rel": "bookmark",
            }]
        },
        "id": "2",
        "security_groups": [{"name": "default"}],
        "user_id": "s0m5-u5e7-1d",
        "accessIPv4": "",
        "accessIPv6": "",
        "progress": 100,
        "config_drive": "",
        "status": "BUILD",
        "updated": "2011-05-29T14:07:07.037602+00:00",
        "hostId": "",
        "SNF:fqdn": "snf-42.vm.example.org",
        "key_name": null,
        "name": "My Server 2",
        "created": "2014-02-12T08:31:37.834542+00:00",
        "tenant_id": "2",
        "SNF:port_forwarding": {},
        "SNF:task_state": "",
        "diagnostics": [
            {
                "level": "DEBUG",
                "created": "2014-02-12T08:31:37.834542+00:00",
                "source": "image-info",
                "source_date": "2014-02-12T08:32:35.929507+00:00",
                "message": "Image customization finished successfully.",
                "details": null
            }
        ],
        "metadata": {
            "os": "debian",
            "users": "root"
        },
        'tags': [2,3,4],
        'project': 2,
    }, {
        "addresses": [
        { 
            "2718": [
            {
                "version": 6,
                "addr": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }],
            "2719": [
            {
                "version": 4,
                "addr": "192.168.1.2",
                "OS-EXT-IPS:type": "floating",
            }],
        }],
        "attachments": [
            {
                "id": "4",
                "network_id": "2718",
                "mac_address": "aa:01:02:6c:34:ab",
                "firewallProfile": "DISABLED",
                "ipv4": "",
                "ipv6": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }, {
                "id": "5",
                "network_id": "2719",
                "mac_address": "aa:00:0c:6d:34:bb",
                "firewallProfile": "PROTECTED",
                "ipv4": "192.168.1.2",
                "ipv6": "",
                "OS-EXT-IPS:type": "floating",
            }
        ],
        "links": [
        {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "self"
        }, {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "bookmark"
        }],
        "image": {
            "id": "im4g3-1d",
            "links": [
            {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "self"
            }, {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "bookmark"
            }, {
                "href": "https://example.org/image/v1.0/images/im4g3-1d",
                "rel": "alternate"
            }]
        },
        "suspended": false,
        "flavor" : {
            "id": "1",
            "links": [
            {
                "href" : "https://example.org/compute/v2.0/flavors/1",
                "rel"  : "self",
            }, {
                "href": "https://example.org/compute/v2.0/flavors/1",
                "rel": "bookmark",
            }]
        },
        "id": "3",
        "security_groups": [{"name": "default"}],
        "user_id": "s0m5-u5e7-1d",
        "accessIPv4": "",
        "accessIPv6": "",
        "progress": 100,
        "config_drive": "",
        "status": "REBOOT",
        "updated": "2011-05-29T14:07:07.037602+00:00",
        "hostId": "",
        "SNF:fqdn": "snf-46317.vm.okeanos.grnet.gr",
        "key_name": null,
        "name": "My Server 3",
        "created": "2014-02-12T08:31:37.834542+00:00",
        "tenant_id": "3",
        "SNF:port_forwarding": {},
        "SNF:task_state": "",
        "diagnostics": [
            {
                "level": "DEBUG",
                "created": "2014-02-12T08:31:37.834542+00:00",
                "source": "image-info",
                "source_date": "2014-02-12T08:32:35.929507+00:00",
                "message": "Image customization finished successfully.",
                "details": null
            }
        ],
        "metadata": {
            "os": "debian",
            "users": "root"
        },
        'tags': [1,2,3,4,5],
        'project': 3,
        'volumes': [3]
    },{
        "addresses": [
        { 
            "2718": [
            {
                "version": 6,
                "addr": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }],
            "2719": [
            {
                "version": 4,
                "addr": "192.168.1.2",
                "OS-EXT-IPS:type": "floating",
            }],
        }],
        "attachments": [
            {
                "id": "1",
                "network_id": "2718",
                "mac_address": "aa:01:02:6c:34:ab",
                "firewallProfile": "DISABLED",
                "ipv4": "",
                "ipv6": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }, {
                "id": "2",
                "network_id": "2719",
                "mac_address": "aa:00:0c:6d:34:bb",
                "firewallProfile": "PROTECTED",
                "ipv4": "192.168.1.2",
                "ipv6": "",
                "OS-EXT-IPS:type": "floating",
            }
        ],
        "links": [
        {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "self"
        }, {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "bookmark"
        }],
        "image": {
            "id": "im4g3-1d",
            "links": [
            {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "self"
            }, {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "bookmark"
            }, {
                "href": "https://example.org/image/v1.0/images/im4g3-1d",
                "rel": "alternate"
            }]
        },
        "suspended": false,
        "flavor" : {
            "id": "1",
            "links": [
            {
                "href" : "https://example.org/compute/v2.0/flavors/1",
                "rel"  : "self",
            }, {
                "href": "https://example.org/compute/v2.0/flavors/1",
                "rel": "bookmark",
            }]
        },
        "id": "4",
        "security_groups": [{"name": "default"}],
        "user_id": "s0m5-u5e7-1d",
        "accessIPv4": "",
        "accessIPv6": "",
        "progress": 100,
        "config_drive": "",
        "status": "ERROR",
        "updated": "2011-05-29T14:07:07.037602+00:00",
        "hostId": "",
        "SNF:fqdn": "snf-42.vm.example.org",
        "key_name": null,
        "name": "My Server 4",
        "created": "2014-02-12T08:31:37.834542+00:00",
        "tenant_id": "4",
        "SNF:port_forwarding": {},
        "SNF:task_state": "",
        "diagnostics": [
            {
                "level": "DEBUG",
                "created": "2014-02-12T08:31:37.834542+00:00",
                "source": "image-info",
                "source_date": "2014-02-12T08:32:35.929507+00:00",
                "message": "Image customization finished successfully.",
                "details": null
            }
        ],
        "metadata": {
            "os": "debian",
            "users": "root"
        },
        'project': 1,
    },,{
        "addresses": [
        { 
            "2718": [
            {
                "version": 6,
                "addr": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }],
            "2719": [
            {
                "version": 4,
                "addr": "192.168.1.2",
                "OS-EXT-IPS:type": "floating",
            }],
        }],
        "attachments": [
            {
                "id": "1",
                "network_id": "2718",
                "mac_address": "aa:01:02:6c:34:ab",
                "firewallProfile": "DISABLED",
                "ipv4": "",
                "ipv6": "2001:443:2dfc:1232:a810:3cf:fe9b:21ab",
                "OS-EXT-IPS:type": "fixed",
            }, {
                "id": "2",
                "network_id": "2719",
                "mac_address": "aa:00:0c:6d:34:bb",
                "firewallProfile": "PROTECTED",
                "ipv4": "192.168.1.2",
                "ipv6": "",
                "OS-EXT-IPS:type": "floating",
            }
        ],
        "links": [
        {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "self"
        }, {
            "href": "https://example.org/compute/v2.0/servers/42",
            "rel": "bookmark"
        }],
        "image": {
            "id": "im4g3-1d",
            "links": [
            {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "self"
            }, {
                "href": "https://example.org/compute/v2.0/images/im4g3-1d",
                "rel": "bookmark"
            }, {
                "href": "https://example.org/image/v1.0/images/im4g3-1d",
                "rel": "alternate"
            }]
        },
        "suspended": false,
        "flavor" : {
            "id": "1",
            "links": [
            {
                "href" : "https://example.org/compute/v2.0/flavors/1",
                "rel"  : "self",
            }, {
                "href": "https://example.org/compute/v2.0/flavors/1",
                "rel": "bookmark",
            }]
        },
        "id": "5",
        "security_groups": [{"name": "default"}],
        "user_id": "s0m5-u5e7-1d",
        "accessIPv4": "",
        "accessIPv6": "",
        "progress": 100,
        "config_drive": "",
        "status": "STOPPED",
        "updated": "2011-05-29T14:07:07.037602+00:00",
        "hostId": "",
        "SNF:fqdn": "snf-42.vm.example.org",
        "key_name": null,
        "name": "Sherlock",
        "created": "2014-02-12T08:31:37.834542+00:00",
        "tenant_id": "1",
        "SNF:port_forwarding": {},
        "SNF:task_state": "",
        "diagnostics": [
            {
                "level": "DEBUG",
                "created": "2014-02-12T08:31:37.834542+00:00",
                "source": "image-info",
                "source_date": "2014-02-12T08:32:35.929507+00:00",
                "message": "Image customization finished successfully.",
                "details": null
            }
        ],
        "metadata": {
            "os": "debian",
            "users": "root"
        },
        'project': 1,
    },
];
