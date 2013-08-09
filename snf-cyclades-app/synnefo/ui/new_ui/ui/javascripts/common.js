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
    var running = $('.checkbox-checked').parents('.container').find('.running').length;
    var stopped = $('.checkbox-checked').parents('.container').find('.stopped').length;
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


ui.EntitiesActionsInit = function(){

    // if VM is stopped hide connect option 
    $('.vms .container .stopped').parents('.container').find('.options .connect').hide();
    
    $('.entities li .container').mouseenter(
      function (e) {
        $(this).find('.img').stop(true, true).fadeOut({
            'duration':200,
        });
        $(this).find('.options, .check').stop(true, true).addClass('active');
        $(this).find('.options').stop(true, true).fadeIn(500); 
        $(this).stop(true, true).addClass('set-border');
        $(this).find('.visible-info em').stop(true, true).each(function(){
            var emLeft = $(this).position();
            $(this).animate({
            left: -emLeft.left,
            }, 300);        
        }) 
      }
    );

    $('.entities li .container').mouseleave(
        function(e){
            $(this).stop(true, true).removeClass('set-border');
            $(this).find('.options').stop(true, true).fadeOut(200); 
            $(this).find('.img').stop(true, true).fadeIn('slow');
            $(this).find('.custom_checkbox:not(.checkbox-checked)').parents('.check').stop(true, true).removeClass('active');
            $(this).find('.visible-info em').stop(true, true).each(function(){
                $(this).animate({
                 left: 0,
                }, 300);        
            }) 
         }
    );

    $('.entities .container .check').click(function(e){
        e.preventDefault();

        var checkbox = $(this).find('.custom_checkbox');

        checkbox.toggleClass('checkbox-checked');
        
        if(checkbox.hasClass('checkbox-checked')){
            checkbox.html('b');
            $(this).parents('.container').addClass('set-bg');
            $(this).addClass('active');
        }
        else{
            checkbox.html('a'); 
            $(this).parents('.container').removeClass('set-bg');
            
      
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

    
    if ($('.overlay').length >0 ){
        $('body').addClass('with-overlay');
    }

    $('.new-btn a.current').click(function(e){
        e.preventDefault();
    })

    ui.EntitiesActionsInit();

    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    })
    //$('.scroll-pane').jScrollPane();

    // TODO: more general function
    $('.has-overlay a').click(function(e){
        e.preventDefault();
        if ($(this).hasClass('active')){
            $('.content').append('<div class="overlay-modal overlay"><a href="vm_list_v1.html" class="close" title="cancel vm creation">close</a></div>');
            $($(this).parents('.has-overlay').data('overlay-id')).fadeIn('slow');
        }
    })


    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    })



})

$(window).resize(function(e){
    ui.setSidebarHeight();
    $('.scroll-pane').jScrollPane();
})