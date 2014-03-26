Snf.FirewallView = Ember.View.extend({

    tagName: 'div',
    classNames: ['firewall'],
    templateName: 'firewall',
    didInsertElement: function () {
        this.$().mouseenter(function(e){
            $(this).css('z-index',2);
            $(this).find('.more').stop(true, true).slideDown(200);
        });
        this.$().mouseleave(function(e){
            $(this).css('z-index',1);
            $(this).find('.more').stop(true, true).slideUp(200);
        });
    },
});
