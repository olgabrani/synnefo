Snf.VmsRoute = Snf.ElemsRoute.extend({
    modelName: 'vm',
});

Snf.VmRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details');
    },

});


Snf.VminitRoute = Ember.Route.extend({
    model: function(){
      return this.store.find('vm');
    },
    afterModel: function(model) {
       this.transitionTo('vm', model.get('firstObject').id);
    },
});

Snf.VmInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/info');
    },
    model: function () {
        return this.modelFor("vm");
    },
});

Snf.VmDiskConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/vm-disk-connected');
    },
    model: function () {
        return this.modelFor("vm");
    }
});

Snf.VmNetworkConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/vm-network-connected');
    },
    model: function () {
        return this.modelFor("vm");
    }
});
