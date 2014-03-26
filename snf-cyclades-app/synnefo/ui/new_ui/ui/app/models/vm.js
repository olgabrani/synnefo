var statusActionsVm = {
    'off'      : {
        enabledActions : ['connect', 'start', 'destroy', ],
    },
    'error'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'building'      : {
        enabledActions : ['connect'],
    },
    'running'      : {
        enabledActions : ['connect', 'reboot', 'shutdown', 'destroy','connect', 'reboot',  ],
    },
    'rebooting'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'starting'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'shutting'      : {
        enabledActions : ['connect', 'destroy'],
    },
};

Snf.Vm = DS.Model.extend({

    name      : DS.attr(),
    status    : DS.attr(),
    os        : DS.attr(),
    hostname  : DS.attr(),
    created   : DS.attr('date'),
    updated   : DS.attr('date'),
    tags      : DS.hasMany('tag', { async:true }),
    volumes   : DS.hasMany('volume', { async:true}),
    ports     : DS.hasMany('port', { async: true}),
    project   : DS.belongsTo('project',{ async:true}),
    
    enabledActions: function() {
        return statusActionsVm[this.get('status')].enabledActions;
    }.property('status'),


    _networks: function() {
        var self = this;

        this.set('networks', this.get('ports').getEach('network').filter(function(p) {
            // wait until ports are loaded
            if (!p) { return false; }
            var fp = p.get('isFulfilled');

            // if ports are not Fulfilled, wait until they actually are loaded
            // and then call again _networks()
            if (!fp) {
                p.then(function(n) {
                    self._networks();
                });
            }

            return p.get('isFulfilled');
        }).map(function(p) {
            // console.log(p.toString());
            // p returns promise whereas p.content returns a network
            return p.content;
        }).uniq());

    // recalculate _networks when a network of a port changes
    }.observes('ports.@each.network'),

    // networks is a VM computed property
    /* From ember.Array documentation:
    When you are designing code that needs to accept any kind of Array-like
    object, you should use these methods instead of Array primitives because
    these will properly notify observers of changes to the array.*/
    networks: Ember.A(),
});


Snf.Vm.FIXTURES = [
    {
        created: '2011-04-19T10:18:52.085737+00:00',
        id: 1,
        name: "The answer to everything",
        os: 'windows',
        status: "running",
        hostname: 'http://www.in.gr',
        updated: "2011-05-29T14:07:07.037602+00:00",
        tags: [1,2,3],
        volumes: [1,2],
        ports: [1,2,6],
        project: 1,
    },
    {
        id: 2,
        name: 'My even cooler VM 2 that has a long name',
        status: 'error',
        os: 'unknown',
        hostname: "user@snf-38389.vm.okeanos.grnet.gr",
        updated: "2011-05-29T14:07:07.037602+00:00",
        tags: [4,5,6],
        volumes: [3],
        ports: [3],
        project: 2,
    },
    {
        id: 3,
        name: 'vm name 3 really large name vm name vm 1 really large name vm',
        status: 'building',
        os: 'windows',
        hostname: "user@snf-38389.vm.okeanos.grnet.gr",
        tags: [7],
        ports: [4,5],
        project: 3,
    },
    {
        id: 4,
        name: 'So awesome VM 4',
        status: 'off',
        os: 'fedora',
        tags: [8],
        project: 4,
    },
    {
        id: 5,
        name: 'olga',
        status: 'rebooting',
        os: 'kubuntu',
        tags: [9],
        project: 1,
    },
    {
        id: 6,
        name: 'athina',
        status: 'starting',
        os: 'kubuntu',
        project: 2,
    },
    {
        id: 7,
        name: 'kpap',
        status: 'shutting',
        os: 'kubuntu',
        project: 3,
    },
];
