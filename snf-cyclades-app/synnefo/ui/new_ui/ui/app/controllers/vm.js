var actionsMetaVm = {
    'connect': {
        title: 'connect',
        act: 'connect-vm-modal',
        actMany: true,
        spanCls: 'snf-thunder-full',
    },
    'start': {
        title: 'start me now',
        act: 'start-vm-modal',
        actMany: true,
        spanCls: 'snf-switch',
    },
    'destroy': {
        title: 'destroy',
        act: 'destroy-vm-modal',
        actMany: true,
        spanCls: 'snf-trash-outline',
    },
    'reboot': {
        title: 'reboot',
        act: 'reboot-vm-modal',
        actMany: false,
        spanCls: 'snf-refresh-outline',
    },
    'shutdown': {
        title: 'shutdown',
        act: 'shutdown-vm-modal',
        actMany: true,
        spanCls: 'snf-pc-broken-full',
    },
};

Snf.VmController = Snf.ElController.extend({

    type: 'vm',
    iconCls: 'snf-pc-full',
    hasConnect: true,
    hasTags : true,
    isSelected: false,
    needs: ['vms'],

    submenu: [
    {
        'link': 'vm.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'vm.volume-connected',
        'icon': 'snf-volume-outline',
    },
    {
        'link': 'vm.network-connected',
        'icon': 'snf-network-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) {
            return actionsMetaVm[val];
        });
    }.property('model.enabledActions'),


    actions: {

        deleteTag: function(tag) {
            this.get('model').get('tags').removeObject(tag);
        },

        dettachVolume: function(volume){
            this.get('model').get('volumes').removeObject(volume);
        },
        dettachVmFromVolume: function(param){
            console.log(this.get('model').toString(),'model');
            console.log(param.toString(), 'param');
        },

        rebootVm: function(){
            this.get('model').set('status','rebooting');
            var that = this;
            setTimeout(function(){
                that.get('model').set('status','running'); 
            },3000);
        },

        destroyVm: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            var viewCls = this.get('controllers.vms.viewCls') || 'grid-view';
            this.transitionToRoute('vms', viewCls);
        },

        shutdownVm: function(){
            this.get('model').set('status','shutting');
            var that = this;
            setTimeout(function(){
                that.get('model').set('status','off'); 
            },3000);
        },

        startVm: function(){
            this.get('model').set('status','running');
        },

        reassignProject: function(newproject){
            this.get('model').set('project', newproject);
        },
    },
});

Snf.VmsController = Snf.ElemsListController.extend({
    type : 'vms',
    iconCls  : 'snf-pc-full',
    fullName: 'Virtual Machines',

    actionsIntersection: function(){
        var Actions = this.get('selectedItems').map(function(i){
            return statusActionsVm[i.get('status')].enabledActions;
        });
        return _.intersection.apply(_,Actions);
    }.property('selectedItems.@each'),


    actionsMetaLt: function() {
       return _.map(this.get('actionsIntersection'), function(val,key) {
            return actionsMetaVm[val];
        });

    }.property('actionsIntersection.@each'),

    actions: {
        destroyVm: function(){
            this.get('models').map(function(i){
                i.deleteRecord();
                i.save();
            });
        },

        rebootVm: function(){
            this.get('models').map(function(i){
                i.set('status','rebooting');
                setTimeout(function(){
                    i.set('status','running'); 
                },3000);
            });
        },

        shutdownVm: function(){
            this.get('models').map(function(i){
                i.set('status','shutting');
                setTimeout(function(){
                    i.set('status','off'); 
                },3000);
            });
        },

        startVm: function(){
            this.get('models').map(function(i){
                i.set('status','running');
            });
        },
    },

});

Snf.VmInfoController = Snf.VmController.extend();

Snf.VmVolumeConnectedController = Snf.VmController.extend();

Snf.VmNetworkConnectedController = Snf.VmController.extend();

Snf.VmNetworkPortsController = Ember.ObjectController.extend({

    vmPorts: function() {
        
        var parentVM = this.get('parentController').get('model');        
        
        // http://stackoverflow.com/questions/20479179
        return this.get('ports').filter(function(e) {
            return e.get('data.vm.id') == parentVM.get('id')
        });

    }.property('ports.@each'),

});
