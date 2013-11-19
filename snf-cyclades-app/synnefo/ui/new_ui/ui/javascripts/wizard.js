ui.wizard = {
	domID: undefined,
	currentStep: undefined,
	totalStep: undefined,
	btns: {
		start: undefined,
		close: undefined,
		next: undefined,
		previous: undefined,
	},
	areas : {
		top: {
			header: undefined,
			menu: undefined
		},
		middle: undefined,
		bottom: undefined
	},
	speed: 500,
	onMove: 0,

	getCurrentStep: function(){
		return ui.wizard.domID.find('.step').filter('.current').first();
	},

	getNextStep: function() {
        return ui.wizard.getCurrentStep().next();
    },

    getPreviousStep: function() {
        return ui.wizard.getCurrentStep().prev();
    },

    getScrollOffset: function() {
        return document.body.scrollTop;
    },

	submitData: function() {
		console.log('submit data dummy function');
	},



	move: function(stepToDisplay, pos) {
		ui.wizard.onMove = 1;
		ui.wizard.focusFun();
		ui.wizard.indicateStep();
		ui.wizard.setMovementTags();
		$('body').css('overflow','hidden');
		// the current visible pane
        var current = this.getCurrentStep();
        // Set next pane position on the right of the current one
        // Add current to the next pane, so that it will become
        // visible
        stepToDisplay.css({
            left: pos.toString() + '%'
        }).addClass("current");
        // identify the current scroll position. Use it to
        // set next pane top position. We assume all panes
        // are within the scroll context of the main window.
        stepToDisplay.css({
            top: this.getScrollOffset() + 'px'
        });
        ui.wizard.domID.find('.step').animate({
            marginLeft: (-pos).toString() + '%'
        }, {
				complete: _.bind(function() {
                // assuming all the following take place
                // instantaneously within a single browser 
                // render cycle, no flickering should occur.
                current.removeClass("current");
			    window.scroll(0, 0);
                stepToDisplay.css({
                    left: '0',
                    top: '0'
                });
                $('.step').css({
                    marginLeft: '0'
                });
                $('body').css('overflow','visible');
                if (ui.wizard.currentStep == 3 ){
					$('.vm-name input').first().focus();
                }
                $('.actions-bar').show();
                ui.wizard.onMove = 0;
            }, this)
        });

	},

	data_next_array: ['el0', 'el2', 'el4', 'el7'],

	focusFun: function() {
		var step = ui.wizard.currentStep;
		var nextBtn = ui.wizard.btns.next;

		$('.firstfocus-' + step + '').first().focus();
		nextBtn.removeAttr('data-next');
		nextBtn.attr('data-next', ui.wizard.data_next_array[step]);
	},

	goNext: function() {
		var next = ui.wizard.getNextStep();
		if (ui.wizard.onMove == 0) {
			ui.wizard.currentStep++;
			ui.wizard.move(next, 100);
		}
	},

	goPrev: function() {
		var prev = ui.wizard.getPreviousStep();
		if (ui.wizard.onMove == 0) {
			ui.wizard.currentStep--;
			ui.wizard.move(prev, -100);
		}
	},

	indicateStep: function() {
		var step =ui.wizard.currentStep;
		var menus = ui.wizard.areas.top.menu;
		var wizardHeader = ui.wizard.areas.top.header;
		
		menus.find('.sub-menu').hide();
		menus.find('.sub-menu[data-step='+step+']').fadeIn();
		wizardHeader.children().removeClass('current');
		wizardHeader.find('li:not(".current")').show().css("display", "inline");
		wizardHeader.find('li:nth-child(' + step + ')').addClass('current');
		wizardHeader.find('li.current').hide();
		wizardHeader.find('li.current').fadeIn('slow').css("display", "inline");
		wizardHeader.find('.current').prevAll('li').hide();
	},

	// changes the text of next and previous buttons
	setMovementTags: function() {
		var step =ui.wizard.currentStep;
		var totalStep = ui.wizard.totalStep;
		var prevBtnLabel = ui.wizard.btns.previous.find('span');
		var nextBtnLabel = ui.wizard.btns.next.find('span');
		
		if(totalStep == 1) {
			prevBtnLabel.html('CANCEL');
			nextBtnLabel.html('CREATE');
		}
		else {
			if (step == 1) {
				prevBtnLabel.html('CANCEL');
				nextBtnLabel.html('NEXT');
			} else if (step == totalStep) {
				prevBtnLabel.html('PREVIOUS');
				nextBtnLabel.html('CREATE');
			} else if (ui.wizard.vm.hideNext()){
				// ***
				ui.wizard.btns.next.hide();
			} else {
				prevBtnLabel.html('PREVIOUS');
				nextBtnLabel.html('NEXT');
			}
		}
	},
	close: function() {
		console.log('1');
		$('body').removeClass('with-overlay');
		$('.overlay-area-custom').fadeOut(400, function() {
			$('.overlay-div').hide();
			ui.wizard.reset();
		});
	},

	reset: function() {
		var wizard = ui.wizard.domID;
		var wizardType = wizard.attr('id');

		if(wizardType == 'vm-wizard') {
			wizard.find('.networks-area .more').show();
			wizard.find('.details').hide();
			wizard.find('.os li').hide();
			wizard.find('.advanced-conf-options').hide();
			wizard.find('.snf-color-picker').hide();

		}
		else if(wizardType == 'network-wizard') {
			wizard.find('li .manual .input').hide();
	        wizard.find('ul.subnet_options').parent('li').show();
		}

		ui.wizard.currentStep = 1;
		wizard.find('.step').removeAttr('style');
		wizard.find('.bottom').show();
		wizard.find('input').val('');
		ui.wizard.indicateStep();
		ui.wizard.setMovementTags();
		ui.wizard.preselectElements(wizardType);
	},

	preselectElements: function(wizardType) {
		var wizard = ui.wizard.domID;

		wizard.find('.current').not('.preselected').removeClass('current');
		wizard.find('.preselected').not('.current').addClass('current');
		wizard.find('.custom.dropdown.medium a:first').addClass('current'); // to fix
		wizard.find('.snf-radio-checked').not('.prechecked').toggleClass('snf-radio-checked snf-radio-unchecked');
		wizard.find('.snf-radio-unchecked.prechecked').toggleClass('snf-radio-checked snf-radio-unchecked');
		wizard.find('.snf-checkbox-checked').not('.prechecked').toggleClass('snf-checkbox-checked snf-checkbox-unchecked');
		wizard.find('.snf-checkbox-unchecked.prechecked').toggleClass('snf-checkbox-checked snf-checkbox-unchecked');
		wizard.find('.snf-arrow-up.preselected').toggleClass('snf-arrow-up snf-arrow-down');
		if(wizardType == 'vm-wizard') {
			var preselectedImgCategory = wizard.find('.top .sub-menu[data-step=1] .preselected').data('img-type');
			wizard.find('.os .'+preselectedImgCategory).show();
		}
	},

	vm: {
		hideNext: function() {
			if(ui.wizard.currentStep == 2 && $('.flavor a.disabled').hasClass('small')) {
				return true;
			}
			else {
				return false;
			}
		},
		getSize: function(elem) {
			if ($(elem).hasClass('small')) {
				return 'small';
			} else if ($(elem).hasClass('medium')) {
				return 'medium';
			} else if ($(elem).hasClass('large')) {
				return 'large';
			}
		},


		pickResources: function(resource) {
			var wizard = ui.wizard.domID;
			wizard.find('.flavor .with-flavor a:not(.' + resource + ')').removeClass('current');
			wizard.find('.flavor .with-flavor a.' + resource + '').addClass('current');
		},

		showImageCategory: function(imagesCategory) {
			var wizard = ui.wizard.domID;
			var selectedImages = $(imagesCategory).data('img-type');
			wizard.find(imagesCategory).closest('.sub-menu').find('.current').removeClass('current');
			wizard.find(imagesCategory).addClass('current');
			wizard.find('.os li').hide();
			wizard.find('.os .details').hide();
			wizard.find('.os').find('.'+selectedImages).fadeIn();
		}
	},
	network : { }
}

$(document).ready(function() {

	if($('.wizard').length>0) {
		var wizardType = $('.wizard').attr('id');
		var wizard = ui.wizard.domID =$('#'+wizardType);
		ui.wizard.totalStep = ui.wizard.domID.find('.step').length;
		ui.wizard.currentStep = 1;
		var topHeaderArea = ui.wizard.areas.top.header = wizard.find('.top .nums');
		var topMenuArea = ui.wizard.areas.top.menu = wizard.find('.top .menus');
		var middleArea = ui.wizard.areas.middle = wizard.find('.middle');
		var bottomArea = ui.wizard.areas.bottom = wizard.find('.bottom');

		var prevBtn = ui.wizard.btns.previous = ui.wizard.areas.bottom.find('.nav.prev');
		var nextBtn = ui.wizard.btns.next = ui.wizard.areas.bottom.find('.nav.next');
		var closeBtn = ui.wizard.btns.close = wizard.find('.close');

		// various functions for creation wizards
		closeBtn.click(function(e) {
			e.preventDefault();
			ui.wizard.close();
		});

		nextBtn.click(function(e) {
			e.preventDefault();
			if (ui.wizard.currentStep == ui.wizard.totalStep ){
				ui.wizard.submitData();
				ui.wizard.close();
				return false;
			}
			ui.wizard.goNext();

		});

		prevBtn.click(function(e) {
			e.preventDefault();
			if (ui.wizard.currentStep == 1 ){
				ui.wizard.close();
				return false;
			}
			ui.wizard.goPrev();
		});


		$(document).keydown(function(e) {
			var exp1 = $('.vm-name input').is(':focus') && $('.vm-name input').val().length>0;
			var exp2 = $('.form-item input').is(':focus') && $('.form-item input').val().length>0;
			// right arrow keyCode == 39
			if (wizard.is(':visible').length != 0) {
				if (e.keyCode == 39 && ui.wizard.currentStep != (ui.wizard.totalStep) &&(!exp1) && (!exp2)) {
					ui.wizard.goNext();
					return false;
				}
				// left arrow keyCode == 37
				else if (e.keyCode == 37 && ui.wizard.currentStep != 1 &&(!exp1) &&(!exp2)) {
					ui.wizard.goPrev();
					return false;
				}
				// ESC
				else if (e.keyCode == 27 && ui.wizard.currentStep == 1) {
					ui.wizard.close();
				}
			}
		});

		// focus and tabs functionality
		 wizard.find('a').keyup(function(e) {
			var self = this;
			if (e.keyCode == 9 || e.which == 9) {
				if (e.shiftKey) {
				} else {
					//Focus next input
					if ($(self).attr('data-next')) {
						$(self).focusout(function(e) {
							var classname = $(self).data('next');
							wizard.find('.' + classname + '').first().focus();
						});
					}
				}
			}
		});

		// navigation and numbers functions
		wizard.find('.nav.previous').focus(function(e) {
			$(this).addClass('active');
		});

		wizard.find('.nav.previous').focusout(function(e) {
			$(this).removeClass('active');

		});

		if(wizardType == 'vm-wizard') {
			
			// step-1: pick OS
			wizard.find('.os > li').keydown(function(e) {
			  if(e.keyCode == 13) {
			    $(this).trigger("click", true);
			    e.preventDefault();
			  }
			});
			wizard.find('.os .btn-col a').keydown(function(e) {
			  if(e.keyCode == 13) {
			    $(this).trigger("click", true);
			    e.preventDefault();
			    e.stopPropagation();
			  }
			});

			wizard.find('.os > li').click(function(e, wasEnterKey) {
				e.preventDefault();
				if ( $(this).hasClass('current') && wasEnterKey) {
					ui.wizard.goNext();
				}
				wizard.find('.os >li').removeClass('current');
				$(this).addClass('current');
			});

			wizard.find('.os .btn-col a').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).toggleClass('current');
				var self = this;
				$(this).parents('li').find('.details').stop().slideToggle();
			});

			wizard.find('.top .sub-menu[data-step=1] a').click(function(e) {
				e.preventDefault();
				ui.wizard.vm.showImageCategory(this);
			});

			wizard.find('.os .name-col').focus(function(e) {
				$(this).parents('li').addClass('hover');
			});

			wizard.find('.os .name-col').focusout(function(e) {
				$(this).parents('li').removeClass('hover');
			});

			// step-2: pick flavor
			var disabledElems = wizard.find('.flavor a.disabled');
			var disabledElemsNum = disabledElems.length;
			var size;
			if(disabledElemsNum>0) {
				for(i=0; i<disabledElemsNum; i++) {
					size = ui.wizard.vm.getSize(disabledElems.get(i));
					wizard.find('.sub-menu[data-step=2] a[data-size=' + size + ']').removeClass('current').addClass('disabled');
					wizard.find('.flavor .'+size).removeClass('current preselected');
					if(size == 'small') {
						wizard.find('.flavor .vm-storage-selection a').removeClass('current preselected');

					}
				}
			}
			wizard.find('.sub-menu a[data-size]:not(.disabled)').click(function(e) {
				e.preventDefault();
				$(this).parents('.sub-menu').find('a').removeClass('current');
				$(this).addClass('current');
				ui.wizard.vm.pickResources($(this).data('size'));
			});

			wizard.find('.flavor .options:not(.vm-storage-selection) a:not(.disabled)').click(function(e) {
				e.preventDefault();
				wizard.find('.sub-menu a[data-size]').removeClass('current');
				$(this).parents('.options').find('a').removeClass('current');
				$(this).addClass('current');
				size = ui.wizard.vm.getSize(this);
				var count = wizard.find('.options.with-flavor .' + size + '.current').length;
				if (count == 3) {
					wizard.find('.sub-menu[data-step=2] a[data-size=' + size + ']').addClass('current');
				}
			});

			wizard.find('.flavor .options.vm-storage-selection a').click(function(e) {
				e.preventDefault();
				$(this).parents('.options').find('a').removeClass('current');
				$(this).addClass('current');
			});

			wizard.find('.flavor .options a').hover(
				function() {
					var paragraph = $(this).parents('.options-bar').siblings('.title').find('p');
					var text = $(this).data('help');
					paragraph.html(text);
					paragraph.css('visibility', 'visible');
				}, function() {
					var paragraph = $(this).parents('.options-bar').siblings('.title').find('p');
					paragraph.css('visibility', 'hidden');
				}
			);

			wizard.find('.sub-menu[data-step=2] li:last').find('a').focusout(function(e) {
				$('.step-2').find('.dropdown a:first').focus();
			});

			// step-3: custom options
			wizard.find('.expand-arrow').click(function(e) {
				e.preventDefault();
				ui.expandDownArea(this, wizard.find('.advanced-conf-options'));
			});


			// reaction li.click *
			wizard.find('.advanced-conf-options .with-checkbox').click(function(e) {
				e.preventDefault();
				$(this).find('.check').trigger('click');
			});

			// reaction a.click *
			$('.with-checkbox .check').click(function(e) {
				e.stopPropagation();
				console.log('hi');
				var self = this;
				if ($(this).closest('.with-checkbox').hasClass('has-more')) {
					$(this).parent().next('.more').stop().slideToggle(400, function() {
						if ($(self).parent().next('.more:visible').length != 0) {
							$(self).find('span').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
						} else {
							$(self).find('span').removeClass('snf-checkbox-checked').addClass('snf-checkbox-unchecked');
						}
					});
				}
			});
		}
		else if (wizardType == 'network-wizard') {

			wizard.find('.network_options .check').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				this.blur();
				$(this).parents('li').siblings().find('ul.subnet_options').parent('li').toggle();
			});

			wizard.find('.network_options .dhcp_option').click(function(e){
				e.preventDefault();
				$(this).find('.check').trigger('click');
			});

			wizard.find('.network_options .radio_btn').click(function(e){
		        e.preventDefault();
		        e.stopPropagation();
		        this.blur();
		        var state = $(this).find('span');
		        if(state.hasClass('snf-radio-checked')) {
		            if($(this).hasClass('manual')) {
		                $(this).siblings('.input').show();
		            }
		            else {
		                $(this).closest('li').siblings('.manual').find('.input').hide();
		            }
		        }
		    });

			wizard.find('.subnet_options>li').click(function(e) {
				$(this).find('.radio_btn').trigger('click');
			})
		}
	}

})