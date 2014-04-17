/* Add New Button */

// {{add-new type=controller.type icon=controller.iconCls action="openWizard"}}

Snf.AddNewComponent = Ember.Component.extend({

	layoutName: 'elem', // templateName is deprecated for components
	addNewBtn: true,
	selectable: false,
	iconCls: function() {
		var baseIcon = this.get('icon');
		return	baseIcon.replace('full', 'create-full');
	}.property(),
	tagName: 'li',
	status: 'add-new',
	classNameBindings: ['status'],
	attributeBindings: ['data-status'],

	'data-status': function() {
		return this.status;
	}.property(),

	text: function() {
		var msg = 'Create New ';
		var btnType = this.get('type');
		switch(btnType){
			case 'servers':
				return msg + 'Machine';
			case 'networks':
				return msg + 'Network';
			case 'volumes':
				return msg + 'Volume';
			case 'snapshots':
				return msg + 'Snapshot';
			case 'images':
				return '+ Upload New Image';
		}
	}.property(),

	click: function () {
		this.sendAction('action');
	},

});