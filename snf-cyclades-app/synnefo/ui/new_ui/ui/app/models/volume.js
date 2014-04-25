var statusActionsVolume = {
    'error'      : {
        enabledActions : ['destroy'],
    },
    'building'      : {
        enabledActions : [],
    },
    'active'      : {
        enabledActions : ['destroy'],
    },
    'starting'      : {
        enabledActions : ['destroy'],
    },
};

Snf.Volume = DS.Model.extend({

    name        : DS.attr(),
    status      : DS.attr(),
    size        : DS.attr('number'),
    storageType : DS.attr('string', {defaultValue: 'Archipelago'}),
    server      : DS.belongsTo('server', { async:false}),
    tenant_id   : DS.belongsTo('project',{ async:true}),

    enabledActions: function() {
        return statusActionsVolume[this.get('status').toLowerCase()].enabledActions;
    }.property('state'),
    
    statusLowerCase: function() {
        return this.get('status').toLowerCase();
    }.property('status'),
});


Snf.Volume.FIXTURES = [
    {
        id: 1,
        name: 'Volume 1',
        status: 'ACTIVE',
        size: 10737418240,
        server: 1,
        tenant_id: 1,
    },
    {
        id: 2,
        name: 'Volume 2',
        status: 'ERROR',
        size: 2048,
        server: 1,
        tenant_id: 1,
    },
    {
        id: 3,
        name: 'Volume 3',
        status: 'ACTIVE',
        size: 4096,
        storageType: 'drpd',
        server: 3,
        tenant_id: 1,
    },
];
