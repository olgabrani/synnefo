Snf.ElemsListController = Ember.ArrayController.extend({
    
    type: '',

    // returns type without an 's', i.e. network
    _item: function () {
        return this.type.substring(0, this.type.length - 1);
    }.property(),
    
    // returns type without an 's', i.e. network
    itemController: function () {
        return this.get('_item');
    }.property(),

    // returns snf-network-full
    iconCls:  function () {
        return 'snf-'+this.get('_item')+'-full';
    }.property(),

    // allows grid-view/list-view icons in actions-bar
    hasViewOptions: true,
    
    // allows search functionality
    hasSearch: true,

    // allows items filtering
    hasFilter: true,

    pageTitle: function () {
        return this.get('type')+' ('+this.get('viewCls')+')';
    }.property('viewCls'),

    // used for link-to purposes
    parent: function () {
        return this.type;
    }.property(),

    // used for link-to purposes
    childInit: function () {
        return this.get('_item')+'init';
    }.property(),

});

Snf.ElController = Ember.ObjectController.extend({

    type: '',

    // returns snf-network-full
    iconCls:  function () {
        return 'snf-'+this.type+'-full';
    }.property(),

    hasConnect: false,

    // allows grid-view/list-view icons in actions-bar
    hasViewOptions: true,

    // allows search functionality
    hasSearch: false,

    // allows items filtering
    hasFilter: false,

    pageTitle: function (){
        return this.get('model').get('name');
    }.property('name'),

    parent: function() {
        return this.type+'s';
    }.property(),

    childInit: function() {
        return this.type+'init';
    }.property(),




});
