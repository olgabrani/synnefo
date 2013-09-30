// all functions use pixels
ui.wizard ={
	current_step: undefined,
	vm: {
		total_step: 4,
		btns: {
			start: undefined,
			close: undefined,
			next: undefined,
			previous: undefined,
			expand_down: undefined
		}
	},
	
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

	

	move_to_step: function() {
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
		ui.wizard.vm.btns.next.click(function(e){
			e.preventDefault();
			go_next();
		})

		// when the button "previous" is pressed show the previous step (if there is a previous step)
		ui.wizard.vm.btns.previous.click(function(e){
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
				ui.wizard.set_movement_tags(ui.wizard.current_step, ui.wizard.vm.btns.previous, ui.wizard.vm.btns.next);

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
				ui.wizard.set_movement_tags(ui.wizard.current_step, ui.wizard.vm.btns.previous, ui.wizard.vm.btns.next);

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
	initialize_relocation: function(){
			console.log('initialize_relocation');
			ui.wizard.vm.btns.start.click(function(e) {
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
		//$('.nums li:nth-child('+ui.wizard.current_step+'').addClass('current');
		$('.nums').children().find('a:contains("'+ui.wizard.current_step+'")').parent('li').addClass('current');
	},

	// changes the text of next and previous buttons
	set_movement_tags: function() {
		if (ui.wizard.current_step==1) {
			ui.wizard.vm.btns.previous.find('span').html('CANCEL');
			ui.wizard.vm.btns.next.find('span').html('NEXT');
		}
		else if(ui.wizard.current_step==ui.wizard.vm.total_step) {
			ui.wizard.vm.btns.previous.find('span').html('PREVIOUS');
			ui.wizard.vm.btns.next.find('span').html('CREATE');
		}
		else {
			ui.wizard.vm.btns.previous.find('span').html('PREVIOUS');
			ui.wizard.vm.btns.next.find('span').html('NEXT');
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
		ui.wizard.set_movement_tags();
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
		ui.wizard.vm.btns.expand_down.click(function(e){
	        e.preventDefault();
	      	ui.expand_arrow(ui.wizard.vm.btns.expand_down);
	        ui.wizard.vm.btns.expand_down.parents('div.advanced-conf-step').find('.advanced-conf-options').slideToggle();
	    })
	}

}


$(document).ready(function(){

	ui.wizard.current_step =1;
	ui.wizard.current_position =0;

	ui.wizard.vm.btns.start =$('.new-btn, .add-new');
	ui.wizard.vm.btns.previous = $('.bottom').find('.nav.prev');
	ui.wizard.vm.btns.next = $('.bottom').find('.nav.next');
	ui.wizard.vm.btns.expand_down =$('.adv-main').find('.expand-link');
	
	$('.wizard .nums').click(function(e){
		e.preventDefault();
	})

	ui.wizard.initialize_relocation();
	ui.wizard.move_to_step();
	ui.wizard.set_movement_tags();
	ui.wizard.expand_area();




 	


});