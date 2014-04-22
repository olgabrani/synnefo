Snf.ServersRoute = Snf.ElemsRoute.extend({
    modelName: 'server',
});

Snf.ServerRoute = Ember.Route.extend({
    renderTemplate: function() {
    
        this.render('details');

        var controller = this.controllerFor('servers');
        if (!controller.get('model').get("length")) {
            controller.set('model',this.store.find('server'));
        }

        this.render('lt-bar', {
            into: 'details',
            outlet: 'lt-bar',
            controller: controller,
        });
    },
});

Snf.ServerIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        if ( Snf.get('currentPath') == 'server.volume-connected' ) {
            this.transitionTo('server.volume-connected');
        } else if ( Snf.get('currentPath')=='server.network-connected' ) {
            this.transitionTo('server.network-connected');
        } else {
            this.transitionTo('server.info');
        }
    },
});

Snf.ServerinitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('server');
    },
    
    afterModel: function(model) {
        this.transitionTo('server', model.get('firstObject').id);
    },
});

Snf.ServerInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/server-info');
    },
    model: function () {
        return this.modelFor("server");
    },
});

Snf.ServerVolumeConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/server-volume-connected');
    },
    model: function () {
        return this.modelFor("server");
    }
});

Snf.ServerNetworkConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/server-network-connected');
    },
    model: function () {
        return this.modelFor("server");
    }
});
