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
    vm          : DS.belongsTo('vm', { async:false }),

    enabledActions: function() {
        return statusActionsVolume[this.get('status')].enabledActions;
    }.property('state'),

});


Snf.Volume.FIXTURES = [
    {
        id: 1,
        name: 'Ο αγαπημένος μου δίσκος',
        status: 'running',
        size: 10737418240,
        vm: 1,
    },
    {
        id: 2,
        name: 'Crypto',
        status: 'running',
        size: 2048,
        vm: 1,
    },
    {
        id: 3,
        name: 'Disk 3',
        status: 'starting',
        size: 4096,
        storageType: 'drpd',
        vm: 3,
    },
];
