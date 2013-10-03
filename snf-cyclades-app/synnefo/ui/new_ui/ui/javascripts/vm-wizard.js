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
	/*set_container_height: function(step) {
		if (step === true) {
			step =0;
		} else {
			step = ui.wizard.current_step;
		}
		var topHeight = $('.top').height();
		var stepHeight = $('.step-'+(step+1)+'').height();
		var res = topHeight+stepHeight;
		console.log('step', step);
		if (step == 2) {
			$('.wizard-content').removeAttr('style');
		} else {
			$('.wizard-content').height(res);
		}
    }, 
    set_container_height_back: function(step) {
		if (step === true) {
			step =1;
		} else {
			step = ui.wizard.current_step;
		}
		var topHeight = $('.top').height();
		var stepHeight = $('.step-'+step+'').height();
		var res = topHeight+stepHeight;
		console.log('step', step);
		if (step == 3) {
			$('.wizard-content').removeAttr('style');
		} else {
			$('.wizard-content').height(res);
		}
    },*/

	set_dimensions: function (){
		$('.vm-wizard-carousel').css('width', 100*ui.wizard.total_step+'%');
		$('.vm-wizard-carousel .step').css('width', 100/ui.wizard.total_step+'%');
	},

	submit_data: function (){
		console.log('submit data dummy function');
	},

	move: function () {
		var percentage = -(ui.wizard.current_step-1)*100+'%';
		$('.vm-wizard-carousel').stop().animate({ 'left': percentage }, ui.wizard.speed);
		$('.nav.next').attr('data-step',ui.wizard.current_step);
		ui.wizard.indicate_step(ui.wizard.current_step);
		ui.wizard.set_movement_tags(ui.wizard.current_step, ui.wizard.btns.previous, ui.wizard.btns.next);

	},

	go_next: function () {
		if(ui.wizard.current_step < ui.wizard.total_step){
			ui.wizard.current_step++;
			ui.wizard.move();
		}
		else {
			console.log('e');
			ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area');
			ui.wizard.submit_data();
		}
	},

	go_prev:function() {
		if(ui.wizard.current_step > 1){
			ui.wizard.current_step--;
			ui.wizard.move();
		}
		else {
			ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area');
		}
	},

	init_events: function(){
		ui.wizard.set_dimensions();
		$(document).keydown(function(e) {
			// right arrow keyCode == 39
			// ui.wizard.total_step+1 because current_step has not changed yet
			if(e.keyCode==39 && ui.wizard.current_step!=(ui.wizard.total_step+1)) {
				console.log('ui.wizard.current_step', ui.wizard.current_step);
				console.log('ui.wizard.total_step', ui.wizard.total_step);
				ui.wizard.go_next();
				return false;
			}
			// left arrow keyCode == 37
			else if(e.keyCode==37 && ui.wizard.current_step!=1) {
				ui.wizard.go_prev();
				return false;
			}
			// ESC
			else if(e.keyCode== 27 && ui.wizard.current_step==1) {
				ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area')
			}
		});
		
		ui.wizard.btns.next.click(function(e){
			ui.wizard.go_next();
		})

		ui.wizard.btns.previous.click(function(e){
			ui.wizard.go_prev();
		});
	},

	// for the carousel index
	indicate_step: function(step) {
		$('.wizard .top .sub-menu[data-step]').hide();
		$('.wizard .top .sub-menu[data-step='+step+']').fadeIn();
		$('.nums').children().removeClass('current');
		$('.nums li').show();
		$('.nums li:nth-child('+ui.wizard.current_step+')').addClass('current');
		$('.nums .current').prevAll('li').hide();
	},

	// changes the text of next and previous buttons
	set_movement_tags: function() {
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
		$(bottom_area).hide();
		$(main_area).slideUp();
		$(total_area).slideUp('slow', function(){
			ui.wizard.reset();
		});
	},

	// manually sets elements to a initial state
	reset: function() {
		ui.wizard.current_step = 1;
		$('.vm-wizard-carousel').css('left',0);
		$('.bottom').show();
		$('.os li').removeClass('current');
		$('.os .btn-col a').removeClass('current');
		$('.os li.preselected').addClass('current');
		//$('.step-1').find('.current').removeClass('current');
		ui.wizard.indicate_step(ui.wizard.current_step);
		ui.wizard.set_movement_tags();
		$('.ssh-keys-area').find('.snf-checkbox-checked').addClass('snf-checkbox-unchecked');
		$('.ssh-keys-area').find('.snf-checkbox-checked').removeClass('snf-checkbox-checked');
		$('.networks-area .checkbox').find('.snf-checkbox-checked').addClass('snf-checkbox-unchecked');
		$('.networks-area .checkbox').find('.snf-checkbox-checked').removeClass('snf-checkbox-checked');
		$('.networks-area .more').hide();
		$('#vm-wizard').find('.snf-checkbox-checked').addClass('snf-checkbox-unchecked').removeClass('snf-checkbox-checked');
		$('#vm-wizard').find('.default').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
		$('.details').hide();
		$('.wizard .top .sub-menu[data-step="1"] ul li:first-child a').addClass('current');
		ui.pickResources('small');
		//$('.wizard .step-2 .options li a:contains(DRBD)').addClass('current')
		$('.vm-name input').val('');
		$('.advanced-conf-options').hide();
		$('.snf-color-picker').hide();


	},

	expand_area: function() {
		ui.wizard.btns.expand_down.click(function(e){
	        // e.preventDefault();
	      	ui.expandArrow(ui.wizard.btns.expand_down);
	        ui.wizard.btns.expand_down.parents('div.advanced-conf-step').find('.advanced-conf-options').stop().slideToggle();
	    })
	},
	focus_custom: function(el, step) {
		el.focus();
		el.attr('data-step',step);
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
        e.preventDefault();
        $(this).parents('.sub-menu').find('a').removeClass('current');
        $(this).addClass('current');
        ui.pickResources($(this).data('size')); 
    });

    $('.wizard .flavor .options a').click(function(e){
        e.preventDefault();
        $('.wizard .sub-menu a[data-size]').removeClass('current');
        $(this).parents('.options').find('a').removeClass('current');
        $(this).addClass('current');
    });

/* step-3: Advanced options */
   
    $('.advanced-conf-options .checkbox').click(function(e){
        e.preventDefault();
        var checkbox = $(this).find('.check');
        ui.changeCheckboxState(checkbox);
        if($(this).hasClass('has-more')) {
            $(this).next('.more').slideToggle();
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

    $('.checkbox .check').click(function(e) {
		e.stopPropagation();

		if($(this).closest('.checkbox').hasClass('has-more')) {
            $(this).parent().next('.more').slideToggle();
        }
	})
/* end of step functions */

/* navigation and numbers functions */
$('.nav.previous').focus(function(e){
	$(this).addClass('active');
});

$('.nav.previous').focusout(function(e){
	// $(this).addClass('active');
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
$('.step-1 .os li:last').find('.btn-col a').focusout(function(e) {
	ui.wizard.focus_custom( $('.nav.next') , 1);
});

$('.step-2 a:last').focusout(function(e) {
	ui.wizard.focus_custom( $('.nav.next') , 2);
});

$('.step-3 a:last').focusout(function(e) {
	ui.wizard.focus_custom( $('.nav.next') , 3);
});

$('.nav.next').keydown(function(e) {
	var code = e.keyCode || e.which;
	if (code == '9') {
		var step = $(this).data('step');
		$('.step[data-step='+step+']').find('a, input').first().focus();
	   return false;
   }
});


// make sure that is always correctly moved
$('a, input').focus(function(e){
	console.log('parent-step',$(this).parents('.step').data('step'));
	if ($(this).parents('.step').data('step')> 0) {
		if ( ui.wizard.current_step == ($(this).parents('.step').data('step'))) {
		} else {
			ui.wizard.current_step = $(this).parents('.step').data('step');
			ui.wizard.move();q
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
	ui.wizard.init_events();
	ui.wizard.set_movement_tags();
	ui.wizard.expand_area();
	ui.wizard.btns.close.click(function(e) {
		ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area')
	});
});
