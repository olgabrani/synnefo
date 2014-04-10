Snf.PortController = Ember.ObjectController.extend({
    actions: {
        destroyPort: function(port) {
            port.deleteRecord();
        },
    }
});