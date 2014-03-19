Snf.Project = DS.Model.extend({
    name      : DS.attr(),
    vms       : DS.hasMany('vm', { async:true }),
});

Snf.Project.FIXTURES = [
    {
        id: 1,
        name: 'Awesome Project',
        vms: [1,5],
    },
    {
        id: 2,
        name: 'Project 2',
        vms: [2,6],
    },
    {
        id: 3,
        name: 'Project 3',
        vms: [3,7],
    },
    {
        id: 4,
        name: 'Project 4',
        vms: [4]
    },
];