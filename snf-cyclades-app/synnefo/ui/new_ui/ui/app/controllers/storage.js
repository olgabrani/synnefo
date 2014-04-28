Snf.StorageController = Ember.ArrayController.extend({
    itemController: function () {
        return 'container';
    }.property(),
});

Snf.ContainerController = Ember.ObjectController.extend({
    projects: function(){
        return this.store.find('project');
    }.property('model.project'),
    actions: {
        reassignProject: function(newproject){
            this.get('model').set('project', newproject);
        },
    },
});