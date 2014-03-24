var actionsMetaNetwork = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-network-modal',
        spanCls: 'snf-trash-outline',
        controller: 'network'
    },
};

Snf.NetworkController = Snf.ElController.extend({

    maxActionsVisible: 2,
    type: 'network',
    needs: ['networks'],

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
});
