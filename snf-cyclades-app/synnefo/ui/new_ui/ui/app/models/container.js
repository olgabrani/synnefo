Snf.Container = DS.Model.extend({

    name        : DS.attr(),
    capacity    : DS.attr('number'),
    project     : DS.belongsTo('project',{ async:true}),

});


Snf.Container.FIXTURES = [
    {
        id: 1,
        name: 'Pithos',
        capacity: 50000000000,
        project: 1,
    },

    {
        id: 2,
        name: 'Container 2',
        capacity: 1000000000,
        project: 2,
    },
];
