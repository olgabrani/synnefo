Snf.Node = DS.Model.extend({

    name         : DS.attr(),
    isFolder     : DS.attr('boolean'),
    isRoot       : DS.attr('boolean'),
    hasChildren  : DS.attr('boolean'),
    children     : DS.hasMany('Node', {async: true, inverse: 'parent'}),
    parent       : DS.belongsTo('Node', {async: true, inverse: 'children'}),
    project      : DS.belongsTo('project',{ async:true}),
    size         : DS.attr('number'),
    capacity     : DS.attr('number'),

});

Snf.Node.FIXTURES = [
    {
        id: 1,
        name: 'level 1 folder',
        isFolder: true,
        isRoot: true,
        hasChildren: true,
        children: [2,3],
        project: 1,
        capacity: 100000,
    },{
        id: 2, 
        name: 'level 2 folder',
        isFolder: true,
        hasChildren: true,
        children: [4],
        parent: 1,
    },{
        id: 3,
        name: 'child 1a',
        parent: 1,
        size: 30000,
    }, {
        id: 4,
        name: 'level 3 folder',
        isFolder: true,
        hasChildren: true,
        children: [5,6],
        parent: 2,
    }, {
        id: 5,
        name: 'child3a.txt',
        parent: 4,
        size: 52000,
    }, {
        id: 6,
        name: 'child 3b',
        parent: 4,
        size: 2000000,
    },{
        id: 7,
        name: 'Pithos',
        isFolder: true,
        isRoot: true,
        hasChildren: true,
        children: [8],
        project: 2,
        capacity: 50000000,
    },{
        id: 8,
        name: 'Pithos child',
        parent: 7, 
        size: 100000,
    }

];