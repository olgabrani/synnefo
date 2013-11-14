var wizard = $('#sshkeys-wizard');
$(document).ready(function(){
	generateArea = wizard.find('.generate-key-area');
	generateBtn = wizard.find('.generate-key-btn');
	importArea = wizard.find('.import-key-area');
	importBtn = wizard.find('.import-key-btn');
	editBtn = wizard.find('.edit');
	importCloseBtn = importArea.find('.buttons a');
	generateCloseBtn = generateArea.find('.buttons a');

	generateBtn.click(function(e) {
		e.preventDefault();
		if(!generateArea.is(':visible')) {
			// set the right color to the buttons
			$(this).addClass('current');
			$(this).siblings('a').removeClass('current');

			if(importArea.is(':visible')) {
				importArea.stop().fadeOut(200, function() {
				generateArea.stop().slideDown();
				});
			}
			else {
				generateArea.stop().slideDown();
			}
		}
	});

	importBtn.click(function(e) {
		e.preventDefault();
		if(!importArea.is(':visible')) {
			// set the right color to the buttons
			$(this).addClass('current');
			$(this).siblings('a').removeClass('current');

			if(generateArea.is(':visible')) {
				generateArea.stop().fadeOut(200, function() {
				importArea.stop().slideDown();
				});
			}
			else {
				importArea.stop().slideDown();
			}
		}
	});

	importCloseBtn.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		importArea.slideUp();
		importBtn.removeClass('current');
	});

	generateCloseBtn.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		generateArea.slideUp();
		generateBtn.removeClass('current');
	});
})