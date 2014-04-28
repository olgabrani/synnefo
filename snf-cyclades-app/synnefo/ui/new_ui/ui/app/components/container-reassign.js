Snf.ContainerReassignComponent = Ember.Component.extend({

    layoutName: 'container-reassign',
    isEditable: false,
    isDisplayed: false,

    componentCurrent: function(){
        return this.get('current');
    }.property(),

    availableProjects: function() {
        var componentCurrent = this.get('componentCurrent');
        return this.get('projects').filter(function(p) {
            return p.get('id') != componentCurrent.get('id');
        });
    }.property('componentCurrent'),

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
        reassignProject: function(newproject){
            this.set('componentCurrent', newproject);
            this.set('current', newproject);
            this.sendAction('reassignProject', newproject);
            this.set('isEditable', false);
            this.set('isDisplayed', false);
        }
    },
});
