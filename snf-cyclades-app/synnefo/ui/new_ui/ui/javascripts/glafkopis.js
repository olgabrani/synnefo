$(document).ready(function(){
    var select_flavor =0;
    $('.select-flavor dl span').click(function(e){
        e.preventDefault();
        $(this).parents('dl').find('span').removeClass('current');
        $(this).addClass('current');
        if(select_flavor == 1){
        	if(!$(this).parents('dl').hasClass('storage')){
        	$('.lt-sidebar').find('a.chosen_flavor').removeClass('chosen_flavor');
        	select_flavor = 0;
        	}
    	}
    });

	// tba: function that determines which values are included to small, medium and large flavor 

	// if a predefined flavor has been selected from the user, it highlights the proper resources 

	$('.lt-sidebar li a.flavor_selection').click(function(e){
		e.preventDefault();
		select_flavor = 1;
		var classes = $(this).attr('class').split(" ");
		// the second class is: 'small_flavor' or 'medium_flavor' or 'large_flavor'
		
		$(this).parent('li').siblings('li').find('a.chosen_flavor').removeClass('chosen_flavor');
		$(this).addClass('chosen_flavor');
		$('.select-flavor').find('dl.cpus span.current, dl.ram span.current, dl.disk span.current').removeClass('current');
		$('.select-flavor').find('.'+classes[1]).addClass('current');

	});



// create network
// checkbox: basic reaction on click (checked, unchecked)




 $('.network_options .check').click(function(e){
 	e.preventDefault();
 	var checkbox = $(this).find('.custom_checkbox');
 	var list = $(this).closest('ul');
 	
 	checkAction(checkbox); //allazw to checkbox p pataw
 	if(list.hasClass('subnet_options')){
 		checkedBefore = $(this).closest('li').siblings('li').find('span.checkbox-checked');
 		if($(checkedBefore).closest('li').find('a').hasClass('manual'))
 		{
 			$(checkedBefore).closest('li').find('.manual_sub').hide();
 		}
 		checkAction(checkedBefore); //allazw ta alla checkboxes
 		
 		if($(this).hasClass('manual')) {

 			if($(checkbox).text()=='a') {
 				$(this).closest('span').find('.manual_sub').hide();
 		}
 		else {
 			$(this).closest('span').find('.manual_sub').show();
 		}

 			//$(this).closest('span').find('.manual_sub').toggleClass('hidden');
 			
 		}
 	}
 	else if($(this).closest('li').hasClass('dhcp_option')) {
 		if($(checkbox).text()=='a') {
 			$('.network_options').find('.subnet_options').hide();
 		}
 		else {
 			$('.network_options').find('.subnet_options').show();
 		}
 	}
 	console.log(checkbox);
 })
   
});


function checkAction(checkbox) {
        var otherChecked = checkbox.closest('li').siblings('li').find('span.checkbox-checked').length;
        if(otherChecked!=0){
			checkbox.toggleClass('checkbox-checked');
		    if(checkbox.hasClass('checkbox-checked')){
		        checkbox.html('b');
		        
		    }
		    else{
		    	
		    	checkbox.html('a');
		    }
        }
        else{
        	console.log('Dn kanw tpt!');
        }
}

