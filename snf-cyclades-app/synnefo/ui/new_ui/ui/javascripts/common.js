ui = {};

ui.snf = function(closeEl, divToCloseClass) {
	closeEl.click(function(e){
		e.preventDefault();
		$(this).parents(divToCloseClass).slideUp('slow');
	});
}

$(document).ready(function(){

	ui.snf($('.info .close'), '.info');
	ui.snf($('.dummy-navigation .close'), '.dummy-navigation');

	$('.dummy-navigation .our').click(function(e){
		e.preventDefault();
		$('.ours.'+$(this).data('our')).toggle();
		$(this).toggleClass('open');
	})

})