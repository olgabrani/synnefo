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
    serversCnt: function(){
        return this.get('model').get('servers').length;
    }.property('model.servers'),

    submenu: [{
        'link': 'network.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'network.server-connected',
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
        reassignProject: function(newproject){
            this.get('model').set('project', newproject);
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

Snf.NetworkServerConnectedController = Snf.NetworkController.extend();

Snf.NetworkServerPortsController = Ember.ObjectController.extend({

    networkPorts: function() {
        var parentNetwork = this.get('parentController').get('model'); 

        // http://stackoverflow.com/questions/20479179
        return this.get('ports').filter(function(e) {
            return e.get('data.network.id') == parentNetwork.get('id');
        });

    }.property('ports.@each'),

});
