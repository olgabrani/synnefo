var actionsMetaVolume = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-volume-modal',
        spanCls: 'snf-trash-outline',
        actMany: true,
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
        'link': 'volume.server-connected',
        'icon': 'snf-pc-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) {return actionsMetaVolume[val]; });      
    }.property('model.enabledActions'),

    actions: {

        detachVolume: function(){
            this.get('model').get('server').get('volumes').removeObject(this.get('model'));
            this.get('model').set('server', null);
        },
        destroyVolume: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            var viewCls = this.get('controllers.volumes.viewCls') || 'grid-view';
            this.transitionToRoute('volumes', viewCls);
        },
    }
});


Snf.VolumesController = Snf.ElemsListController.extend({
    type : 'volumes',

    actionsMeta: function(){
        return _.toArray(actionsMetaVolume);
    }.property(),

    actionsIntersection: function(){
        var Actions = this.get('selectedItems').map(function(i){
            return statusActionsVolume[i.get('status')].enabledActions;
        });
        return _.intersection.apply(_,Actions);
    }.property('selectedItems.@each'),


    actionsMetaLt: function() {
       return _.map(this.get('actionsIntersection'), function(val,key) {
            return actionsMetaVolume[val];
        });

    }.property('actionsIntersection.@each'),

    actions: {
        destroyVolume: function(){
            this.get('models').map(function(i){
                i.deleteRecord();
                i.save();
            });
        },
    },
});