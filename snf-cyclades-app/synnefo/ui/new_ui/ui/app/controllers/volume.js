var actionsMetaVolume = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-volume-modal',
        spanCls: 'snf-trash-outline',
        actMany: 'destroy-volume-many-modal',
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

        dettachVolume: function(){
            console.log(this.get('model').get('name'));
            this.get('model').get('vm').get('volumes').removeObject(this.get('model'));
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
        // KPAP giati oxi ayto? :S
        console.log(_.intersection(Actions[0]));
        return _.intersection.apply(_,Actions);
    }.property('selectedItems.@each'),


    actionsMetaLt: function() {
       return _.map(this.get('actionsIntersection'), function(val,key) {
            return actionsMetaVolume[val];
        });

    }.property('actionsIntersection.@each'),

    actions: {
        destroyVolumeMany: function(){
            this.get('selectedItems').map(function(i){
                i.deleteRecord();
                i.save();
            });
        },
    },
});