Snf.Port = DS.Model.extend({

    vm         : DS.belongsTo('vm', {async:true}),
    network    : DS.belongsTo('network', {async:true}),
    firewall   : DS.attr(),

    // firewallState can be off or on
    firewallState: function() {
        var state = 'off';
        if ( _.contains(['on','partial'], this.get('firewall')) ) { state='on'; }
        return state;
    }.property('firewall'),


});


Snf.Port.FIXTURES = [
    {
        id: 1,
        vm: 1,
        network: 1,
        firewall: 'on',
    },
    {
        id: 2,
        vm: 1,
        network: 2,
        firewall: 'partial',
    },
    {
        id: 3,
        vm: 2,
        network: 1,
        firewall: 'off',
    },
    {
        id: 4,
        vm: 3,
        network: 1,
        firewall: 'on',
    },
    {
        id: 5,
        vm: 3,
        network: 1,
        firewall: 'on',
    },
    {
        id: 6,
        vm: 1,
        network: 1,
        firewall: 'on',
    },
];
