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
            this.set('isEditable', false);
            this.sendAction('ok');
        },
    }

});
