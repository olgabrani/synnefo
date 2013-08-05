$(document).ready(function(){
    var select_flavor =0;
    $('.select-flavor dl span').click(function(e){
        e.preventDefault();
        $(this).parents('dl').find('span').removeClass('current');
        $(this).addClass('current');
        if(select_flavor == 1){
        	$('.lt-sidebar').find('a.choosen_flavor').removeClass('choosen_flavor');
        	select_flavor = 0;
        }
    });

	/* function that determines which values are included to small, medium and large flavor */




	/* if a predefined flavor has been selected from the user, it highlights the proper resources */

	$('.lt-sidebar li a.flavor_selection').click(function(e){
		e.preventDefault();
		select_flavor = 1;
		var classes = $(this).attr('class').split(" ");
		// the second class is: small_flavor or medium_flavor or large_flavor
		
		$(this).parent('li').siblings('li').find('a.choosen_flavor').removeClass('choosen_flavor');
		$(this).addClass('choosen_flavor');
		$('.select-flavor').find('dl span.current').removeClass('current');
		$('.select-flavor').find('.'+classes[1]).addClass('current');

	});


   
});

