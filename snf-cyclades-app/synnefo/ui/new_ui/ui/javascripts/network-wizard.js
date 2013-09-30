ui.wizard.network = {
		 elemID: undefined,
			btns: {
				cancel: undefined,
				create: undefined,
				close: undefined,
				new_network: undefined
			}
}



$(document).ready(function(){

	ui.wizard.network.elemID = '#network-wizard';
    ui.wizard.network.btns.new_network = $(ui.wizard.network.elemID);
    ui.wizard.network.btns.close = ui.wizard.network.btns.new_network.find('.close');
    ui.wizard.network.btns.cancel = ui.wizard.network.btns.new_network.find('.bottom .nav.prev');
    ui.wizard.network.btns.create = ui.wizard.network.btns.new_network.find('.bottom .nav.next');


     // create network
    // checkbox: basic reaction on click (checked, unchecked)
    $('.network_options .check').click(function(e){
        e.preventDefault();

       ui.change_checkbox_state(this);
        $(this).parents('li').siblings().find('ul.subnet_options').parent('li').toggle();

        });

    $('.network_options .radio_btn').click(function(e){
        e.preventDefault();

        // an einai radiobtn epetrpse na einai ena anameno k kane oti prepei an exw manual mesa

        var state = $(this).find('span');
        if(state.hasClass('snf-radio-unchecked')) {
        	ui.check_one_radiobtn(this);
        	ui.change_radiobutton_state(this);

        	if($(this).hasClass('manual')) {
        		$(this).siblings('.manual_sub').toggle();
        	}
        	else {
        		$(this).closest('li').siblings().find('.manual_sub').hide();
        	}
        }
       
    })
})