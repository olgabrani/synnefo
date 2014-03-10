Snf.ApplicationRoute = Ember.Route.extend({
    actions: {
        openModal: function(modalName, controller, model) {

            this.controllerFor(controller).set("model", model);
            this.render('modals/'+modalName, {
                into: 'application',
                outlet: 'modal',
                controller: controller,
            });
            $('#app-modal').foundation('reveal','open');
        },
    }
});




Snf.ElemsRoute = Ember.Route.extend({
    
    modelName: '',

    model: function(params){
        this.set( 'viewCls', params.view_cls );
        var controller = this.get("controller");

        // Ember checks if controller is already set, and if so, does not set it
        // up again. Hence, the following hack:
        if (controller) {
            controller.set("viewCls", params.view_cls);
        }

        // end of hack
        return this.store.find(this.modelName);
    },
    
    renderTemplate: function() {
        this.render('elems');
    },
   
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set("viewCls", this.get("viewCls"));
        controller.set('modelName', this.modelName);
    },
    
    actions: {
        openWizard: function() {
            var wizardType = this.routeName;
            this.transitionTo(wizardType+'Create');
        }
    }

});
