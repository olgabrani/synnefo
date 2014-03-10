Snf.BtnSimpleComponent = Ember.Component.extend({
	tagName: 'a',
	click: function() {
		this.sendAction("action", this.get('param'));
	},
	content: undefined // will be set if we want to print a message inside the span
});