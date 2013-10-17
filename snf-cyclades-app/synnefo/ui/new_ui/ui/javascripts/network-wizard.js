ui.wizard.network = {
    elemID: undefined,
    btns: {
        cancel: undefined,
        create: undefined,
        close: undefined,
        new_network: undefined
    },
    close: function(bottom_area, main_area, total_area) {
        $('body').removeClass('with-overlay');
        $('.overlay-area').fadeOut(400, function() {
            $('.overlay-div').hide();
        });
    }
}


$(document).ready(function(){
    $('#network-wizard').find('a').click(function(e) {
        e.preventDefault();
    });
    ui.wizard.network.elemID = '#network-wizard';
    ui.wizard.network.btns.new_network = $(ui.wizard.network.elemID);
    ui.wizard.network.btns.close = ui.wizard.network.btns.new_network.find('.close');
    ui.wizard.network.btns.cancel = ui.wizard.network.btns.new_network.find('.bottom .nav.prev');
    ui.wizard.network.btns.create = ui.wizard.network.btns.new_network.find('.bottom .nav.next');


     // create network
    $('.network_options .check').click(function(e){
    e.preventDefault();
    $(this).parents('li').siblings().find('ul.subnet_options').parent('li').toggle();
    });

    $('.network_options .radio_btn').click(function(e){
        e.preventDefault();
        var state = $(this).find('span');
        if(state.hasClass('snf-radio-unchecked')) {
            ui.checkOneRadioButton(this);
            ui.changeRadiobuttonState(this);

            if($(this).hasClass('manual')) {
                $(this).siblings('.manual_sub').toggle();
            }
            else {
                $(this).closest('li').siblings().find('.manual_sub').hide();
            }
        }
       
    });
    $(ui.wizard.network.btns.cancel).click(function(e) {
        ui.wizard.network.close('.bottom', '#network-wizard', '.overlay-area');
    });
    $(ui.wizard.network.btns.create).click(function(e) {
        ui.wizard.network.close('.bottom', '#network-wizard', '.overlay-area');
    });
    $(ui.wizard.network.btns.close).click(function(e) {
        ui.wizard.network.close('.bottom', '#network-wizard', '.overlay-area');
    });

})