Snf.ImagesRoute = Snf.ElemsRoute.extend({
    modelName: 'image',
});

Snf.ImageinitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('image');
    },

    afterModel: function(model) {
       this.transitionTo('image', model.get('firstObject').id);
    },
});