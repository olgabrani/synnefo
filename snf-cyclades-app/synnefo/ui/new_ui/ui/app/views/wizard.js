Ember.View.reopen({
    didInsertElement: function() {
       this._super();
       this.set('elIsInserted', true);
    },

    willDestroyElement: function() {
       this._super();
       this.set('elIsInserted', false);
    }
});


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


//  todo: Replace collections
//  todo: consistent numbering

Snf.WizardView = Ember.View.extend({
	tagName: 'section',
	classNames: ['overlay-area-custom'],
	templateName: 'wizard/vm-wizard',
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
		console.log('init wizard view');
	}
});

Snf.CollectionView = Ember.CollectionView.extend({
	counter: 0
});


// to use (extend) Snf.CollectionItemView must a counter to be set (initialized) in the parent view
//  so when we want to use Snf.CollectionItemView, the collection that includes has extend Snf.CollectionView
Snf.CollectionItemView = Ember.View.extend({
// classNameBindings: ['isCurrent:current::', 'isFirst:preselected', 'isPast:past::'],
	index: undefined, // index>=1
	// isCurrent: false,
	isFirst: false,
	// isPrev: false,
	init: function() {
		this._super();
		var prevIndex = this.get('parentView').get('counter');
		var index = ++prevIndex;
		this.get('parentView').set('counter', index);
		this.set('index', index);
		if(index === 1) {
			this.set('isFirst', true);
		}
	},
	isCurrent: function() {
		return this.index === this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
	isPast: function() {
		return this.index < this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
	isNext: function() {
		return this.index === (this.get('controller').get('currentStep')+1);
	}.property('controller.currentStep'),
	isPrev: function() {
			return this.index === (this.get('controller').get('currentStep')-1);
	}.property('controller.currentStep')
});


Snf.WizardStepView = Ember.View.extend({
	isCurrent: function() {
		return this.index === this.get('controller').get('parentController').get('currentStep');
	}.property('controller.parentController.currentStep'),
	isPast: function() {
		return this.index < this.get('controller').get('parentController').get('currentStep');
	}.property('controllers.parentController.currentStep'),
	isNext: function() {
		return this.index === (this.get('controller').get('parentController').get('currentStep')+1);
	}.property('controller.parentController.currentStep'),
	isPrev: function() {
			return this.index === (this.get('controller').get('parentController').get('currentStep')-1);
	}.property('controller.parentController.currentStep'),
	classNames: ['step'],
	/*function(){
		var stepNum = this.get('stepClass');
		return ['step', stepNum];
	}.property()*/
	classNameBindings: ['isFirst:current::', 'isFirst:preselected', 'isNext:next::', 'isPrev:prev::'],
	templateName: function() {
		console.log('wizard/step-'+this.get('index'));
		return 'wizard/step-'+this.get('index');
	}.property(),
	stepClass: function() {
		return 'step-'+this.get('controller').get('indexToDisplay');
	}.property(),
	init: function() {
		this._super();
	}
});

Snf.WizardVmStep1View = Snf.WizardStepView.extend({
	index: 1
});

Snf.WizardVmStep2View = Snf.WizardStepView.extend({
	index: 2
});





Snf.WizardStepsView = Snf.CollectionView.extend({
	classNames: 'middle',
	content: function() {
		return [1,2,3,4];
	}.property(),
	itemViewClass: Snf.WizardStepView,
	move: function() {
			console.log('move');
		if(this.get('elIsInserted')) {
			var onMove = this.get('controller').get('onMove');
			if(onMove) {
				var el = this.$();
				var self = this;
				// I find the current step from the view's property
				// not from dom's class to be sure that there will be no sychronisation problem?
				var direction = this.get('controller').get('directionMove');
				var viewCurrent = this._childViews.findBy('isCurrent', true);
				var totalSteps = this.get('controller').get('totalSteps');

				if(!(direction === 'next' && viewCurrent.get('index') === totalSteps) && !(direction === 'prev' && viewCurrent.get('index') === 1)) {
					var elCurrent = el.find('.current');
					var elSteps = el.find('.step');
					var pos = (direction==='next')?(100):(-100);
					var viewToDisplay;
					var elToDisplay;

					if(direction === 'next') {
						viewToDisplay = this._childViews.findBy('isNext', true);
						elToDisplay = el.find('.next');
					}
					else {
						viewToDisplay = this._childViews.findBy('isPrev', true);
						elToDisplay = el.find('.prev');
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

							viewCurrent.set('isCurrent', false);
							viewToDisplay.set('isCurrent', true);
							self.get('controller').set('currentStep',viewToDisplay.get('index'));
							this.get('controller').set('onMove', false);
						}, this)
					});
				}
			}
		}
	}.observes('controller.onMove'),
/*	init: function() {
		console.log(this.get('controller').get('onMove'));
	}
	didInsertElement: function() {
		this._super();
		$('body').addClass('with-overlay');
	},
	willDestroyElement: function() {
		this._super();
		$('body').removeClass('with-overlay');
	}*/
});




/* Headers */

Snf.WizardHeadersView = Snf.CollectionView.extend({
	tagName: 'ul',
	classNames:['nums'],
	content: function() {
		return Snf.wizards.get('vm').get('stepsHeaders');
	}.property(),
	itemViewClass: Snf.CollectionItemView.extend({
		classNameBindings: ['isCurrent:current::', 'isFirst:preselected', 'isPast:past::'],
		templateName: 'wizard/step-header',
	})
});

/* Menus */

Snf.WizardMenuView = Snf.CollectionView.extend({
	tagName: 'ul',
	content: function() {
		var stepIndex = this.get('parentView').get('index');
		return Snf.wizards.get('vm').get('stepsMenus')[--stepIndex].options;
	}.property(),
	removeOtherCurrent: function(clickedView) {
		var childViews = this._childViews;

		for(var i=0; i<childViews.length; i++)
			if(childViews[i] !== clickedView)
				childViews[i].set('isCurrent', false);
	},
	itemViewClass: Snf.CollectionItemView.extend({
		templateName: 'wizard/menu-option',
		classNameBindings:['isCurrent:current::', 'isFirst:preselected'],
		isCurrent: function(){
			if(this.get('isFirst')) return true;
		}.property(),
		move: function() {
			if(this.get('controller').get('onMove')) {
			this.get('parentView').removeOtherCurrent(this);
			this.set('isCurrent', true);
			}
		}.observes('controller.onMove')
	})
});

Snf.WizardMenusView = Snf.CollectionView.extend({
	classNames: ['row', 'menus'],
	content: function(){
		return Snf.wizards.get('vm').get('stepsMenus');		
	}.property(),
	itemViewClass: Snf.CollectionItemView.extend({
		tagName: 'nav',
		classNames: ['sub-menu'],
		classNameBindings: ['isCurrent:current::', 'isFirst:preselected', 'isPast:past::'],
		templateName: 'wizard/menu'
	})

});


