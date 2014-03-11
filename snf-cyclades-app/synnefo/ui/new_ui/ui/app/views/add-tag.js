Snf.AddTagView = Ember.View.extend({

    classNames: ['add-tag'],
    templateName: 'add-tag',

    didInsertElement: function() {
        $('#colorpicker').farbtastic('#color');
        var that = this;
        this.$().find('.show-add-tag').click(function(e) {
            e.preventDefault();
            that.slideUpEl();
        });
    },

    slideUpEl: function () {
        $('.add-tag').find('.snf-color-picker').slideToggle('slow');
    }

});
