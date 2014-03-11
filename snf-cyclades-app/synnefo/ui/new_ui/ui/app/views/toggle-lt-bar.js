Snf.toggleLtBarView = Ember.View.extend({
    tagName: 'a',
    classNames: ['toggle-lt-bar'],
    templateName: 'toggle-lt-bar',

    didInsertElement: function() {
        var that = this;
        this.$().click(function (e) {
            that.aux_function(400,e);
        });
        this.$().find('img-wrap a').click(function(e) {
            // TODO: hide list
        });
    },

    aux_function: function (speed,e) {
        e.preventDefault();
        e.stopPropagation();
        this.listToggle(speed,e);
    },

    listToggle: function (speed,e) {
        var cmarg = parseInt($('.lt-bar').width()) - parseInt($('.toggle-lt-bar').outerWidth(true));        
        var ctemp = cmarg / parseInt($('.lt-bar').width());
        var cvelocity = parseInt($('.lt-bar').width())/speed;
        var cdelay = parseInt($('.toggle-lt-bar').outerWidth(true))/cvelocity;
        var self =this;
        var marg = '';

        if($(this).hasClass('fix-position')) {
            marg = parseInt($(self).css('marginLeft')) - cmarg;
            $(this).animate({
                'margin-left': marg,
            }, ctemp * speed, 'linear', function(){
                $(self).removeAttr('style');
                $(self).removeClass('fix-position');
            });
            $('.lt-bar').animate({
                width: 'toggle'
            }, speed, 'linear');
        }
        else {
            $(this).addClass('fix-position');
            var scrollBarWidth = 14;
            marg = parseInt($(self).css('marginLeft')) + cmarg - scrollBarWidth;
            setTimeout(function(){
                $(self).animate({
                    'margin-left': marg,
                }, speed, 'linear');
            }, cdelay);
            $('.lt-bar').animate({
                width: 'toggle'
            }, speed, 'linear', ui.setCustomScrollBar);
        }
    }

});