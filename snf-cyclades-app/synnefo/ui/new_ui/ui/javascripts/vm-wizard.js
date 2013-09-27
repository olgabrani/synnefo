// all functions use pixels
ui.wizard ={
	current_step: undefined,
	vm: {total_step: 4},
	current_position: undefined,
	relocation: undefined,

	// sets the width and height of the carousel and its divs
	set_dimensions: function() {
		console.log('set dimentions');
		ui.wizard.relocation = $(window).width();
		console.log(ui.wizard.relocation);
		$('.vm-wizard-carousel').children('div.step').width(ui.wizard.relocation);
	},

	// sets the width and height of the carousel and its divs when the screen is resized (in PIXELS)
	adjust_to_resized_screen: function() {
		$(window).resize(function() {
			console.log('resized');
			ui.wizard.set_dimensions();

			if(ui.wizard.current_position<=0) {
				// the carousel moves to left -> this is the case that acts on resize
				ui.wizard.current_position = -((ui.wizard.current_step-1)*ui.wizard.relocation);
			}
			else
				ui.wizard.current_position = (ui.wizard.current_step-1)*ui.wizard.relocation;

			$('.vm-wizard-carousel').css('left', ui.wizard.current_position+'px');
		})
	},

	

	move_to_step: function(prev_btn, next_btn) {
		var speed =500;

		// carousel movement when right or left arrow is pressed
		$(document).keydown(function(e) {
			if(e.keyCode==39) {
				go_next();
				return false;
			}
			else if(e.keyCode==37) {
				go_prev();
				return false;
			}
		});
		
		// when the button "next" is pressed show the next step (if there is a next step)
		next_btn.click(function(e){
			e.preventDefault();
			go_next();
		})

		// when the button "previous" is pressed show the previous step (if there is a previous step)
		prev_btn.click(function(e){
			e.preventDefault();
			go_prev();
			
		});


		function go_next() {
			console.log('going next!');
			console.log('you clicked next!')
			if(ui.wizard.current_step < ui.wizard.vm.total_step){
				ui.wizard.current_step++;
				ui.wizard.current_position -=ui.wizard.relocation;
				$('.vm-wizard-carousel').finish();
				$('.vm-wizard-carousel').animate({left: ui.wizard.current_position+'px'}, speed);
				ui.wizard.indicate_step(ui.wizard.current_step);
				ui.wizard.set_movement_tags(ui.wizard.current_step, prev_btn, next_btn);

				if(ui.wizard.current_step == 3) {
					setTimeout(function() { $('.vm-name').find('input').focus() }, speed/2);
				}

			}
			else {
				console.log('This is the last step.');
				ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area');
			}
		}

		function go_prev() {
			if(ui.wizard.current_step > 1){
				ui.wizard.current_step--;
				ui.wizard.current_position +=ui.wizard.relocation;
				$('.vm-wizard-carousel').finish();
				$('.vm-wizard-carousel').animate({left: ui.wizard.current_position+'px'}, speed);
				ui.wizard.indicate_step(ui.wizard.current_step);
				ui.wizard.set_movement_tags(ui.wizard.current_step, prev_btn, next_btn);

				if(ui.wizard.current_step == 3) {
					setTimeout(function() { $('.vm-name').find('input').focus() }, speed/2);
				}
			}
			else {
				console.log('This is the 1st step.')
				ui.wizard.close('.bottom', '#vm-wizard', '.overlay-area');
			}
		}
	},

	// sets the width and height of the steps and of the carousel (in PIXELS)
	initialize_relocation: function(start_btns){
			console.log('initialize_relocation');
			start_btns.click(function(e) {
				e.preventDefault();	
				ui.wizard.reset();
				ui.wizard.adjust_to_resized_screen();
				ui.wizard.set_dimensions();
			})
	},

	// for the carousel index
	indicate_step: function(step) {
		$('.wizard .top .sub-menu[data-step]').hide();
		$('.wizard .top .sub-menu[data-step='+step+']').fadeIn();
		$('.nums').children().removeClass('current');
		$('.nums').children().find('a:contains("'+ui.wizard.current_step+'")').parent('li').addClass('current');
	},

	// changes the text of next and previous buttons
	set_movement_tags: function(step, left_btn, right_btn) {
		if (step==1) {
			left_btn.find('span').html('CANCEL');
			right_btn.find('span').html('NEXT');
		}
		else if(step==ui.wizard.vm.total_step) {
			left_btn.find('span').html('PREVIOUS');
			right_btn.find('span').html('CREATE');
		}
		else {
			left_btn.find('span').html('PREVIOUS');
			right_btn.find('span').html('NEXT');
		}
	},

	close: function(bottom_area, main_area, total_area) {
		$(bottom_area).hide();
		$(main_area).slideUp();
		$(total_area).slideUp();
	},

	// manually sets elements to a initial state
	reset: function() {
		ui.wizard.current_step = 1;
		ui.wizard.current_position = 0;
		
		$('.vm-wizard-carousel').css({left: ui.wizard.current_position+'px'});
		$('.bottom').show();
		$('.step-1').find('.current').removeClass('current');
		ui.wizard.indicate_step(ui.wizard.current_step);
		$('#vm-wizard').find('.snf-checkbox-checked').addClass('snf-checkbox-unchecked').removeClass('snf-checkbox-checked');
		$('#vm-wizard').find('.default').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
		$('.details').hide();
		$('.wizard .top .sub-menu[data-step="1"] ul li:first-child a').addClass('current');
		ui.pickResources('small');
		//$('.wizard .step-2 .options li a:contains(DRBD)').addClass('current')
		$('.vm-name input').val('');
		$('.advanced-conf-options').hide();
		$('.snf-color-picker').hide();


	}

}


$(document).ready(function(){

	ui.wizard.current_step =1;
	ui.wizard.current_position =0;

	var new_vm_btn =$('.new-btn, .add-new');
	var prev_btn = $('.bottom').find('.nav.prev');
	var next_btn = $('.bottom').find('.nav.next');
	$('.wizard .nums').click(function(e){
		e.preventDefault();
	})

	ui.wizard.initialize_relocation(new_vm_btn);
	ui.wizard.move_to_step(prev_btn, next_btn);
	ui.wizard.set_movement_tags(ui.wizard.current_step, prev_btn, next_btn);
	

});