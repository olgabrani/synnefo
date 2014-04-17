Snf.ServersCreateRoute = Ember.Route.extend({
    init: function() {
        this._super();
        console.log('init of ServersCreateRoute');
    },
    renderTemplate: function(controller) {
        this.render('wizardServer', {controller: controller}); // view
    },
    setupController: function(controller) {
        controller.set('image', this.store.find('image'));
        controller.set('account', this.store.find('account', 1));
    },
    actions: {
        closeWizard: function() {
            history.back();
        }
    }
});