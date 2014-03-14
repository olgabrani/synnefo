/* Controllers for Wizards */

Snf.VmsCreateController = Ember.Controller.extend({
	currentStep: 0,
	type: 'vm',

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
		newVmConf: function(dataType, dataValue) {
			console.log('[newVmConf] dataType: ' + dataType + 'selectedImageID ' + dataValue);
			if(dataType === 'image') this.set('selectedImageID', dataValue);
		}
	}
});


Snf.WizardVmStepController = Ember.Controller.extend({
	needs: ['vmsCreate'],
	index: 0,
	indexToDisplay: function(){
		return this.get('index')+1;
	}.property(),
	isCurrent: function() {
		return this.get('index') === this.get('controllers.vmsCreate').get('currentStep');
	}.property('controllers.vmsCreate.currentStep'),
	isPast: function() {
		return this.get('index') < this.get('controllers.vmsCreate').get('currentStep');
	}.property('controllers.vmsCreate.currentStep'),
	isNext: function() {
		return this.get('index') === (this.get('controllers.vmsCreate').get('currentStep')+1);
	}.property('controllers.vmsCreate.currentStep'),

});

Snf.WizardVmStep1Controller = Snf.WizardVmStepController.extend({
	index: 0
});

Snf.WizardVmStep2Controller = Snf.WizardVmStepController.extend({
	index: 1
});

Snf.WizardVmStep3Controller = Snf.WizardVmStepController.extend({
	index: 2
});

Snf.WizardVmStep4Controller = Snf.WizardVmStepController.extend({
	index: 3
});