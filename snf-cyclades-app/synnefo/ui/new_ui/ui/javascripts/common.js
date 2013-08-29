ui = {};





ui.closeDiv = function(closeEl, divToCloseClass) {
    closeEl.click(function(e){
        e.preventDefault();
        $(this).parents(divToCloseClass).slideUp('slow');
    });
}



ui.trimChars = function( str, chars) {
    if ( str.length>chars){
        return jQuery.trim(str).substring(0, chars).split(" ").slice(0, -1).join(" ") + "...";
    } else {
        return str;
    }
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
    $('.header .main-actions li:not(.permanent) a').removeClass('active');  
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

    if ($('.check span').length >0) {
        $('.more_checkbox .checkbox-checked').parents('.container').addClass('set-bg');
    } else {
        $('.more_checkbox').parents('.container').removeClass('set-bg');    
    }

}


ui.entitiesActionsInit = function(){

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
    $('.entities li .details').mouseenter(function (e) {
        $(this).parents('.container').find('.info-box').show();
    }) 
      
    $('.entities li .details').mouseleave(function (e) {
        $(this).parents('.container').find('.info-box').hide();
    })   
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
   
}

ui.editable = function(){

/*
resetForm hides save and cancel buttons, 
text input and shows input-txt. resetForm does not alter 
input-txt content.
*/

    function resetForm(e, elem) {
        var el = elem.parents('.editable');
        el.find('input[type="text"]').hide();
        el.find('a.cancel, a.save').hide();
        el.find('a.edit').show();
        el.find('.input-txt').show();
    }

/* 
showForm hides input-txt, shows save and cancel buttons and
set input value to input-txt content.
*/
    function showForm(e,elem) {
        e.stopPropagation(); 
        e.preventDefault();
        var el = elem.parents('.editable'); 
        el.find('input[type="text"]').val(el.find('.input-txt').html());
        el.find('input[type="text"]').show();
        el.find('a.cancel, a.save').show();
        elem.hide();
        el.find('.input-txt').hide();

    }

/*
setValue sets input-txt value to the input value.
Makes sure that the input value is not empty.
TODO:
Ajax request to submit form
*/

    function setValue(elem) {
        var el = elem.parents('.editable');
        if( el.find('input[type="text"]').val() ) {
            el.find('.input-txt').html(el.find('input[type="text"]').val());
        }
    }


    $('.editable .edit').click(function(e){
        showForm(e, $(this));
    })

    $('.editable .cancel').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        resetForm(e, $(this));
    })

    $('.editable .save').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        setValue($(this));
        resetForm(e, $(this));

    })


    $('.editable input[type="text"]').click(function(e){
        e.stopPropagation();
    })

    $('.editable input[type="text"]').keyup(function(e){
        if(e.keyCode == 13) { 
            setValue($(this));
            resetForm(e, $(this));
            
        }
    
    })

    $('html').click(function(e) {
        resetForm(e, $('.editable a.cancel'));
    });

}

ui.overlay = function() {
    $('[data-overlay-id]').click(function(e){
        e.preventDefault();
        var el = $(this);

        // main-actions a need to be active to trigger overlay
        if ( (el.parents('.main-actions').find('li a.active').length == 0) && (el.parents('.main-actions').length > 0) ) {
            return false;
        }
        var id = el.data('overlay-id');
        $('.overlay-area').show();
        $(id).slideDown('slow');


    });


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

    ui.entitiesActionsInit();
    ui.editable();
    ui.overlay();

    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    })
    $('.scroll-pane').jScrollPane();





    $('.main .items-list .title em').each(function(){
        $(this).html( ui.trimChars($(this).html(), 22) );

    })

    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    })
    $('.overlay-area .close').click(function(e){
        e.preventDefault();
        $(this).parents('.overlay-area').hide();
        $(this).parents('.overlay-area').find($('[data-overlay-id]')).hide();
    })

    $('.browse-files').click(function(e){
        e.preventDefault();
    })

    Dropzone.options.filesDropzone = {
        dictDefaultMessage:'',
        clickable: '.browse-files',
        previewsContainer: '.dropzone-files',
        createImageThumbnails: false,
        dictRemoveFile: "snf-Remove file",
    };


    $('.main .files').magnificPopup({
        delegate: 'a.show.image',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.data('title');
            }
        }
    });

})


$(window).resize(function(e){
    ui.setSidebarHeight();
    $('.scroll-pane').jScrollPane();
})