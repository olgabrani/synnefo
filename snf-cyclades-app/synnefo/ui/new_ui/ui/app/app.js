window.Snf = Ember.Application.create({
    LOG_ACTIVE_GENERATION: true,
    LOG_MODULE_RESOLVER: true,
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_VIEW_LOOKUPS: true,
    currentPath: '',
});


Snf.ApplicationAdapter = DS.FixtureAdapter;

Snf.RawTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});

Snf.ApplicationController = Ember.Controller.extend({
    updateCurrentPath: function() {
        Snf.set('currentPath', this.get('currentPath'));
    }.observes('currentPath')
});
