var statusActionsVolume = {
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
};

Snf.Volume = DS.Model.extend({

    name        : DS.attr(),
    status      : DS.attr(),
    size        : DS.attr('number'),
    storageType : DS.attr('string', {defaultValue: 'Archipelago'}),
    server      : DS.belongsTo('server', { async:false }),
    project     : DS.belongsTo('project',{ async:true}),

    enabledActions: function() {
        return statusActionsVolume[this.get('status')].enabledActions;
    }.property('state'),

});


Snf.Volume.FIXTURES = [
    {
        id: 1,
        name: 'Volume 1',
        status: 'running',
        size: 10737418240,
        server: 1,
        project: 1,
    },
    {
        id: 2,
        name: 'Volume 2',
        status: 'running',
        size: 2048,
        server: 1,
        project: 1,
    },
    {
        id: 3,
        name: 'Volume 3',
        status: 'starting',
        size: 4096,
        storageType: 'drpd',
        server: 3,
        project: 1,
    },
];
