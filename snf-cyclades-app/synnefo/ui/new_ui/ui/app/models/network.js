var statusActionsNetwork = {
    'error'      : {
        enabledActions : ['destroy'],
    },
    'building'      : {
        enabledActions : [],
    },
    'running'      : {
        enabledActions : ['destroy'],
    },
    'starting'      : {
        enabledActions : ['destroy'],
    },
    'shutting'      : {
        enabledActions : ['destroy'],
    },
};

Snf.Network = DS.Model.extend({

    name       : DS.attr(),
    status     : DS.attr(),
    ports      : DS.hasMany('port', { async:true }),
    project    : DS.belongsTo('project',{ async:true}),

    enabledActions: function() {
        return statusActionsNetwork[this.get('status')].enabledActions;
    }.property('status'),

    portsServersPromises: Ember.computed.mapBy('ports', 'server'),
    portsServers: Ember.computed.mapBy('portsServersPromises', 'content'),
    validServers: Ember.computed.filter('portsServers', function(n) { return n; }),
    servers: Ember.computed.uniq('validServers'),

});


Snf.Network.FIXTURES = [
    {
        id: 1,
        name: 'Network 1',
        status: 'running',
        ports: [1,3,4,5,6],
        project: 1,
    },
    {
        id: 2,
        name: 'Network 2',
        status: 'building',
        ports: [2],
        project: 2,
    },
    {
        id: 3,
        name: 'Network 3',
        status: 'error',
        project: 3,
    },
];
