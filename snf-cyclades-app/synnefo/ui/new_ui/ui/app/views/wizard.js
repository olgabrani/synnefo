/* Wizard View */

Snf.WizardVmView = Ember.View.extend({
	tagName: 'section',
	classNames: ['overlay-area-custom'],
	templateName: 'wizard/wizard-vm',
	didInsertElement: function() {
        $('body').addClass('with-overlay');
		this.$().fadeIn(100);
        this.$().find('.wizard').fadeIn('slow');
	},
	willDestroy: function() {
		$('body').removeClass('with-overlay');
	},
	counter: function() {
		return Snf.wizards.get('vm').get('stepsLength');
	}.property(),
	init: function() {
		this._super();
	},
	moveSteps: function() {
		if(this.get('isVisible')) {
			var onMove = this.get('controller').get('onMove');
			if(onMove) {
				var el = this.$();
				var self = this;

				var elCurrent = el.find('.step.current');
				var totalSteps = this.get('controller').get('totalSteps');

				var elSteps = el.find('.step');
				var elToDisplay;

				var pastCurrentStep = this.get('controller').get('currentStep');
				var newCurrentStep;

				var direction = this.get('controller').get('directionMove');
				var pos = (direction==='next')?(100):(-100);
				if(direction === 'next')
					newCurrentStep = ++pastCurrentStep;
				else if(direction === 'prev')
					newCurrentStep = --pastCurrentStep;

				if(direction === 'next') {
					elToDisplay = el.find('.step.next');
				}
				else {
					elToDisplay = el.find('.step.prev');
				}

				$('body').css('overflow', 'hidden');

				elToDisplay.css({
					left: pos.toString()+'%'
				}).addClass('current');

				elToDisplay.css({
					top: document.body.scrollTop + 'px'
				});

				elSteps.animate({
					marginLeft: (-pos).toString() + '%'
				},{
					complete: _.bind(function() {
						elCurrent.removeClass('current');
						window.scroll(0, 0);
						elToDisplay.css({
							left: '0',
							top: '0'
						});
						elSteps.css({
							marginLeft: '0'
						});
						$('body').css('overflow', 'visible');
						this.get('controller').set('currentStep',newCurrentStep);
						this.get('controller').set('onMove', false);
					}, this)
				});
			}
		}
	}.observes('controller.onMove'),
});


/* Steps */

Snf.WizardStepView = Ember.View.extend({
	index: 0,
	classNameBindings: ['isCurrent:current::', 'isNext:next::', 'isPast:past::', 'isFirst:preselected::', 'stepWithNum'],
	classNames: ['step'],
	templateName: function() {
		var stepNum = this.get('index')+1;
		return 'wizard/step-'+stepNum;
	}.property('this.index'),
	stepWithNum: function() {
		var stepNum = this.get('index')+1;
		return 'step-'+stepNum;
	}.property(),
	isCurrent: function() {
		return this.get('index') === this.get('controller').get('controllers.vmsCreate').get('currentStep');
	}.property('controller.controllers.vmsCreate.currentStep'),
	isPast: function() {
		return this.get('index') < this.get('controller').get('controllers.vmsCreate').get('currentStep');
	}.property('controller.controllers.vmsCreate.currentStep'),
	isNext: function() {
		return this.get('index') === (this.get('controller').get('controllers.vmsCreate').get('currentStep')+1);
	}.property('controller.controllers.vmsCreate.currentStep'),
	isFirst: function() {
		return this.get('index') === 0;
	}.property('controller.controllers.vmsCreate.currentStep'),
});

Snf.WizardVmStep1View = Snf.WizardStepView.extend({
	index: 0,
});

Snf.WizardVmStep2View = Snf.WizardStepView.extend({
	index: 1
});

Snf.WizardVmStep3View = Snf.WizardStepView.extend({
	index: 2,
});

Snf.WizardVmStep4View = Snf.WizardStepView.extend({
	index: 3
});


/* Views in step-1 */

Snf.WizardImageView = Ember.View.extend({
	tagName: 'li',
	templateName: 'wizard/image-view',
	classNames: ['image'],
	classNameBindings: ['type', 'isVisibleCategory:current-category::', 'isCurrent:current::'],
	imageData: function(){
		// is there another way to extract all the data?
		return Ember.Object.create(this.get('image').get('data'));
	}.property('this.image'), // ??
	type: function() {
		var type;
		var imageOwnerID = this.get('imageData').get('owner');
		var isPublic = this.get('imageData').get('is_public');
		var currentUserID = this.get('controller').get('account');
		if(isPublic) {
			if(currentUserID === imageOwnerID)
				type = 'my-image';
			else
				Snf.SystemUUIDs.forEach(function(item) {
						if(item === imageOwnerID) type = 'system-image';
						else type = 'public-image';
				});
		}
		else {
			if(currentUserID === imageOwnerID)
				type = 'my-image';
			else
				type = 'shared-with-me';
		}
		return type;
	}.property('imageData'), // ??

	ownerEmail: function(){
		var ownerUUId = this.get('imageData').get('owner');
		var ownerEmail = Snf.AccountsUUIDs.get(ownerUUId);
		if(this.get('type') !== 'system')
			return 'system';
		else
			return ownerEmail;
	}.property('this.image'), //??
	didInsertElement: function() {
		this.toggleDetailsArea();
		// this.selectImage();
	},
	toggleDetailsArea: function() {
		var btnDetails = this.$().find('.btn-col a');
		btnDetails.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			btnDetails.toggleClass('current');
			btnDetails.parents('li').find('.details').stop().slideToggle();
		});
	},
	isVisibleCategory: function() {
		return (this.get('type') === this.get('controller').get('controllers.vmsCreate').get('showImageCategory'));
	}.property('controller.controllers.vmsCreate.showImageCategory'),
	click: function(e) {
			e.preventDefault();

			this.set('isCurrent',!this.get('isCurrent'));
			console.log('selected image ', this.get('imageData').get('id'));
			this.get('controller').send('newVmConf', 'image', this.get('imageData').get('id'));
		}
 });


/* Headers */

Snf.WizardHeaderView = Ember.View.extend({
	tagName: 'li',
	templateName: 'wizard/header',
	classNameBindings: ['isCurrent:current::', 'isPast:past::', 'isFirst:preselected::','isMoving:hide-el::'],
	index: function() {
		// not good approach for big collections/arrays
		var headers = this.get('controller').get('headers');
		var header = this.get('context');
		return headers.indexOf(header);
	}.property(),
	indexToDisplay: function() {
		return this.get('index')+1;
	}.property('this.index'),
	isCurrent: function() {
		return this.get('index') === this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
	isFirst: function() {
		return this.get('index') === 0;
	}.property('controller.currentStep'),
	isMoving: function() {
		// the currentStep changes after the movement of the steps is over
		if(this.get('isCurrent')) {
			return this.get('controller').get('onMove');
		}
		else
			return false;
	}.property('controller.onMove'),
	isPast: function() {
		return this.get('index') < this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
});



/* Menus */

Snf.WizardMenuView = Ember.View.extend({
	tagName: 'nav',
	classNames: ['menu'],
	classNameBindings: ['isCurrent:current::', 'isMoving:hide-el::'],
	templateName: 'wizard/menu',
	index: function() {
		// not good approach for big collections/arrays
		var menus = this.get('controller').get('menus');
		var menu = this.get('context');
		return menus.indexOf(menu);
	}.property(),
	isCurrent: function() {
		return this.get('index') === this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
	isMoving: function() {
		// the currentStep changes after the movement of the steps is over
		if(this.get('isCurrent')) {
			return this.get('controller').get('onMove');
		}
		else
			return false;
	}.property('controller.onMove')
});

// ['System', 'My images', 'Shared with me', 'Public']
// ['Small', 'Medium', 'large']
Snf.WizardMenuOptionView = Ember.View.extend({
	tagName: 'li',
	classNameBindings: ['isCurrent:current::', 'isEnabled::disabled'],
	templateName: 'wizard/menu-option',
	menuAction: function() {
		return this.get('parentView').get('context.actionName');
	}.property(),
	actionValue: function() {
		var description = this.get('context').toString();
		console.log('description ', description);
		switch (description) {
			case 'System': return 'system-image';
			case 'My images': return 'my-image';
			case 'Shared with me': return 'shared-with-me';
			case 'Public': return 'public-image';
		}
	}.property(),
	isCurrent: function() {
		console.log("this.get('actionValue') ", this.get('actionValue'));
		console.log("this.get('controller').get('showImageCategory') ", this.get('controller').get('showImageCategory'));
		return (this.get('actionValue') === this.get('controller').get('showImageCategory'));
	}.property('controller.showImageCategory'),
	isEnabled: true
});

/* Navigation Arrows */

// The only buttons that are views are the buttons that move the wizard
// The reason is that they shouldn't be isolated from the surrounding
// (Their labels changes depanding the current step)
Snf.WizardBtnBackView = Ember.View.extend({
	classNames: ['nav', 'prev'],
	tagName: 'a',
	templateName: 'components/btn-span',
	content: function(){
		return this.get('controller').get('btnLeftLabel');
	}.property('controller.btnLeftLabel'),
	click: function() {
		this.get('controller').send('moveBack');
	}
});

Snf.WizardBtnNextView = Ember.View.extend({
	classNames: ['nav', 'next'],
	tagName: 'a',
	templateName: 'components/btn-span',
	content: function(){
		return this.get('controller').get('btnRightLabel');
	}.property('controller.btnRightLabel'),
	click: function() {
		this.get('controller').send('moveNext');
	}
});