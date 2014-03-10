Snf.VmsCreateRoute = Ember.Route.extend({
    init: function() {
        this._super();
        console.log('init of VmsCreateRoute');
    },
    renderTemplate: function(controller) {
        this.render('wizard/create-vms', {controller: controller}); // template
    },
    setupController: function(controller) {
        controller.set('image', this.store.find('image'));
        // controller.set('account', this.store.find('account', 1));
    },
    actions: {
        closeWizard: function() {
            history.back();
        }
    }
});