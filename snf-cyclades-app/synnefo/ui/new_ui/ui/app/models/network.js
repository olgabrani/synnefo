var statusActionsNetwork = {
    'down'      : {
        enabledActions : ['destroy'],
    },
    'error'      : {
        enabledActions : ['destroy'],
    },
    'build'      : {
        enabledActions : [],
    },
    'active'      : {
        enabledActions : ['destroy'],
    },
    'snf:drained'      : {
        enabledActions : ['destroy'],
    },
};

Snf.Network = DS.Model.extend({

    name       : DS.attr(),
    status     : DS.attr(),
    ports      : DS.hasMany('port', { async:true }),
    tenant_id  : DS.belongsTo('project',{ async:true}),

    enabledActions: function() {
        return statusActionsNetwork[this.get('status').toLowerCase()].enabledActions;
    }.property('status'),

    statusLowerCase: function() {
        var status = this.get('status');
        if ( status.indexOf(':') > 0) {
            return status.split(':')[1].toLowerCase();
        }
        return status.toLowerCase();
    }.property('status'),

    portsServersPromises: Ember.computed.mapBy('ports', 'server'),
    portsServers: Ember.computed.mapBy('portsServersPromises', 'content'),
    validServers: Ember.computed.filter('portsServers', function(n) { return n; }),
    servers: Ember.computed.uniq('validServers'),

});

Snf.Network.FIXTURES = [
    {
      "id": 1,
      "name": "Public IPv6 Network",
      "status": "ACTIVE",
      "router:external": true,
      "updated": "2013-12-18T11:11:12.272389+00:00",
      "user_id": 1,
      "links":[
        {
          "href": "https://example.org/network/v2.0/networks/2718",
          "rel": "self",
        }, {
          "href": "https://example.org/network/v2.0/networks/2718",
          "rel": "bookmark",
        }
      ],
      "created": "2013-12-17T17:15:48.617049+00:00",
      "tenant_id": 1,
      "admin_state_up": true,
      "SNF:floating_ip_pool": false,
      "public": true,
      "subnets":[
        28
      ],
      "type": "IP_LESS_ROUTED",
      'ports': [1,3,4,5,6],
    }, {
      "id": "2",
      "name": "My Private Network",
      "status": "SNF:DRAINED",
      "router:external": false,
      "updated": "2014-02-13T09:40:05.195945+00:00",
      "user_id": "s0m3-u5e7-1d",
      "links": [
        {
            "href": "https://example.org/network/v2.0/networks/3141",
            "rel": "self"
        },
        {
            "href": "https://example.org/network/v2.0/networks/3141",
            "rel": "bookmark"
        }
      ],
      "created": "2014-02-13T09:40:05.101008+00:00",
      "tenant_id": "2",
      "admin_state_up": true,
      "type": "MAC_FILTERED",
      "subnets": [],
      "SNF:floating_ip_pool": false,
      "public": false,
    }, {
      "id": "3",
      "name": "My Private Network 3",
      "status": "BUILD",
      "router:external": false,
      "updated": "2014-02-13T09:40:05.195945+00:00",
      "user_id": "s0m3-u5e7-1d",
      "links": [
        {
            "href": "https://example.org/network/v2.0/networks/3141",
            "rel": "self"
        },
        {
            "href": "https://example.org/network/v2.0/networks/3141",
            "rel": "bookmark"
        }
      ],
      "created": "2014-02-13T09:40:05.101008+00:00",
      "tenant_id": "3",
      "admin_state_up": true,
      "type": "MAC_FILTERED",
      "subnets": [],
      "SNF:floating_ip_pool": false,
      "public": false,
      'ports': [2],
    }
  ];