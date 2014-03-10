Snf.VolumesRoute = Snf.ElemsRoute.extend({
    modelName: 'volume',
});

Snf.VolumeRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details');
    },
});


Snf.VolumeinitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('volume');
    },
    afterModel: function(model) {
       this.transitionTo('volume', model.get('firstObject').id);
    },
});

Snf.VolumeInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/info');
    },
    model: function () {
        return this.modelFor("volume");
    },
});

Snf.VolumeVmConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/disk-connected');
    },
    model: function () {
        return this.modelFor("volume");
    }
});
