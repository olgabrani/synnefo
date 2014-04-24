Snf.EditablePropComponent = Ember.Component.extend({

    tagName: 'div',
    classNames: ['editable'],
    layoutName: 'editable-prop',
    isEditable: false,

    actions: {
        allowEdit: function(){
            this.set('isEditable', true);
        },
        acceptEditableChanges: function(){
            //https://github.com/emberjs/website/issues/1284
            // Ember.run.debounce(this, this.sendAction('ok'), 50);
            this.sendAction('ok');
            this.set('isEditable', false);

        },
    }

});
