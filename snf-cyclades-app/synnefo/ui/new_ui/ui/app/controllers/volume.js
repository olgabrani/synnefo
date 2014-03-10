var actionsMetaVolume = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-volume-modal',
        spanCls: 'snf-switch',
        controller: 'volume'
    },
};

Snf.VolumeController = Snf.ElController.extend({
    type: 'volume',

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
});


Snf.VolumesController = Snf.ElemsListController.extend({
    type : 'volumes',
});

