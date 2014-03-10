Snf.RevealModalComponent = Ember.Component.extend({
    classNames: ['inner-modal'],
    actions: {
        ok: function () {
            this.sendAction("ok", this.get('param'));
            $(this).foundation('reveal', 'close');
        },
        close: function () {
            $(this).foundation('reveal', 'close');       
        },
    },
});
