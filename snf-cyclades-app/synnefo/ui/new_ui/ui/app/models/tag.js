Snf.Tag = DS.Model.extend({

    name     : DS.attr(),
    color    : DS.attr(),
    vm       : DS.belongsTo('vm', { async:true }),

});


Snf.Tag.FIXTURES = [
    {
        id: 1,
        name: 'hacking',
        color: '#1E96FF',
        vm: 1,
    },
    {
        id: 2,
        name: 'movies',
        color: '#FFCB44',
        vm: 1,
    },
    {
        id: 3,
        name: 'dev',
        color: '#DF2F74',
        vm: 1,
    },
    {
        id: 4,
        name: 'var',
        color: '#F76720',
        vm: 2,
    },
    {
        id: 5,
        name: 'hacking',
        color: '#1E96FF',
        vm: 2,
    },
    {
        id: 6,
        name: 'movies',
        color: '#FFCB44',
        vm: 2,
    },
    {
        id: 7,
        name: 'dev',
        color: '#DF2F74',
        vm: 3,
    },
    {
        id: 8,
        name: 'dev',
        color: '#DF2F74',
        vm: 4,
    },
    {
        id: 9,
        name: 'dev',
        color: '#DF2F74',
        vm: 5,
    }
];
