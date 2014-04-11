Snf.StorageRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('container');
    }
});