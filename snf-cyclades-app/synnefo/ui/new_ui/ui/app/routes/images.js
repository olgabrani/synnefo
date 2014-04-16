Snf.ImagesRoute = Snf.ElemsRoute.extend({
    modelName: 'image',
});

Snf.ImageRoute = Ember.Route.extend({
    renderTemplate: function() {

        this.render('details');

        var controller = this.controllerFor('images');
        if (!controller.get('model').get("length")) {
            controller.set('model',this.store.find('image'));
        }

        this.render('lt-bar', {
            into: 'details',
            outlet: 'lt-bar',
            controller: controller,
        });
    },
});

Snf.ImageIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('image.info');
        
    },
});

Snf.ImageinitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('image');
    },

    afterModel: function(model) {
       this.transitionTo('image', model.get('firstObject').id);
    },
});

Snf.ImageInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/image-info');
    },
    model: function () {
        return this.modelFor("image");
    },
});
