var actionsMetaVolume = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-volume-modal',
        spanCls: 'snf-trash-outline',
        controller: 'volume'
    },
};

Snf.VolumeController = Snf.ElController.extend({
    type: 'volume',
    needs: ['volumes'],

    submenu: [
    {
        'link': 'volume.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'volume.vm-connected',
        'icon': 'snf-pc-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) {return actionsMetaVolume[val]; });      
    }.property('model.enabledActions'),

    actions: {

        dettachVolume: function(volume){
            volume.get('vm').get('volumes').removeObject(volume);
        },
        destroyVolume: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            var viewCls = this.get('controllers.volumes.viewCls') || 'grid-view'
            this.transitionToRoute('volumes', viewCls);
        },
    }
});


Snf.VolumesController = Snf.ElemsListController.extend({
    type : 'volumes',
    actionsMeta: function(){
        return _.toArray(actionsMetaVolume);
    }.property(),
});

