/* {{btn-span class="class-for-a" content="message" spanCls="class-for-span"}} */

Snf.BtnSpanComponent = Ember.Component.extend({
	tagName: 'a',
	layoutName: 'components/btn-span',
	click: function() {
		this.sendAction("action");
	}
});
