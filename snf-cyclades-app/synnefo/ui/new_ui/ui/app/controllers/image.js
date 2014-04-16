var actionsMetaImage = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-network-modal',
        spanCls: 'snf-trash-outline',
        actMany: true,
    },
};

Snf.ImageController = Snf.ElController.extend({

    maxActionsVisible: 2,
    type: 'image',
    needs: ['images'],
    
    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) { return actionsMetaImage[val]; });      
    }.property('model.enabledActions'),

    submenu: [
    {
        'link': 'image.info',
        'icon': 'snf-info-outline',
    }],

   
});


Snf.ImagesController = Snf.ElemsListController.extend({
    type : 'images',
    actionsMeta: function(){
        return _.toArray(actionsMetaImages);
    }.property(),

    actionsIntersection: function(){
        var Actions = this.get('selectedItems').map(function(i){
            return statusActionsImage[i.get('status')].enabledActions;
        });
        return _.intersection.apply(_,Actions);
    }.property('selectedItems.@each'),


    actionsMetaLt: function() {
       return _.map(this.get('actionsIntersection'), function(val,key) {
            return actionsMetaImage[val];
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
