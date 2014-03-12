Snf.NetworksRoute = Snf.ElemsRoute.extend({
    modelName: 'network',
});

Snf.NetworkRoute = Ember.Route.extend({
    renderTemplate: function() {

        this.render('details');

        var controller = this.controllerFor('networks');
        controller.set('model',this.store.find('network'));

        this.render('lt-bar', {
            into: 'details',
            outlet: 'lt-bar',
            controller: controller,
        });
    },
});

Snf.NetworkIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('network.info');
    },
});

Snf.NetworkinitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('network');
    },

    afterModel: function(model) {
       this.transitionTo('network', model.get('firstObject').id);
    },
});

Snf.NetoworkInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/info');
    },
    model: function () {
        return this.modelFor("network");
    },
});

Snf.NetworkVmConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/disk-connected');
    },
    model: function () {
        return this.modelFor("network");
    }
});
