Snf.SideactionsProjectComponent = Ember.Component.extend({

    tagName: 'li',
    classNames: ['bottom'],
    layoutName: 'sideactions-project',
    isEditable: false,
    isDisplayed: false,

    availableProjects: function() {
        var current = this.get('current');
        return this.get('projects').filter(function(p) {
            return p.get('id') != current.get('id');
        });
    }.property('projects'),

    mouseEnter: function(evt) {
        this.set('isDisplayed', true);
    },

    mouseLeave: function(evt) {
        this.set('isEditable', false);
        this.set('isDisplayed', false);
    },

    actions: {
        showProjects: function(){
            this.set('isEditable', true);
        },
        reassignProject: function(){
            this.sendAction('reassignProject');
            this.set('isEditable', false);
            this.set('isDisplayed', false);
        }
    },
});
