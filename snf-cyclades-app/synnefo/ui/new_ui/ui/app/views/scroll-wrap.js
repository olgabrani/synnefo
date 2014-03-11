Snf.scrollWrapView = Ember.View.extend({
    tagName: 'div',
    classNames: ['scroll-wrap scroll-pane-arrows'],
    templateName: 'scroll-wrap',
    didInsertElement: function() {
        ui.setElHeight(this.$());
    },
});
