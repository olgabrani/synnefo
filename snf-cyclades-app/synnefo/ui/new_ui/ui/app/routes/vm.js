Snf.VmsRoute = Snf.ElemsRoute.extend({
    modelName: 'vm',
});

Snf.VmRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details');

        var controller = this.controllerFor('vms');
        if (!controller.get('model').get("length")) {
            controller.set('model',this.store.find('vm'));
        }

        this.render('lt-bar', {
            into: 'details',
            outlet: 'lt-bar',
            controller: controller,
        });
    },
});

Snf.VmIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        if ( Snf.get('currentPath') == 'vm.disk-connected' ) {
            this.transitionTo('vm.disk-connected');
        } else if ( Snf.get('currentPath')=='vm.network-connected' ) {
            this.transitionTo('vm.network-connected');
        } else {
            this.transitionTo('vm.info');
        }
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
