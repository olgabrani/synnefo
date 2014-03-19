Snf.SideactionsProjectComponent = Ember.Component.extend({

    tagName: 'li',
    classNames: ['bottom'],
    layoutName: 'sideactions-project',
    isEditable: false,
    isDisplayed: false,

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
            console.log(this.get('param'));
            this.sendAction('reassignProject',this.get('param'));
            this.set('isEditable', false);
            this.set('isDisplayed', false);
        }
    }

});
