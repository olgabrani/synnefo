ui = {};


ui.closeDiv = function(closeEl, divToCloseClass) {
	closeEl.click(function(e){
		e.preventDefault();
		$(this).parents(divToCloseClass).slideUp('slow');
	});
}


// set lt-sidebar height 
ui.setSidebarHeight = function(){
	WindowHeight = $(window).height();
	ltSidebarHeight = WindowHeight - $('.header').outerHeight();
	$('.lt-sidebar').height(ltSidebarHeight);
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

})

$(window).resize(function(e){
	ui.setSidebarHeight();

})