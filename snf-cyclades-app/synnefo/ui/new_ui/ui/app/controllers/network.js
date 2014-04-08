var actionsMetaNetwork = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-network-modal',
        spanCls: 'snf-trash-outline',
        actMany: true,
    },
};

Snf.NetworkController = Snf.ElController.extend({

    maxActionsVisible: 2,
    type: 'network',
    needs: ['networks'],
    vmsCnt: function(){
        return this.get('model').get('vms').length;
    }.property('model.vms'),

    submenu: [{
        'link': 'network.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'network.vm-connected',
        'icon': 'snf-pc-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) { return actionsMetaNetwork[val]; });      
    }.property('model.enabledActions'),

    actions: {
        destroyNetwork: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            var viewCls = this.get('controllers.networks.viewCls') || 'grid-view';
            this.transitionToRoute('networks', viewCls);
        },
    }

});


Snf.NetworksController = Snf.ElemsListController.extend({
    type : 'networks',
    actionsMeta: function(){
        return _.toArray(actionsMetaNetwork);
    }.property(),

    actionsIntersection: function(){
        var Actions = this.get('selectedItems').map(function(i){
            return statusActionsNetwork[i.get('status')].enabledActions;
        });
        return _.intersection.apply(_,Actions);
    }.property('selectedItems.@each'),


    actionsMetaLt: function() {
       return _.map(this.get('actionsIntersection'), function(val,key) {
            return actionsMetaNetwork[val];
        });

    }.property('actionsIntersection.@each'),

    actions: {
        destroyNetwork: function(){
            this.get('models').map(function(i){
                i.deleteRecord();
                i.save();
            });
        },
    },
});


Snf.NetworkInfoController = Snf.NetworkController.extend();

Snf.NetworkVmConnectedController = Snf.NetworkController.extend();

Snf.NetworkVmPortsController = Ember.ObjectController.extend({

    ports: function() {
        return  this.get('model').get('ports');
    }.property(),

});
