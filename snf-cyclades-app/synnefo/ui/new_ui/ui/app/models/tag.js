Snf.Tag = DS.Model.extend({

    name     : DS.attr(),
    color    : DS.attr(),
    server       : DS.belongsTo('server', { async:true }),

});


Snf.Tag.FIXTURES = [
    {
        id: 1,
        name: 'hacking',
        color: '#1E96FF',
        server: 1,
    },
    {
        id: 2,
        name: 'movies',
        color: '#FFCB44',
        server: 1,
    },
    {
        id: 3,
        name: 'dev',
        color: '#DF2F74',
        server: 1,
    },
    {
        id: 4,
        name: 'var',
        color: '#F76720',
        server: 2,
    },
    {
        id: 5,
        name: 'hacking',
        color: '#1E96FF',
        server: 2,
    },
    {
        id: 6,
        name: 'movies',
        color: '#FFCB44',
        server: 2,
    },
    {
        id: 7,
        name: 'dev',
        color: '#DF2F74',
        server: 3,
    },
    {
        id: 8,
        name: 'dev',
        color: '#DF2F74',
        server: 4,
    },
    {
        id: 9,
        name: 'dev',
        color: '#DF2F74',
        server: 5,
    }
];
