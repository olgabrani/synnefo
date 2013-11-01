var wizard = $('#overlay3');
$(document).ready(function(){
	generateArea =wizard.find('.generate-key-area');
	generateBtn =wizard.find('.generate-key-btn');
	importArea =wizard.find('.import-key-area');
	importBtn =wizard.find('.import-key-btn');
	generateBtn.click(function(e) {
		e.preventDefault();
		generateBtn.toggleClass('current');
		if(importArea.is(':visible')) {
			importArea.stop().stop().fadeOut(200, function() {
				generateArea.stop().fadeIn();	
				
			});	
		}
		else {
			generateArea.stop().slideToggle();
		}
		// if(generateArea.is(':visible')){
		// 	generateBtn.addClass('current');
		// 	importBtn.removeClass('current');
		// }
		// else {
		// 	generateBtn.removeClass('current');
		// }
	});
	importBtn.click(function(e) {
		e.preventDefault();
		importBtn.toggleClass('current');
		if(generateArea.is(':visible')) {
			generateArea.stop().fadeOut(200, function() {

				importArea.stop().fadeIn();	
			});	
		}
		else {
			importArea.stop().slideToggle();
		}
		// if(importArea.is(':visible')) {
		// 	importBtn.addClass('current');
		// 	generateBtn.removeClass('current');
		// }
	})
})