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
	},

	submitData: function (){
		console.log('submit data dummy function');
	},

	data_next_array: ['el0','el2','el4','el7'],

	focusFun: function(){
		$('.firstfocus-'+ui.wizard.current_step+'').first().focus();
		$('.nav.next').removeAttr('data-next');
		$('.nav.next').attr('data-next', ui.wizard.data_next_array[ui.wizard.current_step]);
	},

	move: function () {
		var percentage = -(ui.wizard.current_step-1)*100+'%';
		ui.wizard.setStepHeight($('.step-'+ui.wizard.current_step+''));
		$('#dummy-link-'+(ui.wizard.current_step-1)+'').scrollintoview({'duration':0});
		$('.vm-wizard-carousel').stop(true, true).animate(
			{ 'left': percentage },
			ui.wizard.speed
		);
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
			ui.wizard.close();
		}
	},

	goPrev:function() {
		if(ui.wizard.current_step > 1){
			ui.wizard.current_step--;
			ui.wizard.move();
		}
		else {
			ui.wizard.close();
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
					ui.wizard.close();
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
		$('.nums li:not(".current")').show().css("display","inline");
		$('.nums li:nth-child('+ui.wizard.current_step+')').addClass('current');
		$('.nums li.current').hide();
		 $('.nums li.current').fadeIn('slow').css("display","inline");
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

	close: function() {
		$('.overlay-area').fadeOut(400, function (){
	        $('.overlay-div').hide();
		});
		ui.wizard.resetWizard();
	},

	// manually sets elements to a initial state
	resetWizard: function() {
		  ui.wizard.current_step = 1;
        $('.vm-wizard-carousel').css('left',0);
        $('.bottom').show();
        ui.wizard.indicateStep(ui.wizard.current_step);
        ui.wizard.setMovementTags();
        $('.networks-area .more').show();
        $('.details').hide();
        $('.vm-wizard-carousel input').val('');
        $('.advanced-conf-options').hide();
        $('.snf-color-picker').hide();
        ui.wizard.preselectElements('.wizard');
	},

	expandArea: function() {
		ui.wizard.btns.expand_down.click(function(e){
            ui.expandArrow(ui.wizard.btns.expand_down);
            $('.wizard-content').removeAttr('style');
            ui.wizard.btns.expand_down.parents('div.advanced-conf-step').find('.advanced-conf-options').stop().slideToggle(600, function() {
	        	if($('.advanced-conf-options:visible').length != 0) {
	        		ui.wizard.btns.expand_down.find('.snf-arrow-down .snf-arrow-up').removeClass('snf-arrow-down').addClass('snf-arrow-up');
	        	} 
	        	else {
	        		ui.wizard.btns.expand_down.find('.snf-arrow-down .snf-arrow-up').addClass('snf-arrow-down');
	        	}
				ui.wizard.setStepHeight($('.step-3'));
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

	setStepHeight: function(stepEl) {
		var h1 = stepEl.height();
		var h2 = $('.wizard .top').height();
		var h3 = $('.header').height();
		var h4 = $(window).height();
		var res2 =  h4-h3-h2-h1;
		var res1 =  h1 +h2;
		if(res2>h1) {
			$('.wizard-content').css('height',res2);
		}
		else {
		    $('.wizard-content').css('height',res1);
		}
	},

	returnStepHeight: function(stepEl) {
		var h1 = stepEl.height();
		var h2 = $('.wizard .top').height();
		var h3 = $('.header').height();
		var h4 = $(window).height();
		var res2 =  h4-h3-h2-h1;
		var res1 =  h1 +h2;
		if(res2>h1) {
			return res2;
		}
		else {
			return res1;
		}
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
        var self = this;
        $(this).parents('li').find('.details').stop().slideToggle('slow', 'easeOutExpo',function(){
			ui.wizard.setStepHeight($('.step-1'));
        });
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

        var size, count;
        if($(this).hasClass('small')) {
            size = 'small';
        }
        else if ($(this).hasClass('medium')){
            size = 'medium';
        }

        else if($(this).hasClass('large')) {
            size = 'large';
        }

        count = $('.wizard .step-2 .options.with-flavor .'+size+'.current').length;
        if(count == 3) {
            $('.wizard .sub-menu[data-step=2]').find('a[data-size='+size+']').addClass('current');
        }
    });

  	$('.wizard .flavor .options.vm-storage-selection a').click(function(e){
        // e.preventDefault();
        $(this).parents('.options').find('a').removeClass('current');
        $(this).addClass('current');
    });

	$('.flavor .options a').hover(
		function(){
			var paragraph = $(this).parents('.options-bar').siblings('.title').find('p');
			var text = $(this).data('help');
			paragraph.html(text);
			paragraph.css('visibility','visible');
		}, function() {
			var paragraph = $(this).parents('.options-bar').siblings('.title').find('p');
			paragraph.css('visibility','hidden');
		 }
    );
/* step-3: Advanced options */

	// reaction li.click   
    $('.advanced-conf-options .checkbox').click(function(e){
        e.preventDefault();
        var self = this;
        var checkbox = $(this).find('.check');
        ui.changeCheckboxState(checkbox);
        if($(this).hasClass('has-more')) {
            $(this).next('.more').stop().slideToggle(400, function() {
				ui.wizard.setStepHeight($('.step-3'));
            	if($(self).next('.more:visible').length != 0) {
            		$(checkbox).find('span').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
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
        $(this).parents('.tags-area').find('.snf-color-picker').slideDown('slow', function(){
			ui.wizard.setStepHeight($('.step-3'));
			$('#hide-add-tag-dummy').scrollintoview({'duration':'slow'});
        });
        ui.colorPickerVisible =1;
    });

    $('.hide-add-tag').click(function(e){
        e.preventDefault();
        $(this).parents('.tags-area').find('.snf-color-picker').slideUp(400, function(){
            $('.show-add-tag').first().scrollintoview({'duration':'slow'});
            ui.colorPickerVisible = 0;
            ui.wizard.setStepHeight($('.step-3'));
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
		if(e.shiftKey) {
	    } else {
	       //Focus next input
	       if ($(self).attr('data-next')) {
				$(self).focusout(function(e){
					var classname = $(self).data('next');
					console.log('tab goes to ',classname);
					$('.'+classname+'').first().focus();
				});
			}
		}
	}
})

/* end of focus and tabs functionality */

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
	ui.wizard.btns.close.click(function() {
		ui.wizard.close();
	});

	$(window).resize(function() {
		ui.wizard.setStepHeight($('.step-'+ui.wizard.current_step+''));
	});
});