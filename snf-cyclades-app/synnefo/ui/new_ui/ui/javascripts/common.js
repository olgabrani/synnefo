ui = {};


ui.closeDiv = function(closeEl, divToCloseClass) {
	closeEl.click(function(e){
		e.preventDefault();
		$(this).parents(divToCloseClass).slideUp('slow');
	});
}


// set lt-sidebar height 
ui.setSidebarHeight = function(){
	var WindowHeight = $(window).height();
	var h1= WindowHeight - $('.header').outerHeight();
	var h2= $('.main.details').outerHeight();
	if (h2>h1) {
		var ltSidebarHeight = h2;
	} else {
		var ltSidebarHeight = h1;
	}
	$('.lt-sidebar').height(ltSidebarHeight);
}

ui.cntCheckbox = function(){ 
	var all = $('.options .checkbox-checked').length;
	var running = $('.options .checkbox-checked').parents('.container').find('.img.running').length;
	var stopped = $('.options .checkbox-checked').parents('.container').find('.img.stopped').length;
    $('.header .main-actions li a').removeClass('active');  
    if ( (running*stopped) > 0 ){          
         $('.header .main-actions li.both a').addClass('active');   
         $('.header .main-actions li.single a').removeClass('active');   
    } else {
        if (running > 0) {
         	$('.header .main-actions li.both a').addClass('active');   
         	$('.header .main-actions li.running a').addClass('active');   
        } else if (stopped>0) {
        	$('.header .main-actions li.both a').addClass('active');   
        	$('.header .main-actions li.stopped a').addClass('active');   

        } else {

        }
        if ( all > 1 ) {
        	$('.header .main-actions li.single a').removeClass('active');   
        }

    }
}
ui.VMactionsInit = function(){

	// if VM is stopped hide connect option 
	$('.vms li .container .stopped').parents('.container').find('.options .connect').hide();

	var vm_container = $('.vms li .container');
	var vm_img = vm_container.find('.img-wrap');

	vm_img.mouseenter(
      function (e) {
        $(this).parents('.container').find('.options').slideDown();
      }
    );

    $('li .container .options').mouseleave(
        function(e){
        	var checkbox = $(this).find('.custom_checkbox');

	        if (checkbox.hasClass('checkbox-checked')){
	            checkbox.parents('.container').find('.more_checkbox').html(checkbox.clone());
	            
	        } else {
	        	 checkbox.parents('.container').find('.more_checkbox').html('');
	        }
            $('li .container .options').hide();
            
            
        }
    );

    $('li .container .check').click(function(e){
        e.preventDefault();
        var checkbox = $(this).find('.custom_checkbox');

        checkbox.toggleClass('checkbox-checked');
        
        if(checkbox.hasClass('checkbox-checked')){
            checkbox.html('b');
        }
        else{
            checkbox.html('a'); 
      
        }
        ui.cntCheckbox();
    })
}


$(document).ready(function(){

	ui.closeDiv($('.info .close'), '.info');
	ui.closeDiv($('.dummy-navigation .close'), '.dummy-navigation');

	$('.dummy-navigation .our').click(function(e){
		e.preventDefault();
		$('.ours.'+$(this).data('our')).toggle();
		$(this).toggleClass('open');
	});

	ui.setSidebarHeight();
	$('.select-os li').click(function(e){
		$('.select-os li').removeClass('selected');
		$(this).addClass('selected');
	})

	$('.select-flavor dl span').click(function(e){
		console.log('test');
		$(this).parents('dl').find('span').removeClass('current');
		$(this).addClass('current');
	})

	if ($('.overlay').length >0 ){
		$('body').addClass('with-overlay');
	}

	$('.new-btn a.current').click(function(e){
		e.preventDefault();
	})

	ui.VMactionsInit();
	$('.main-actions li a').click(function(e){
		if (!($(this).hasClass('active'))) {
			e.preventDefault();
		}
	})

})

$(window).resize(function(e){
	ui.setSidebarHeight();

})