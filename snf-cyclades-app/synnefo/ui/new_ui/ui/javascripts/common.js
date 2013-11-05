/*
* Various functions that will be used throughout all templates
* are inside ui Object
*/

ui = {};
/*
* ui.wizards get populated in vm-wizard.js
* here is the declaration only
*/
ui.wizard = {};

/* when closeEl el is clicked, its parent with class divToCloseClass slidesUp */
ui.closeDiv = function(closeEl, divToCloseClass) {
    closeEl.click(function(e){
        e.preventDefault();
        $(this).parents(divToCloseClass).slideUp('slow');
    });
}


ui.trimChars = function( str, chars) {
    if ( str.length>chars){
        return $.trim(str).substring(0, chars)+ "...";
    } else {
        return str;
    }
}

/* sets lt-sidebar height. Useful for jscrollpane scrollbar */
ui.setSidebarHeight = function(){
    var WindowHeight = $(window).height();
    var h1= WindowHeight - $('.header').outerHeight();
    var h2= $('.main').outerHeight();
    $('.lt-sidebar').height((h2>h1) ? h2 : h1);
}


/* 
* Logic for Entities actions. Present in items_list pages
* Available categories are :
*  - both/single ( for multiple entities/single entities)
*  - running/stopped ( for running/stopped entities)
*  - permanent ( for entities always active )
*/
ui.entitiesActionsEnabled = function(){
    var all = $('.snf-checkbox-checked').length;
    var running = $('.snf-checkbox-checked').parents('.container').find('.running').length;
    var stopped = $('.snf-checkbox-checked').parents('.container').find('.stopped').length;
    $('.header .main-actions li:not(.permanent) a').removeClass('active');  
    if ( (running*stopped) > 0 ){          
         $('.main-actions li.both a').addClass('active');
         $('.main-actions li.single a').removeClass('active');
    } else {
        if (running > 0) {
            $('.main-actions li.both a').addClass('active');
            $('.main-actions li.running a').addClass('active');
        } else if (stopped>0) {
            $('.main-actions li.both a').addClass('active');
            $('.main-actions li.stopped a').addClass('active');
        }
        if ( all > 1 ) {
            $('.main-actions li.single a').removeClass('active');
        }
    }
}

ui.entitiesActionsInit = function(){

    $('.entities li .more').each(function(){
        var width = $(this).parent('li').outerWidth()  + 20;
        $(this).css('width', width);
    })
    $('.entities li .img').mouseenter(function(e) {
        if ($(this).closest('.container').siblings('.more').length>0) {
            $(this).closest('.container').stop(true, true).hide();
            $(this).closest('.container').siblings('.more').stop(true, true).fadeIn(500);//stop().slideToggle(600);
        }
    });
    $('.entities li .more').mouseleave(function(e) {
        var self = this;
        $(this).stop(true, true).fadeOut(200, function() {
            $(this).siblings('.container').stop(true,true).fadeIn('fast');
        });
    });
}

/*
* In order for the editable value functionality to work, the html markup
* should be:
    <div class="editable">
        <span class="input-txt">editable value</span>
        <input type="text">
        <a href="#" class="edit">edit</a>
        <a href="#" class="save">save</a>
        <a href="#" class="cancel">cancel</a>
    </div>
*/
ui.editable = function(){

/*
* resetForm hides save and cancel buttons,
* text input and shows input-txt. resetForm does not alter
* input-txt content.
*/

    function resetForm(e, elem) {
        var el = elem.parents('.editable');
        el.find('input[type="text"]').hide();
        el.find('a.cancel, a.save').hide();
        el.find('a.edit, .input-txt').show();
    }

/* 
* showForm hides input-txt, shows save and cancel buttons and
* sets input value to input-txt content.
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

/* TODO: better overlay functionality */
ui.overlay = function() {
    $('[data-overlay-id]').click(function(e){
        e.preventDefault();
        var el = $(this);
        // main-actions a need to be active to trigger overlay
        if ( (el.parents('.main-actions').find('li a.active').length == 0) && (el.parents('.main-actions').length > 0) ) {
            return false;
        }
        var id = el.data('overlay-id');

        $('.overlay-area').fadeIn(100);
        $('body').addClass('with-overlay');
        $(id).fadeIn('slow');
        console.log(id);
        if (id=='#network-wizard') {
            $(id).find('input').first().focus();
            return false;
        }
        $(id).find('a').first().focus();
    });
}

// when user moves a vm or network icon (list view)
ui.placementByUser = function() {
    if($('.sortable').length != 0) {
        $( ".sortable" ).sortable({
            items: "> li:not(:last)",
            stop: function(event, ui) {
                $.map($(this).find('li'), function(el) {
                            return $(el).attr('data-order', $(el).index());
                        });
            }
        });

        $( ".sortable" ).disableSelection(); //i think unnecessary
    }
}

function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
}


/*
* functions concerning checkboxes and radiobuttons links
*/
ui.changeCheckboxState =function(checkbox_link) {
     $(checkbox_link).find('.snf-checkbox-unchecked, .snf-checkbox-checked').toggleClass('snf-checkbox-unchecked snf-checkbox-checked');
}

ui.changeRadiobuttonState = function(radiobtn_link) {
    $(radiobtn_link).find('span.snf-radio-unchecked, span.snf-radio-checked').toggleClass('snf-radio-unchecked snf-radio-checked');
}

ui.checkOneRadioButton = function(radiobtn_link) {
    $(radiobtn_link).closest('ul').find('span.snf-radio-checked').toggleClass('snf-radio-unchecked snf-radio-checked');
}


// toggle expand arrrow  and corresponding area
// todo: one function for all the areas we reveal
ui.expandDownArea = function(arrow_link, area) {
    var arrow_link = $(arrow_link);
    var area = $(area);
            arrow_link.find('span.snf-arrow-up, span.snf-arrow-down').toggleClass('snf-arrow-up snf-arrow-down');
            // $('.wizard-content').removeAttr('style');
            area.stop().slideToggle(600, function() {
                if (area.is(':visible')) {
                    arrow_link.find('.snf-arrow-down .snf-arrow-up').removeClass('snf-arrow-down').addClass('snf-arrow-up');
                } else {
                    arrow_link.find('.snf-arrow-down .snf-arrow-up').addClass('snf-arrow-down');
                }

            });
}

$(document).ready(function(){


    $('#hd-search .hd-icon-search').click(function(e){
        $(this).parents('.hd-search').toggleClass('hd-open');
    })

    ui.setSidebarHeight();
    ui.closeDiv($('.info .close'), '.info');
    ui.editable();
    ui.overlay();


    $("a.disabled").each(function() {
        $(this).removeAttr('href');
    });
    
    $("a.disabled").click(function(e) {
        e.preventDefault();
    });

    // checkbox: basic reaction on click (checked, unchecked)
    // see wizard
    $('.check').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        ui.changeCheckboxState(this);
    });


    $('.with-checkbox').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var checkbox = self.find('.check');
        ui.changeCheckboxState(checkbox);
    });

    $('.radio_btn').click(function(e) {
        e.preventDefault();
         var state = $(this).find('span');
         if(state.hasClass('snf-radio-unchecked')) {
            ui.checkOneRadioButton(this);
            ui.changeRadiobuttonState(this);
        }
    })

    ui.entitiesActionsInit();
    
    $('.new-btn a.current').click(function(e){
        e.preventDefault();
    })

    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    })
    $('.scroll-pane').jScrollPane();

    // $('.main .items-list .title em').each(function(){
    //     $(this).html( ui.trimChars($(this).html(), 20) );

    // })

    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    })
    $('.overlay-area').children('.close').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).parents('.overlay-area').hide();
        $(this).parents('.overlay-area').find($('.overlay-div')).hide();
        $('body').removeClass('with-overlay');
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
            tError: 'The image could not be loaded.',
            titleSrc: function(item) {
                return item.el.data('title');
            }
        }
    });

    ui.placementByUser();

    if($('#picker').length>0) {
        $('#picker').farbtastic('#color');
    };
    if($('#sb-search').length>0) {
        new UISearch( document.getElementById( 'sb-search' ) );
    }


    /* grid/list view for items-list */

    $('.view-type .list').click(function(e){
        e.preventDefault();
        $('.view-type .grid span').removeClass('current');
        $(this).find('span').addClass('current');
        $('.items-list').removeClass('small-block-grid-2 large-block-grid-3');
        $('.items-list').addClass('list-view');
    });

     $('.view-type .grid').click(function(e){
        e.preventDefault();
        $('.view-type .list span').removeClass('current');
        $(this).find('span').addClass('current');
        $('.items-list').addClass('small-block-grid-2 large-block-grid-3');
        $('.items-list').removeClass('list-view');
    });

    // set filter visible
    $('.filter-menu .filter').click(function(e) {
        e.preventDefault();
        $(this).parents('.filter-menu').toggleClass('current');
    })
})


$(window).resize(function(e){
    ui.setSidebarHeight();
    $('.scroll-pane').jScrollPane();
})
