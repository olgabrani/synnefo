Snf.StorageRoute = Ember.Route.extend({
    model: function(){
        return  this.store.find('node');
    }
});

Snf.ContainerRoute = Ember.Route.extend({
    model: function(param){
        return  this.store.find('node', param.node_id);
    }
});
