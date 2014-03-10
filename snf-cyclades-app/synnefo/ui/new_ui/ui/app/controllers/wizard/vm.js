/* Controllers for Wizards */

Snf.VmsCreateController = Ember.Controller.extend({
	currentStep: 1,
	type: 'vm',
	images: function() {}.property(),
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
		return (this.get('currentStep') === 1)?'CANCEL':'PREVIOUS';
	}.property('currentStep'),

	btnRightLabel: function(){
		if(this.get('totalSteps')!==undefined)
			return (this.get('currentStep') === this.get('totalSteps'))?'CREATE':'NEXT';
	}.property('currentStep'),

	onMove: false,
	directionMove: undefined,
	init: function() {
		this._super();
		this.set('currentStep', 1);
		this.set('onMove', false);
		this.set('directionMove', undefined);
		console.log('wizard controller init');
	},
	actions: {
		moveNext: function() {
			console.log('[CreateController moveNext] onMove: ', this.get('onMove'));
			if(!this.get('onMove')) {
				if(this.get('currentStep') === this.get('totalSteps'))
					this.resetClose();
				else {
					this.set('directionMove', 'next');
					this.set('onMove', true);
				}
			}
		},
		moveBack: function() {
			console.log('[CreateController moveBack]');
			if(!this.get('onMove')) {
				if(this.get('currentStep') === 1) {
					this.resetClose();
				}
				else {
					this.set('directionMove', 'prev');
					this.set('onMove', true);
				}
			}
		},
	},
	resetClose: function() {
		console.log('[CreateController resetClose]');
		this.get('target').send('closeWizard');
		this.init();
	},
});


Snf.WizardVmStepController = Ember.Controller.extend({
	needs: ['vmsCreate'],
	index: undefined,
	indexToDisplay: function(){
		return this.get('index')+1;
	}.property(),

});

Snf.WizardVmStep1Controller = Snf.WizardVmStepController.extend({
	index: 0
});

Snf.WizardVmStep2Controller = Snf.WizardVmStepController.extend({
	index: 1
});