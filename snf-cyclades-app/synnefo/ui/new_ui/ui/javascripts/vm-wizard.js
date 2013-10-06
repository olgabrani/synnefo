// all functions use pixels
ui.wizard ={
	current_step: undefined,
	total_step:  $('.wizard-content .step').length,
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

	setDimensions: function (){
		$('.vm-wizard-carousel').css('width', 100*ui.wizard.total_step+'%');
		$('.vm-wizard-carousel .step').css('width', 100/ui.wizard.total_step+'%');
		ui.wizard.setStepHeight('.step', '.top', '.bottom', '.header');
	},

	submitData: function (){
		console.log('submit data dummy function');
	},

	data_next_array: ['test1','el2','el4','el7'],

	focusFun: function(){
		// $('.nav.next').attr('data-step',ui.wizard.current_step);
		// $('.nav.next').removeAttr('data-next');
		// $('.nav.next').attr('data-next', ui.wizard.data_next_array[ui.wizard.current_step]);
		// $('.'+ui.wizard.data_next_array[ui.wizard.current_step]+'').first().focus();
		// console.log('focusFun',ui.wizard.data_next_array[ui.wizard.current_step]);
	},

	move: function () {
		var percentage = -(ui.wizard.current_step-1)*100+'%';
		$('.step').css('overflow-y', 'hidden');
		$('.vm-wizard-carousel').stop(true, true).animate({ 'left': percentage }, ui.wizard.speed, function() {
			$('.step').css('overflow-y', 'scroll');
		});
		ui.wizard.focusFun();
		ui.wizard.indicateStep(ui.wizard.current_step);
		ui.wizard.setMovementTags(ui.wizard.current_step, ui.wizard.btns.previous, ui.wizard.btns.next);
		 if(ui.wizard.current_step == 3 && $('.step-3 .advanced-conf-options:visible').length == 0) {
					setTimeout(function() { $('.vm-name').find('input').focus() }, ui.wizard.speed/2);
				}

	},

	goNext: function () {
		if(ui.wizard.current_step < ui.wizard.total_step){
			ui.wizard.current_step++;
			ui.wizard.move();
		}
		else {
			ui.wizard.submitData();
			ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area');
		}
	},

	goPrev:function() {
		if(ui.wizard.current_step > 1){
			ui.wizard.current_step--;
			ui.wizard.move();
		}
		else {
			ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area');
		}
	},

	initEvents: function(){
		ui.wizard.setDimensions();

		$(document).keydown(function(e) {
			// right arrow keyCode == 39
			if($('.vm-wizard-carousel:visible').length != 0) {
				if(e.keyCode==39 && ui.wizard.current_step!=(ui.wizard.total_step)) {
					ui.wizard.goNext();
					return false;
				}
				// left arrow keyCode == 37
				else if(e.keyCode==37 && ui.wizard.current_step!=1) {
					ui.wizard.goPrev();
					return false;
				}
				// ESC
				else if(e.keyCode== 27 && ui.wizard.current_step==1) {
					ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area')
				}
		}
		});
		
		ui.wizard.btns.next.click(function(e){
			ui.wizard.goNext();
		})

		ui.wizard.btns.previous.click(function(e){
			ui.wizard.goPrev();
		});
	},

	// for the carousel index
	indicateStep: function(step) {
		$('.wizard .top .sub-menu[data-step]').hide();
		$('.wizard .top .sub-menu[data-step='+step+']').fadeIn();
		$('.nums').children().removeClass('current');
		$('.nums li').show();
		$('.nums li:nth-child('+ui.wizard.current_step+')').addClass('current');
		$('.nums .current').prevAll('li').hide();
	},

	// changes the text of next and previous buttons
	setMovementTags: function() {
		if (ui.wizard.current_step==1) {
			ui.wizard.btns.previous.find('span').html('CANCEL');
			ui.wizard.btns.next.find('span').html('NEXT');
		}
		else if(ui.wizard.current_step==ui.wizard.total_step) {
			ui.wizard.btns.previous.find('span').html('PREVIOUS');
			ui.wizard.btns.next.find('span').html('CREATE');
		}
		else {
			ui.wizard.btns.previous.find('span').html('PREVIOUS');
			ui.wizard.btns.next.find('span').html('NEXT');
		}
	},

	close: function(bottom_area, main_area, total_area) {
        	$('.step').animate({
        		scrollTop: 0}, 1400, 'swing', function() {
				$(bottom_area).hide();
				$(main_area).slideUp(600);
				$(total_area).slideUp(600, function(){
					ui.wizard.reset();
					ui.wizard.preselectElements(bottom_area);
		            ui.wizard.preselectElements(main_area);
		            ui.wizard.preselectElements(total_area);
				});
        		});
	},

	// manually sets elements to a initial state
	reset: function() {
		  ui.wizard.current_step = 1;
        $('.vm-wizard-carousel').css('left',0);
        $('.bottom').show();
        ui.wizard.indicateStep(ui.wizard.current_step);
        ui.wizard.setMovementTags();
        $('.networks-area .more').show();
        $('.details').hide();
        $('.vm-name input').val('');
        $('.advanced-conf-options').hide();
        $('.snf-color-picker').hide();
	},

	expandArea: function() {
		ui.wizard.btns.expand_down.click(function(e){
	        // e.preventDefault();
	      	ui.expandArrow(ui.wizard.btns.expand_down);
	        ui.wizard.btns.expand_down.parents('div.advanced-conf-step').find('.advanced-conf-options').stop().slideToggle(600, function() {
	        	if($('.advanced-conf-options:visible').length != 0) {
	        		ui.wizard.btns.expand_down.find('.snf-arrow-down .snf-arrow-up').removeClass('snf-arrow-down').addClass('snf-arrow-up');
	        	} 
	        	else {
	        		ui.wizard.btns.expand_down.find('.snf-arrow-down .snf-arrow-up').addClass('snf-arrow-down');
	        	}
	        });
	    })
	},
	focusCustom: function(el, step) {
		el.focus();
		el.attr('data-step',step);
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
     },

     setStepHeight: function(stepEl, fixedTopEl, fixedBottomEl, headerEl) {
		var topHeight = $(fixedTopEl).height();
		var bottomHeight = $('.bottom .row').height();
		var totalHeight	= $(window).height();
		var headerHeight = $(headerEl).height();
		var stepHeight = totalHeight-topHeight-bottomHeight-headerHeight;
		$(stepEl).outerHeight(stepHeight);
		$('.wizard-content').outerHeight(stepHeight);	
	},

	pickResources: function(resource) {
	    $('.flavor .with-flavor a:not(.'+resource+')').removeClass('current');
	    $('.flavor .with-flavor a.'+resource+'').addClass('current');
	}

}


$(document).ready(function(){

/*
Various functions for vm creation wizard
*/

/* step functions */
/* step-1: Pick OS */
 	$('.wizard .os > li').click(function(e){
        e.preventDefault();
        $('.wizard .os >li').removeClass('current');
        $(this).addClass('current');
    });

    $('.os .btn-col a').click( function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('current');
        $(this).parents('li').find('.details').stop().slideToggle();
    });


/* step-2: Select flavor */
    $('.wizard .sub-menu a[data-size]').on( "click", function(e) {
       // e.preventDefault();
        $(this).parents('.sub-menu').find('a').removeClass('current');
        $(this).addClass('current');
        ui.wizard.pickResources($(this).data('size')); 
    });

    $('.wizard .flavor .options:not(".vm-storage-selection") a').click(function(e){
        // e.preventDefault();
        $('.wizard .sub-menu a[data-size]').removeClass('current');
        $(this).parents('.options').find('a').removeClass('current');
        $(this).addClass('current');
    });

  	$('.wizard .flavor .options.vm-storage-selection a').click(function(e){
        // e.preventDefault();
        $(this).parents('.options').find('a').removeClass('current');
        $(this).addClass('current');
    });

/* step-3: Advanced options */

	// reaction li.click   
    $('.advanced-conf-options .checkbox').click(function(e){
        e.preventDefault();
        var self = this;
        var checkbox = $(this).find('.check');
        ui.changeCheckboxState(checkbox);
        console.log('a1');
        if($(this).hasClass('has-more')) {
            $(this).next('.more').stop().slideToggle(400, function() {
            	console.log('a2');
            	if($(self).next('.more:visible').length != 0) {
            		$(checkbox).find('span').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
            			console.log('a3');
            	}
            	else {
            		$(checkbox).find('span').removeClass('snf-checkbox-checked').addClass('snf-checkbox-unchecked');
            	}
            });
        }
    });
    // reaction a.click
    $('.checkbox .check').click(function(e) {
		e.stopPropagation();
		var self = this;
		if($(this).closest('.checkbox').hasClass('has-more')) {
			console.log('hi');
            $(this).parent().next('.more').stop().slideToggle(400, function() {
            	console.log('a2');
            	if($(self).parent().next('.more:visible').length != 0) {
            		$(self).find('span').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
            			console.log('a3');
            	}
            	else {
            		$(self).find('span').removeClass('snf-checkbox-checked').addClass('snf-checkbox-unchecked');
            	}
            });
        }
	});

   	$('.show-add-tag').click(function(e){
        e.preventDefault();
        $(this).parents('.tags-area').find('.snf-color-picker').slideDown();
        goToByScroll('hide-add-tag');
        ui.colorPickerVisible =1;
    });

    $('.hide-add-tag').click(function(e){
        e.preventDefault();
        $(this).parents('.snf-color-picker').slideUp('400', function(){
            ui.colorPickerVisible = 0;
        });
    });

/* end of step functions */

/* navigation and numbers functions */
$('.nav.previous').focus(function(e){
	$(this).addClass('active');
});

$('.nav.previous').focusout(function(e){
	$(this).removeClass('active');

});

$('.sub-menu[data-step=2] li:last').find('a').focusout(function(e) {
	$('.step-2').find('.dropdown a:first').focus();

});

$('.os .name-col').focus(function(e){
	$(this).parents('li').addClass('hover');
});

$('.os .name-col').focusout(function(e){
	$(this).parents('li').removeClass('hover');
});


/* end of navigation and numbers functions */


/* focus and tabs functionality */

$('a').keyup(function(e){
	var self = this;
	if (e.keyCode==9||e.which==9){
		if ($(self).attr('data-next')) {
			$(self).focusout(function(e){
				var classname = $(self).data('next');
				console.log('tab goes to ',classname);
				$('.'+classname+'').first().focus();
			})
		}
	}
})


// make sure that is always correctly moved
/*$('a, input').focus(function(e){
	if ($(this).parents('.step').data('step')> 0) {
		if ( ui.wizard.current_step == ($(this).parents('.step').data('step'))) {
		} else {
			ui.wizard.current_step = $(this).parents('.step').data('step');
			ui.wizard.move();
		}
	}
})
*//* end of focus and tabs functionality */

	$('#vm-wizard').find('a').click(function(e) {
		e.preventDefault();
	});
	ui.wizard.current_step =1;
	ui.wizard.btns.previous = $('.bottom').find('.nav.prev');
	ui.wizard.btns.next = $('.bottom').find('.nav.next');
	ui.wizard.btns.expand_down =$('.adv-main').find('.expand-link');
	ui.wizard.btns.close =$('#vm-wizard').find('.close');
	ui.wizard.initEvents();
	ui.wizard.setMovementTags();
	ui.wizard.expandArea();
	ui.wizard.btns.close.click(function(e) {
		ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area')
	});

	$(window).resize(function() {
		ui.wizard.setStepHeight('.step', '.top', '.bottom', '.header')
	});
});