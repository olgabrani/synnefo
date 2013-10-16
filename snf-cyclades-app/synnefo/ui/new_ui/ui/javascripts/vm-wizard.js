ui.wizard = {
	current_step: undefined,
	total_step: $('.wizard-content .step').length,
	current_position: undefined,
	relocation: undefined,
	btns: {
		start: undefined,
		close: undefined,
		next: undefined,
		previous: undefined,
		expand_down: undefined
	},
	speed: 500,
	semaphore:1,
	vm: {
		getSize: function(elem) {
			if ($(elem).hasClass('small')) {
				return 'small';
			} else if ($(elem).hasClass('medium')) {
				return 'medium';
			} else if ($(elem).hasClass('large')) {
				return 'large';
			}
		}
	},
	network: {},

	getCurrent: function(){
		return $('.step').filter('.current').first();
	},

	getNextStep: function() {
        return ui.wizard.getCurrent().next();
    },

    getPreviousStep: function() {
        return ui.wizard.getCurrent().prev();
    },

    getScrollOffset: function() {
        return document.body.scrollTop;
    },

	submitData: function() {
		console.log('submit data dummy function');
	},

	data_next_array: ['el0', 'el2', 'el4', 'el7'],

	focusFun: function() {
		$('.firstfocus-' + ui.wizard.current_step + '').first().focus();
		$('.nav.next').removeAttr('data-next');
		$('.nav.next').attr('data-next', ui.wizard.data_next_array[ui.wizard.current_step]);
	},

	move: function(step, pos) {
		ui.wizard.semaphore = 0;
		ui.wizard.focusFun();
		ui.wizard.indicateStep(ui.wizard.current_step);
		ui.wizard.setMovementTags(ui.wizard.current_step, ui.wizard.btns.previous, ui.wizard.btns.next);
		$('body').css('overflow','hidden');
		// the current visible pane
        var current = this.getCurrent();
        // Set next pane position on the right of the current one
        // Add current to the next pane, so that it will become
        // visible
        step.css({
            left: pos.toString() + '%'
        }).addClass("current");
        // identify the current scroll position. Use it to
        // set next pane top position. We assume all panes
        // are within the scroll context of the main window.
        step.css({
            top: this.getScrollOffset() + 'px'
        });
        $('.step').stop(false,true).animate({
            marginLeft: (-pos).toString() + '%'
        }, {
				complete: _.bind(function() {
                // assuming all the following take place
                // instantaneously within a single browser 
                // render cycle, no flickering should occur.
                current.removeClass("current");
			    window.scroll(0, 0);
                step.css({
                    left: '0',
                    top: '0'
                });
                $('.step').css({
                    marginLeft: '0'
                });
                $('body').css('overflow','visible');
                if (ui.wizard.current_step == 3 ){
					$('.vm-name input').first().focus();
                }
                ui.wizard.semaphore =1;
            }, this)
        });

	},

	goNext: function() {
		var next = ui.wizard.getNextStep();
		if (ui.wizard.semaphore == 1) {
			ui.wizard.current_step++;
			ui.wizard.move(next, 100);
		}
	},

	goPrev: function() {
		var prev = ui.wizard.getPreviousStep();
		if (ui.wizard.semaphore == 1) {
			ui.wizard.current_step--;
			ui.wizard.move(prev, -100);
		}
	},

	initEvents: function() {
		$(document).keydown(function(e) {
			var exp1 = $('.vm-name input').is(':focus') && $('.vm-name input').val().length>0;
			var exp2 = $('.form-item input').is(':focus') && $('.form-item input').val().length>0;
			// right arrow keyCode == 39
			if ($('.wizard:visible').length != 0) {
				if (e.keyCode == 39 && ui.wizard.current_step != (ui.wizard.total_step) &&(!exp1) && (!exp2)) {
					ui.wizard.goNext();
					return false;
				}
				// left arrow keyCode == 37
				else if (e.keyCode == 37 && ui.wizard.current_step != 1 &&(!exp1) &&(!exp2)) {
					ui.wizard.goPrev();
					return false;
				}
				// ESC
				else if (e.keyCode == 27 && ui.wizard.current_step == 1) {
					ui.wizard.close();
				}
			}
		});

		ui.wizard.btns.next.click(function(e) {
			if (ui.wizard.current_step == ui.wizard.total_step ){
				ui.wizard.submitData();
				ui.wizard.close();
				return false;
			}
			ui.wizard.goNext();
		});

		ui.wizard.btns.previous.click(function(e) {
			if (ui.wizard.current_step == 1 ){
				ui.wizard.close();
				return false;
			}
			ui.wizard.goPrev();
		});
	},

	// for the carousel index
	indicateStep: function(step) {
		$('.wizard .top .sub-menu[data-step]').hide();
		$('.wizard .top .sub-menu[data-step=' + step + ']').fadeIn();

		$('.nums').children().removeClass('current');
		$('.nums li:not(".current")').show().css("display", "inline");
		$('.nums li:nth-child(' + ui.wizard.current_step + ')').addClass('current');
		$('.nums li.current').hide();
		$('.nums li.current').fadeIn('slow').css("display", "inline");
		$('.nums .current').prevAll('li').hide();
	},

	// changes the text of next and previous buttons
	setMovementTags: function() {
		if (ui.wizard.current_step == 1) {
			ui.wizard.btns.previous.find('span').html('CANCEL');
			ui.wizard.btns.next.find('span').html('NEXT');
		} else if (ui.wizard.current_step == ui.wizard.total_step) {
			ui.wizard.btns.previous.find('span').html('PREVIOUS');
			ui.wizard.btns.next.find('span').html('CREATE');
		} else {
			ui.wizard.btns.previous.find('span').html('PREVIOUS');
			ui.wizard.btns.next.find('span').html('NEXT');
		}
	},

	close: function() {
		$('body').removeClass('with-overlay');
		$('.overlay-area').fadeOut(400, function() {
			$('.overlay-div').hide();
		});
		ui.wizard.resetWizard();
	},
	// manually sets elements to a initial state
	resetWizard: function() {
		ui.wizard.current_step = 1;
		$('.step').removeAttr('style');
		$('.bottom').show();
		ui.wizard.indicateStep(ui.wizard.current_step);
		ui.wizard.setMovementTags();
		$('.networks-area .more').show();
		$('.details').hide();
		$('.vm-name input').val("");
		$('.form-item input').val("");
		$('.advanced-conf-options').hide();
		$('.snf-color-picker').hide();
		ui.wizard.preselectElements('.wizard');
	},

	expandArea: function() {
		ui.wizard.btns.expand_down.click(function(e) {
			ui.expandArrow(ui.wizard.btns.expand_down);
			$('.wizard-content').removeAttr('style');
			ui.wizard.btns.expand_down.parents('div.advanced-conf-step').find('.advanced-conf-options').stop().slideToggle(600, function() {
				if ($('.advanced-conf-options:visible').length != 0) {
					ui.wizard.btns.expand_down.find('.snf-arrow-down .snf-arrow-up').removeClass('snf-arrow-down').addClass('snf-arrow-up');
				} else {
					ui.wizard.btns.expand_down.find('.snf-arrow-down .snf-arrow-up').addClass('snf-arrow-down');
				}

			});
		})
	},
	focusCustom: function(el, step) {
		el.focus();
		el.attr('data-step', step);
	},

	preselectElements: function(area) {
		$(area).find('.current').not('.preselected').removeClass('current');
		$(area).find('.preselected').not('.current').addClass('current');
		$(area).find('.custom.dropdown.medium a:first').addClass('current'); // to fix
		$(area).find('.snf-radio-checked').not('.prechecked').toggleClass('snf-radio-checked snf-radio-unchecked');
		$(area).find('.snf-radio-unchecked.prechecked').toggleClass('snf-radio-checked snf-radio-unchecked');
		$(area).find('.snf-checkbox-checked').not('.prechecked').toggleClass('snf-checkbox-checked snf-checkbox-unchecked');
		$(area).find('.snf-checkbox-unchecked.prechecked').toggleClass('snf-checkbox-checked snf-checkbox-unchecked');
		$('.expand-link').find('.snf-arrow-up.preselected').toggleClass('snf-arrow-up snf-arrow-down');
		$('.step-1').addClass('current');
		
		$('.os li').hide();
		$('#vm-wizard .top .sub-menu[data-step=1] .preselected').data('img-type')
		$('.os').find('.'+$('#vm-wizard .top .sub-menu[data-step=1] .preselected').data('img-type')).show();
	},

	pickResources: function(resource) {
		$('.flavor .with-flavor a:not(.' + resource + ')').removeClass('current');
		$('.flavor .with-flavor a.' + resource + '').addClass('current');
	},

	showImageCategory: function(imagesCategory) {
		$(imagesCategory).closest('.sub-menu').find('.current').removeClass('current');
		$(imagesCategory).addClass('current');
		$('.os li').hide();
		$('.os .details').hide();
		selectedImages = $(imagesCategory).data('img-type');
		$('.os').find('.'+selectedImages).fadeIn();
		
	
	}

}


$(document).ready(function() {

	/*
Various functions for vm creation wizard
*/

	/* step functions */
	/* step-1: Pick OS */
	$('.wizard .os > li').keydown(function(e) {
	  if(e.keyCode == 13) {
	    $(this).trigger("click", true);
	    e.preventDefault();
	  }
	});

	$('.wizard .os > li').click(function(e, wasEnterKey) {
		e.preventDefault();
		if ( $(this).hasClass('current') && wasEnterKey) {
			ui.wizard.goNext();
		}
		$('.wizard .os >li').removeClass('current');
		$(this).addClass('current');
	});

	$('.os .btn-col a').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('current');
		var self = this;
		$(this).parents('li').find('.details').stop().slideToggle();
	});


	/* step-2: Select flavor */
	disabledElems = $('.flavor a.disabled');
	disabledElemsNum = $('.flavor a.disabled').length;
	
	if(disabledElemsNum>0) {
		for(i=0; i<disabledElemsNum; i++) {
			$('.wizard .sub-menu[data-step=2]').find('a[data-size=' + ui.wizard.vm.getSize(disabledElems.get(i)) + ']').removeClass('current').addClass('disabled');
		}
	}
	$('.wizard .sub-menu a[data-size]:not(.disabled)').on("click", function(e) {
		// e.preventDefault();
		$(this).parents('.sub-menu').find('a').removeClass('current');
		$(this).addClass('current');
		ui.wizard.pickResources($(this).data('size'));
	});

	$('.wizard .flavor .options:not(".vm-storage-selection") a:not(.disabled)').click(function(e) {
		// e.preventDefault();
		$('.wizard .sub-menu a[data-size]').removeClass('current');
		$(this).parents('.options').find('a').removeClass('current');
		$(this).addClass('current');
		var size = ui.wizard.vm.getSize(this);
		var count = $('.wizard .step-2 .options.with-flavor .' + size + '.current').length;
		if (count == 3) {
			$('.wizard .sub-menu[data-step=2]').find('a[data-size=' + size + ']').addClass('current');
		}
	});

	$('.wizard .flavor .options.vm-storage-selection a').click(function(e) {
		// e.preventDefault();
		$(this).parents('.options').find('a').removeClass('current');
		$(this).addClass('current');
	});

	$('.flavor .options a').hover(
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


	/* step-3: Advanced options */

	// reaction li.click   
	$('.advanced-conf-options .checkbox').click(function(e) {
		e.preventDefault();
		var self = this;
		var checkbox = $(this).find('.check');
		ui.changeCheckboxState(checkbox);
		if ($(this).hasClass('has-more')) {
			$(this).next('.more').stop().slideToggle(400, function() {
				if ($(self).next('.more:visible').length != 0) {
					$(checkbox).find('span').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
				} else {
					$(checkbox).find('span').removeClass('snf-checkbox-checked').addClass('snf-checkbox-unchecked');
				}
			});
		}
	});



	// reaction a.click
	$('.checkbox .check').click(function(e) {
		e.stopPropagation();
		var self = this;
		if ($(this).closest('.checkbox').hasClass('has-more')) {
			$(this).parent().next('.more').stop().slideToggle(400, function() {
				if ($(self).parent().next('.more:visible').length != 0) {
					$(self).find('span').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
				} else {
					$(self).find('span').removeClass('snf-checkbox-checked').addClass('snf-checkbox-unchecked');
				}
			});
		}
	});

	$('.show-add-tag').click(function(e) {
		e.preventDefault();
		$(this).parents('.tags-area').find('.snf-color-picker').slideDown('slow', function() {
			$('#hide-add-tag-dummy').scrollintoview({
				'duration': 'slow'
			});
		});
		ui.colorPickerVisible = 1;
	});

	$('.hide-add-tag').click(function(e) {
		e.preventDefault();
		$(this).parents('.tags-area').find('.snf-color-picker').slideUp(400, function() {
			$('.show-add-tag').first().scrollintoview({
				'duration': 'slow'
			});
			ui.colorPickerVisible = 0;
		});
	});

	/* end of step functions */

	/* navigation and numbers functions */
	$('.nav.previous').focus(function(e) {
		$(this).addClass('active');
	});

	$('.nav.previous').focusout(function(e) {
		$(this).removeClass('active');

	});

	$('.sub-menu[data-step=2] li:last').find('a').focusout(function(e) {
		$('.step-2').find('.dropdown a:first').focus();

	});

	$('.os .name-col').focus(function(e) {
		$(this).parents('li').addClass('hover');
	});

	$('.os .name-col').focusout(function(e) {
		$(this).parents('li').removeClass('hover');
	});


	/* end of navigation and numbers functions */


	/* focus and tabs functionality */

	$('a').keyup(function(e) {

		var self = this;
		if (e.keyCode == 9 || e.which == 9) {
			if (e.shiftKey) {
			} else {
				//Focus next input
				if ($(self).attr('data-next')) {
					$(self).focusout(function(e) {
						var classname = $(self).data('next');
						$('.' + classname + '').first().focus();
					});
				}
			}
		}
	})

	/* end of focus and tabs functionality */

	$('#vm-wizard').find('a').click(function(e) {
		e.preventDefault();
	});
	ui.wizard.current_step = 1;
	ui.wizard.btns.previous = $('.bottom').find('.nav.prev');
	ui.wizard.btns.next = $('.bottom').find('.nav.next');
	ui.wizard.btns.expand_down = $('.adv-main').find('.expand-link');
	ui.wizard.btns.close = $('#vm-wizard').find('.close');
	ui.wizard.initEvents();
	ui.wizard.setMovementTags();
	ui.wizard.expandArea();
	ui.wizard.btns.close.click(function() {
		ui.wizard.close();
	});
	
	$('.os .system-images').show();

	$('#vm-wizard .top .sub-menu[data-step=1] a').click(function() {
		ui.wizard.showImageCategory(this);
	})
});