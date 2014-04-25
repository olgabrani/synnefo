Snf.ElemsListController = Ember.ArrayController.extend({
    
    type: '',

    fullName: function () {
        return _.capitalize(this.type);
    }.property('type'),
    sortProperties: ['name'],

    // returns type without an 's', i.e. network
    _item: function () {
        return this.type.substring(0, this.type.length - 1);
    }.property('type'),
    
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
        return this.get('fullName')+' ('+this.get('viewCls')+')';
    }.property('viewCls', 'fullName'),

    // used for link-to purposes
    parent: function () {
        return this.type;
    }.property(),

    // used for link-to purposes
    childInit: function () {
        return this.get('_item')+'init';
    }.property(),

    selectedItems : Ember.A(),

    selectedAll: false,

    actions: {
        toggleCheckboxesState: function(){
            if (this.get('selectedAll')) {
                this.set('selectedItems',[]);
            }
            this.toggleProperty('selectedAll');
        },
        selectItem: function(param) {
            this.get('selectedItems').pushObject(param.get('model'));
        },
        unselectItem: function(param) {
            this.get('selectedItems').removeObject(param.get('model'));
        },
    },

    models: function(){
        return this.get('selectedItems');
    }.property('selectedItems'),

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

    // defines how many action icons will be visible at the sidebar
    maxActionsVisible: 4,

    // show main action icons
    mainActions: function() {
        var cnt = this.maxActionsVisible - 1;
        return this.get('actionsMeta').slice(0,cnt);
    }.property('model.enabledActions'),

    // ... and more actions on hover
    secondaryActions: function() {
        var cnt = this.maxActionsVisible - 1 - this.get('actionsCount');
        return this.get('actionsMeta').slice(cnt);
    }.property('model.enabledActions'),

    // returns true if therea are more actions that can be shown at the sidebar
    actionsMany: function() {
        return this.get('model').get('enabledActions').length > this.maxActionsVisible;
    }.property('model.enabledActions'),

    actionsCount: function() {
        return this.get('model').get('enabledActions').length;
    }.property('model.enabledActions'),


    actions: {
        refreshModel: function(model){
            this.controllerFor(this.type).set('model', model);
        },
        saveModel: function(){
            console.log('save model');
        },
        reassignProject: function(newproject){
            this.get('model').set('project', newproject);
        },
    },

    projects: function(){
        return this.store.find('project');
    }.property('model.project'),

    models: function(){
        var t = Ember.A();
        var m = this.get('model');
        t.pushObject(m);
        return t;
    }.property('model'),


});
