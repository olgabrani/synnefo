Snf.Project = DS.Model.extend({
    name      : DS.attr(),
    servers   : DS.hasMany('server', { async:true }),
});

Snf.Project.FIXTURES = [
    {
        id: 1,
        name: 'Awesome Project',
        servers: [1,5],
    },
    {
        id: 2,
        name: 'Project 2',
        servers: [2,6],
    },
    {
        id: 3,
        name: 'Project 3',
        servers: [3,7],
    },
    {
        id: 4,
        name: 'Project 4',
        servers: [4]
    },
];