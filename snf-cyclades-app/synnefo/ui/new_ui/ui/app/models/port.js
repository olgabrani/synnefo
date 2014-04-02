Snf.Port = DS.Model.extend({

    vm          : DS.belongsTo('vm', {async:true}),
    network     : DS.belongsTo('network', {async:true}),
    firewall    : DS.attr(),
    ipv4        : DS.attr(),
    ipv6        : DS.attr(),
    dettachable : DS.attr('boolean', {defaultValue: false}),

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
        ipv4: '83.212.96.12',
        dettachable: true,
    },
    {
        id: 2,
        vm: 1,
        network: 2,
        firewall: 'partial',
        ipv4: '83.212.96.30',
        dettachable: true,  
    },
    {
        id: 3,
        vm: 2,
        network: 1,
        firewall: 'off',
        ipv4: '83.212.96.00',
        dettachable: true,
    },
    {
        id: 4,
        vm: 3,
        network: 1,
        firewall: 'on',
        ipv6: 'FE80:0000:0000:0000:0202:B3FF:FE1E:8329',
        dettachable: true,
    },
    {
        id: 5,
        vm: 3,
        network: 1,
        firewall: 'on',
        ipv6: '2001:0db8:85a3:0042:1000:8a2e:0370:7334'
    },
    {
        id: 6,
        vm: 1,
        network: 1,
        firewall: 'on',
        ipv6: ' 2001:0db8:85a3:0042:1000:8a2e:0370:7334',
    },
];
