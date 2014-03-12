Snf.AddTagView = Ember.View.extend({

    classNames: ['add-tag'],
    templateName: 'add-tag',

    didInsertElement: function() {
        $('#colorpicker').farbtastic('#color');
    },
    
});
