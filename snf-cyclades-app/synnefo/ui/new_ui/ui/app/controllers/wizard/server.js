/* Controllers for Wizards */

Snf.ServersCreateController = Ember.Controller.extend({
	currentStep: 0,
	type: 'server',

	headers: function() {
		var type = this.get('type');
		return Snf.wizards.get(type).stepsHeaders;
	}.property(),
	
	menus: function() {
		var type = this.get('type');
		return Snf.wizards.get(type).stepsMenus;
	}.property(),
	
	totalSteps: function() {
		var type = this.get('type');
		return Snf.wizards.get(type).stepsLength;
	}.property(),

	btnLeftLabel: function(){
		return (this.get('currentStep') === 0)?'CANCEL':'PREVIOUS';
	}.property('currentStep'),

	btnRightLabel: function(){
		if(this.get('totalSteps')!==undefined)
			return (this.get('currentStep') === (this.get('totalSteps')-1))?'CREATE':'NEXT';
	}.property('currentStep'),

	onMove: false,
	directionMove: undefined,
	init: function() {
		this._super();
		this.set('currentStep', 0);
		this.set('onMove', false);
		this.set('directionMove', undefined);
	},
	showImageCategory: undefined,
	pickFlavor: undefined,
	selectedImageID: undefined,
	resetClose: function() {
		this.get('target').send('closeWizard');
		this.init();
	},
	actions: {
		moveNext: function() {
			if(!this.get('onMove')) {
				if(this.get('currentStep') === (this.get('totalSteps')-1))
					this.resetClose();
				else {
					this.set('directionMove', 'next');
					this.set('onMove', true);
				}
			}
		},
		moveBack: function() {
			if(!this.get('onMove')) {
				if(this.get('currentStep') === 0) {
					this.resetClose();
				}
				else {
					this.set('directionMove', 'prev');
					this.set('onMove', true);
				}
			}
		},
		menuAction: function(actionName, value) {
			if(actionName === 'showImageCategory') {
				console.log('showImageCategory');
				this.set('showImageCategory', value);
			}
			else if (actionName === 'pickFlavor') {
				console.log('pickFlavor');
				this.set('selectedMenuOption', value);
			}
		},
		newServerConf: function(dataType, dataValue) {
			console.log('[newServerConf] dataType: ' + dataType + 'selectedImageID ' + dataValue);
			if(dataType === 'image') this.set('selectedImageID', dataValue);
		}
	}
});


Snf.WizardServerStepController = Ember.Controller.extend({
	needs: ['serversCreate'],
	index: 0,
	indexToDisplay: function(){
		return this.get('index')+1;
	}.property(),
	isCurrent: function() {
		return this.get('index') === this.get('controllers.serversCreate').get('currentStep');
	}.property('controllers.serversCreate.currentStep'),
	isPast: function() {
		return this.get('index') < this.get('controllers.serversCreate').get('currentStep');
	}.property('controllers.serversCreate.currentStep'),
	isNext: function() {
		return this.get('index') === (this.get('controllers.serversCreate').get('currentStep')+1);
	}.property('controllers.serversCreate.currentStep'),

});

Snf.WizardServerStep1Controller = Snf.WizardServerStepController.extend({
	index: 0
});

Snf.WizardServerStep2Controller = Snf.WizardServerStepController.extend({
	index: 1
});

Snf.WizardServerStep3Controller = Snf.WizardServerStepController.extend({
	index: 2
});

Snf.WizardServerStep4Controller = Snf.WizardServerStepController.extend({
	index: 3
});