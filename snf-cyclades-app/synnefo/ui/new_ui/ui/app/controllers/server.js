var actionsMetaServer = {
    'connect': {
        title: 'connect',
        act: 'connect-server-modal',
        actMany: true,
        spanCls: 'snf-thunder-full',
    },
    'start': {
        title: 'start me now',
        act: 'start-server-modal',
        actMany: true,
        spanCls: 'snf-switch',
    },
    'destroy': {
        title: 'destroy',
        act: 'destroy-server-modal',
        actMany: true,
        spanCls: 'snf-trash-outline',
    },
    'reboot': {
        title: 'reboot',
        act: 'reboot-server-modal',
        actMany: false,
        spanCls: 'snf-refresh-outline',
    },
    'shutdown': {
        title: 'shutdown',
        act: 'shutdown-server-modal',
        actMany: true,
        spanCls: 'snf-pc-broken-full',
    },
};

Snf.ServerController = Snf.ElController.extend({

    type: 'server',
    iconCls: 'snf-pc-full',
    hasConnect: true,
    hasTags : true,
    isSelected: false,
    needs: ['servers'],

    submenu: [
    {
        'link': 'server.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'server.volume-connected',
        'icon': 'snf-volume-outline',
    },
    {
        'link': 'server.network-connected',
        'icon': 'snf-network-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) {
            return actionsMetaServer[val];
        });
    }.property('model.enabledActions'),


    actions: {

        deleteTag: function(tag) {
            this.get('model').get('tags').removeObject(tag);
        },

        dettachVolume: function(volume){
            this.get('model').get('volumes').removeObject(volume);
        },
        dettachServerFromVolume: function(param){
            console.log(this.get('model').toString(),'model');
            console.log(param.toString(), 'param');
        },

        rebootServer: function(){
            this.get('model').set('status','REBOOT');
            var that = this;
            setTimeout(function(){
                that.get('model').set('status','ACTIVE');
            },3000);
        },

        destroyServer: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            var viewCls = this.get('controllers.servers.viewCls') || 'grid-view';
            this.transitionToRoute('servers', viewCls);
        },

        shutdownServer: function(){
            this.get('model').set('status','SHUTTING');
            var that = this;
            setTimeout(function(){
                that.get('model').set('status','STOPPED');
            },3000);
        },

        startServer: function(){
            this.get('model').set('status','ACTIVE');
        },

        reassignProject: function(newproject){
            this.get('model').set('project', newproject);
        },
    },
});

Snf.ServersController = Snf.ElemsListController.extend({
    type : 'servers',
    iconCls  : 'snf-pc-full',
    fullName: 'Virtual Machines',

    actionsIntersection: function(){
        var Actions = this.get('selectedItems').map(function(i){
            return statusActionsServer[i.get('status').toLowerCase()].enabledActions;
        });
        return _.intersection.apply(_,Actions);
    }.property('selectedItems.@each'),


    actionsMetaLt: function() {
       return _.map(this.get('actionsIntersection'), function(val,key) {
            return actionsMetaServer[val];
        });

    }.property('actionsIntersection.@each'),

    actions: {
        destroyServer: function(){
            this.get('models').map(function(i){
                i.deleteRecord();
                i.save();
            });
        },

        rebootServer: function(){
            this.get('models').map(function(i){
                i.set('status','REBOOT');
                setTimeout(function(){
                    i.set('status','ACTIVE'); 
                },3000);
            });
        },

        shutdownServer: function(){
            this.get('models').map(function(i){
                i.set('status','SHUTTING');
                setTimeout(function(){
                    i.set('status','STOPPED'); 
                },3000);
            });
        },

        startServer: function(){
            this.get('models').map(function(i){
                i.set('status','ACTIVE');
            });
        },
    },

});

Snf.ServerInfoController = Snf.ServerController.extend();

Snf.ServerVolumeConnectedController = Snf.ServerController.extend();

Snf.ServerNetworkConnectedController = Snf.ServerController.extend();

Snf.ServerNetworkPortsController = Ember.ObjectController.extend({

    serverPorts: function() {
        
        var parentVM = this.get('parentController').get('model');        
        
        // http://stackoverflow.com/questions/20479179
        return this.get('ports').filter(function(e) {
            return e.get('data.server.id') == parentVM.get('id');
        });

    }.property('ports.@each'),

});
