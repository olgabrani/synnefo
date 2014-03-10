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

    enabledActions: function() {
        return statusActionsNetwork[this.get('status')].enabledActions;
    }.property('status'),

});


Snf.Network.FIXTURES = [
    {
        id: 1,
        name: 'Network 1',
        status: 'running',
        ports: [1,3,4,6],
    },
    {
        id: 2,
        name: 'Network 2',
        status: 'building',
        ports: [2,5],
    },
    {
        id: 3,
        name: 'Network 3',
        status: 'error',
    },
];
