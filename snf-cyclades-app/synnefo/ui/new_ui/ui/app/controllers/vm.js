var actionsMetaVm = {
    'connect': {
        title: 'connect',
        act: 'connect-vm-modal',
        actMany: 'connect-vm-many-modal',
        spanCls: 'snf-thunder-full',
    },
    'start': {
        title: 'start me now',
        act: 'start-vm-modal',
        actMany: 'start-vm-many-modal',
        spanCls: 'snf-switch',
    },
    'destroy': {
        title: 'destroy',
        act: 'destroy-vm-modal',
        actMany: 'destroy-vm-many-modal',
        spanCls: 'snf-trash-outline',
    },
    'reboot': {
        title: 'reboot',
        act: 'reboot-vm-modal',
        actMany: 'reboot-vm-many-modal',
        spanCls: 'snf-refresh-outline',
    },
    'shutdown': {
        title: 'shutdown',
        act: 'shutdown-vm-modal',
        actMany: 'shutdown-vm-many-modal',
        spanCls: 'snf-pc-broken-full',
    },
};

Snf.VmController = Snf.ElController.extend({

    type: 'vm',
    iconCls: 'snf-pc-full',
    hasConnect: true,
    hasTags : true,
    isSelected: false,
    // KPAP wuat?
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

        destroyPort: function(port) {
            port.deleteRecord();
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
        destroyVmMany: function(){
            this.get('selectedItems').map(function(i){
                i.deleteRecord();
                i.save();
            });
        },
    },

});

Snf.VmInfoController = Snf.VmController.extend();

Snf.VmVolumeConnectedController = Snf.VmController.extend();


Snf.VmNetworkConnectedController = Snf.VmController.extend();

Snf.VmNetworkPortsController = Ember.ObjectController.extend({

    ports: function() {
        return  this.get('model').get('ports');
    }.property(),

});

/*Snf.DestroyPortModalController = Ember.ObjectController.extend({
    actions: {
        destroyPort: function(port) {
            port.deleteRecord();
        },
    }
});*/