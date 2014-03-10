var actionsMetaVm = {
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

    submenu: [
    {
        'link': 'vm.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'vm.disk-connected',
        'icon': 'snf-volume-outline',
    },
    {
        'link': 'vm.network-connected',
        'icon': 'snf-network-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) { return actionsMetaVm[val]; });      
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
            this.transitionToRoute('vms.grid-view');
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
    },
});


Snf.VmsController = Snf.ElemsListController.extend({
    type : 'vms',
    iconCls  : 'snf-pc-full',
});

