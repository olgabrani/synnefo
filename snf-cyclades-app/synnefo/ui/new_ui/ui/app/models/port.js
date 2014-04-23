Snf.Port = DS.Model.extend({

    server      : DS.belongsTo('server', {async:true}),
    network     : DS.belongsTo('network', {async:true}),
    firewall    : DS.attr(),
    ipv4        : DS.attr(),
    ipv6        : DS.attr(),
    detachable  : DS.attr('boolean', {defaultValue: false}),

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
        server: 1,
        network: 1,
        firewall: 'on',
        ipv4: '11.212.96.12',
        detachable: true,
    },
    {
        id: 2,
        server: 1,
        network: 2,
        firewall: 'partial',
        ipv4: '22.212.96.30',
        detachable: true,  
    },
    {
        id: 3,
        server: 2,
        network: 1,
        firewall: 'off',
        ipv4: '33.212.96.00',
        detachable: true,
    },
    {
        id: 4,
        server: 3,
        network: 1,
        firewall: 'on',
        ipv6: '4444:0000:0000:0000:0202:B3FF:FE1E:8329',
        detachable: true,
    },
    {
        id: 5,
        server: 3,
        network: 1,
        firewall: 'on',
        ipv6: '5555:0db8:85a3:0042:1000:8a2e:0370:7334'
    },
    {
        id: 6,
        server: 1,
        network: 1,
        firewall: 'on',
        ipv6: ' 6666:0db8:85a3:0042:1000:8a2e:0370:7334',
    },
];
