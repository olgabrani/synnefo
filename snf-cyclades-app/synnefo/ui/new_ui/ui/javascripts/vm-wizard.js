// all functions use pixels
ui.wizard ={
	current_step: undefined,
	vm: {total_step: 4},
	current_position: undefined,
	relocation: undefined,

	// sets the width and height of the carousel and its divs
	set_dimensions: function() {
		console.log('set dimentions');
		ui.wizard.relocation = $('.wizard-content').width();
		$('.vm-wizard-carousel').children('div').width(ui.wizard.relocation+'px');
		$('.vm-wizard-carousel').children('div').height($('.wizard-content').height()+'px');
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
		// when the button "next" is pressed show the next step (if there is a next step)
		next_btn.click(function(){
			event.preventDefault();
			console.log('you clicked next!')
			if(ui.wizard.current_step < ui.wizard.vm.total_step){
				ui.wizard.current_step++;
				ui.wizard.current_position -=ui.wizard.relocation;
				$('.vm-wizard-carousel').animate({left: ui.wizard.current_position+'px'}, 1000);
				ui.wizard.indicate_step(ui.wizard.current_step);
			}
			else {
				console.log('This is the last step.');
			}
		})

		// when the button "previous" is pressed show the previous step (if there is a previous step)
		prev_btn.click(function(){
			event.preventDefault();
			console.log('you clicked previous!');
			if(ui.wizard.current_step > 1){
				ui.wizard.current_step--;
				ui.wizard.current_position +=ui.wizard.relocation;
				$('.vm-wizard-carousel').animate({left: ui.wizard.current_position+'px'}, 1000);
				ui.wizard.indicate_step(ui.wizard.current_step);
			}
			else {
				console.log('This is the 1st step.')
			}
		})
	},

	// sets the width and height of the steps and of the carousel (in PIXELS)
	initialize_relocation: function(start_btns){
		start_btns.click(function() {
			event.preventDefault();
			console.log('initialize_relocation');
			ui.wizard.adjust_to_resized_screen();
			ui.wizard.set_dimensions();
		})
	},
	// for the carousel index
	indicate_step: function(step) {
		$('.nums').children().removeClass('current');
		$('.nums').children().find('a:contains("'+ui.wizard.current_step+'")').parent('li').addClass('current');
	}
}


$(document).ready(function(){

ui.wizard.current_step =1;
ui.wizard.current_position =0;

var new_vm_btn =$('.new-btn, .add-new');
var prev_btn = $('.bottom').find('.nav.prev');
var next_btn = $('.bottom').find('.nav.next');

ui.wizard.initialize_relocation(new_vm_btn);
ui.wizard.move_to_step(prev_btn, next_btn);


});