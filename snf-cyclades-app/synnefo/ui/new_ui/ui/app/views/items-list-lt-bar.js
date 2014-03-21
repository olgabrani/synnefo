Snf.ItemsListLtBarView = Ember.View.extend({

    tagName: 'div',
    classNames: ['lt-bar'],
    templateName: 'items-list-lt-bar',
    didInsertElement: function () {
        ui.setElminHeight(this.$());
    }

});
