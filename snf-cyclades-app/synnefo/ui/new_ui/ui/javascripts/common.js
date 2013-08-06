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
    var all = $('.checkbox-checked').length;
    var running = $('.checkbox-checked').parents('.container').find('.img.running').length;
    var stopped = $('.checkbox-checked').parents('.container').find('.img.stopped').length;
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

ui.setCheckedVMBgColor = function(){
    console.log('test');
    if ($('.check span').length >0) {
        $('.more_checkbox .checkbox-checked').parents('.container').addClass('set-bg');
    } else {
        $('.more_checkbox').parents('.container').removeClass('set-bg');    
    }

}


ui.VMactionsInit = function(){

    // if VM is stopped hide connect option 
    $('.vms .container .stopped').parents('.container').find('.options .connect').hide();
    
    $('.vms li .container').mouseenter(
      function (e) {
        $(this).find('.img').css('visibility','hidden');
        $(this).find('.options, .check').fadeIn('slow');
        $(this).addClass('set-border');
        $(this).find('.editable input').show();
        $(this).find('.editable em').hide();
        $(this).find('.visible-info em').each(function(){
            var emLeft = $(this).position();
            $(this).animate({
            left: -emLeft.left,
            }, 'slow');        
        }) 
      }
    );

    $('.vms li .container').mouseleave(
        function(e){
            $(this).removeClass('set-border');
            $(this).find('.img').css('visibility','visible');
            $(this).find('.options').hide(); 
            $(this).find('.custom_checkbox:not(.checkbox-checked)').parents('.check').hide();
            $(this).find('.editable input').hide();
            $(this).find('.editable em').show();
            $(this).find('.visible-info em').each(function(){
                $(this).removeAttr('style');   
            }) 
         }
    );

    $('.vms .container .check').click(function(e){
        e.preventDefault();

        var checkbox = $(this).find('.custom_checkbox');

        checkbox.toggleClass('checkbox-checked');
        
        if(checkbox.hasClass('checkbox-checked')){
            checkbox.html('b');
            $(this).parents('.container').addClass('set-bg');
        }
        else{
            checkbox.html('a'); 
            $(this).parents('.container').removeClass('set-bg');
            $(this).hide();
      
        }

        // in any case, hide extra options and reset positions to normal
        $(this).parents('.container').removeClass('set-border');
        $(this).parents('.container').find('.img').css('visibility','visible');
        $(this).parents('.container').find('.options').hide(); 
        $(this).parents('.container').find('.visible-info em').removeAttr('style');

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