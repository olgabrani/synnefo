Snf.BtnsSpanComponent = Ember.Component.extend({
	tagName: 'a',
	layoutName: 'components/btn-span',
	click: function() {
		this.sendAction("action");
	}
});
