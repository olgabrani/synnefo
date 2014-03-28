var actionsMetaVm = {
    'connect': {
        title: 'connect',
        act: 'connect-vm-modal',
        spanCls: 'snf-thunder-full',
        controller: 'vm',
    },
    'start': {
        title: 'start me now',
        act: 'start-vm-modal',
        spanCls: 'snf-switch',
        controller: 'vm',
    },
    'destroy': {
        title: 'destroy',
        act: 'destroy-vm-modal',
        spanCls: 'snf-trash-outline',
        controller: 'vm',
    },
    'reboot': {
        title: 'reboot',
        act: 'reboot-vm-modal',
        spanCls: 'snf-refresh-outline',
        controller: 'vm',
    },
    'shutdown': {
        title: 'shutdown',
        act: 'shutdown-vm-modal',
        spanCls: 'snf-pc-broken-full',
        controller: 'vm',
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
            volume.get('vm').get('volumes').removeObject(volume);
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

        reassignProject: function(project){
            //this.get('model').set('project',project);
        },
    },
});

Snf.VmsController = Snf.ElemsListController.extend({
    type : 'vms',
    iconCls  : 'snf-pc-full',
    fullName: 'Virtual Machines',

    actionsMeta: function(){
        return _.toArray(actionsMetaVm);
    }.property(),
});

Snf.VmInfoController = Snf.VmController.extend();

Snf.VmVolumeConnectedController = Snf.VmController.extend();


Snf.VmNetworkConnectedController = Snf.VmController.extend();

Snf.VmNetworkPortsController = Ember.ObjectController.extend({

    ports: function() {
        return  this.get('model').get('ports');
    }.property(),

});
