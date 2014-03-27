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

    _vms: function() {
        var self = this;

        this.set('vms', this.get('ports').getEach('vm').filter(function(p) {
            if (!p) { return false; }
            var fp = p.get('isFulfilled');

            if (!fp) {
                p.then(function(n) {
                    self._vms();
                });
            }
            return p.get('isFulfilled');
        }).map(function(p) {
            return p.content;
        }).uniq());

    }.observes('ports.@each.vm'),

    vms: Ember.A(),

});


Snf.Network.FIXTURES = [
    {
        id: 1,
        name: 'Network 1',
        status: 'running',
        ports: [1,3,4,6],
        project: 1,
    },
    {
        id: 2,
        name: 'Network 2',
        status: 'building',
        ports: [2,5],
        project: 2,
    },
    {
        id: 3,
        name: 'Network 3',
        status: 'error',
        project: 3,
    },
];
