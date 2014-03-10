Snf.TagElComponent = Ember.Component.extend({
    tagName: 'li',
    title:'tag1',
    color: 'yellow',
    style: function () {
        return 'background-color:'+this.color;
    }.property('color'),

    didInsertElement: function() {
        this.$().find('.tag').attr('data-tooltip','');
        Foundation.libs.tooltips.init();
    },

    actions: {
        deleteTag: function() {
            this.sendAction('deleteTag', this.get('param'));
        },
    },

});
