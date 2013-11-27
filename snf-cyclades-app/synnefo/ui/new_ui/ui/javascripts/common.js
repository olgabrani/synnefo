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


/* Sets element min-height
* Used for .details, .lt-bar divs
*/
ui.setElminHeight = function(el){
    var WindowHeight = $(window).height();
    var header = $('.header').outerHeight();
    var actions = $('.actions-bar').height();
    var h1= WindowHeight - (header+actions);
    el.css('min-height', h1);
}

/* Sets element height
* Used for .details, .lt-bar divs
*/
ui.setElHeight = function(el){
    var WindowHeight = $(window).height();
    var header = $('.header').outerHeight();
    var actions = $('.actions-bar').height();
    var h1= WindowHeight - (header+actions);
    el.css('height', h1);
}

/* 
* Logic for Entities actions. Present in items_list pages
* Available categories are :
*  - both/single ( for multiple entities/single entities)
*  - running/off ( for running/off entities)
*  - permanent ( for entities always active )
*/
ui.entitiesActionsEnabled = function(){
    var all = $('.snf-checkbox-checked').length;
    var running = $('.snf-checkbox-checked').parents('li.running').length;
    var off = $('.snf-checkbox-checked').parents('li.off').length;
    console.log(off, 'actions here');
    $('.lt-bar .lt-actions li:not(.permanent) a').removeClass('active');
    if ( (running*off) > 0 ){
         $('.lt-actions li.both a').addClass('active');
         $('.lt-actions li.single a').removeClass('active');
    } else {
        if (running > 0) {
            $('.lt-actions li.both a').addClass('active');
            $('.lt-actions li.running a').addClass('active');
        } else if (off>0) {
            $('.lt-actions li.both a').addClass('active');
            $('.lt-actions li.off a').addClass('active');
        }
        if ( all > 1 ) {
            $('.lt-actions li.single a').removeClass('active');
        }
    }
}

ui.inactiveActions = function() {

    // Availble actions: connect, reboot, shut, destroy, start
    // These actions will be DISABLED
    var statesActions ={
        'off'      : ['connect', 'reboot', 'shut'],
        'error'    : ['connect', 'reboot', 'shut', 'start'],
        'building' : ['reboot', 'start'],
        'running'  : ['start'],
        'rebooting': ['start'],
        'starting' : ['start'],
        'shutting' : ['connect', 'reboot', 'shut']
    } ;

    _.each (statesActions, function(val, key) {
        _.each(val, function(value) {
            var el = '.' + key + ' .' + value;
            $(el).addClass('inactive');
        });
    })
}

ui.detailsCustom = function(area) {
    // position last connected item
    var el = area.find('.item').last();
    // -2 is the border width;
    var moveY = el.find('.connections >li').last().outerHeight(true) - 2;
    el.css('top',moveY);
    el.css('marginTop', -moveY);
}

ui.firewallSetup = function(){
    $('.firewall').each(function(){
        $(this).removeClass('fully unprotected basic');
        $(this).addClass($(this).data('firewall'));
        if($(this).hasClass('unprotected')){
            $(this).find('p').first().find('em').html('off');
        } else {
            $(this).find('p').first().find('em').html('on');
        }
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
        // not sure if we want to hide the error window after every click in the ui
        if($('.communication-error').css('bottom') == '0px') {
            $('.communication-error').animate({bottom: "-151px"});
        }
    });

}

/* TODO: better overlay functionality */
ui.overlay = function() {
    $('[data-overlay-id]').click(function(e){
        e.preventDefault();
        var el = $(this);
        var id = '#'+el.data('overlay-id');

        $('.overlay-area-custom').fadeIn(100);
        $('body').addClass('with-overlay');
        $(id).fadeIn('slow');
        if (id=='#network-wizard') {
            $(id).find('input').first().focus();
            return false;
        }
        $(id).find('a').first().focus();
    });
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
    ui.entitiesActionsEnabled();
}

// to use the above functions use first the ui.checkOneRadioButton and then ui.changeRadiobuttonState
ui.checkOneRadioButton = function(radiobtn_link) {
    $(radiobtn_link).closest('ul').find('span.snf-radio-checked').toggleClass('snf-radio-unchecked snf-radio-checked');
}
ui.changeRadiobuttonState = function(radiobtn_link) {
    $(radiobtn_link).find('span.snf-radio-unchecked, span.snf-radio-checked').toggleClass('snf-radio-unchecked snf-radio-checked');
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


/* Tabs functionality
* tabsEl is the div/ul with the links to the sections and the sections that
* with toggle have class sectionEl.
* Markup needed is an href to each a with the id of the relative section.
*/

ui.tabsSection = function(link, sectionEl) {
    $(sectionEl).hide();
    var el = $(link.attr('href'));
    el.stop(true, true).show(0);
    el.css('opacity',0);
    ui.detailsCustom(el);
    el.animate({
        'opacity':1,
    }, 500)
}

ui.tabs = function(tabsEl, sectionEl) {
    var tabLink = tabsEl.find('a');
    ui.replaceClass(tabLink.find('.active'), 'outline', 'full');
    function href(a) {
        return a.attr('href');
    }
    tabLink.click(function(e){
        e.preventDefault();
        if ( $(this).hasClass('active')){
             return false;
        } else {
            window.location.hash = $(this).attr('href');
            ui.replaceClass($(this).parents(tabsEl).find('.active'), 'full', 'outline');
            $(this).parents(tabsEl).find('a').removeClass('active');
            $(this).addClass('active');
            ui.replaceClass($(this), 'outline', 'full');
            ui.tabsSection( $(this), sectionEl);
        }
    })
}

// the function replaces part of the class of a span that is placed inside an a element
ui.replaceClass = function(elements, str1, str2) {
    $.each($(elements), function() {
        classOld = $(this).find('span').attr('class');
        if(classOld != undefined && classOld.indexOf(str1) != -1) {
            var classNew =classOld.replace(str1, str2);
            if(classOld.indexOf(' ') == -1) {
                $(this).find('.'+classOld).removeClass(classOld).addClass(classNew);
            }
            else {
                var classToReplace;
                if(classOld.indexOf(' ') > classOld.indexOf(str1)) {
                    classToReplace = classOld.substring(0,classOld.indexOf(' '));

                }
                else {

                    classToReplace = classOld.substring(classOld.indexOf(' ')+1, classOld.indexOf(str1)+str1.length);
                }

                if($(this).find('.'+classToReplace).hasClass(classOld)) {
                    console.log('classToReplace ', classToReplace)
                       $(this).find('.'+classToReplace).removeClass(classToReplace).addClass(classNew);
                }
            }
        }
    });
}

// in a page with tabs, allow navigation with hash tags
ui.hashTabs = function(tabsEl, sectionEl){
    var hash = window.location.hash;
    if ($(hash).length<=0){
        return;
    }
    tabsEl.find('a').removeClass('active');
    var link = tabsEl.find('a[href="'+hash+'"]');
    link.addClass('active');
    ui.tabsSection(link, sectionEl);

}

ui.ltBarToggle = function(){
    var cmarg = parseInt($('.lt-bar').width()) - parseInt($('.toggle-lt-bar').outerWidth(true));        

    $('.toggle-lt-bar').click(function(e){
        e.preventDefault();
        var self =this;
        if($(this).hasClass('fix-position')) {
            var marg = parseInt($(self).css('marginLeft')) - cmarg;
            $(this).animate({
                'margin-left': marg,
            }, 300, 'linear', function(){
                $(self).removeAttr('style');
                $(self).removeClass('fix-position');
            });
            $('.lt-bar').animate({
                width: 'toggle'
            }, 400, 'linear');
        }
        else {
            $(this).addClass('fix-position');
            var marg = parseInt($(self).css('marginLeft')) + cmarg;
            $(this).animate({q
                'margin-left': marg,
            }, 500, 'linear')
            $('.lt-bar').animate({
                width: 'toggle'
            }, 400, 'linear');
        }
    });
}


$(document).ready(function(){

    if($('.vms.entities').length!=0){
        ui.inactiveActions();
    };
    ui.setElminHeight($('.main > .details'));
    ui.setElminHeight($('.lt-bar'));
    ui.setElHeight($('.scroll-wrap'));
    $('#hd-search .hd-icon-search').click(function(e){
        var that = this;
        $(this).parents('.hd-search').toggleClass('hd-open');
        if ($(this).parents('.hd-search').hasClass('hd-open')) {
            $(that).parents('.hd-search').find('input[type="search"]').focus();
        } else {
            $(that).parents('.hd-search').find('input[type="search"]').val('');
        }
    })

    $('.header .login').mouseenter(function(e){
        $(this).find('ul').stop(true, true).slideDown(200);
    });
    $('.header .login').mouseleave(function(e){
        $(this).find('ul').stop(true, true).slideUp(200);
    });

    $('.entities a').click(function(){
        if ($(this).attr('data-reveal-id') && !($(this).hasClass('inactive'))) {
            $('.entities li .more').hide();
        }
    });

    $('.inactive').click(function(e){
        e.stopPropagation();
        e.preventDefault();
     })


    $('.lt-actions a:not(.active)').click(function(e){
        e.preventDefault();
    })

    if ($('.entities .items-list >li').length == 1) {
        $('.overlay-wrapper').addClass('no-vm');
    };
    $('.entities li .more').each(function(){
        var width = $(this).parent('li').outerWidth()  + 20;
        $(this).css('width', width);
    });

    $('.items-list li .img-wrap').on("mouseenter", function(e) {
        var that = this;
        if ($(this).parents('.entities').hasClass('grid-view')) {
            if ($(that).parent('.container').siblings('.more').length>0) {
                $(that).parent('.container').fadeOut(50,'easeInCirc');
                $(that).parent('.container').siblings('.more').fadeIn(150,'easeInCirc');
            }
        }
    });
    $('.entities li .more').mouseleave(function(e) {
        $(this).fadeOut(50, function() {
            $(this).siblings('.container').fadeIn(50);
        });
    });
    $('.grid-view .items-list > li').mouseleave(function(e){
        var that = this;
        setTimeout(function(){
            $(that).find('.more').fadeOut(200, function() {
                $(this).siblings('.container').fadeIn('fast');
            });
        },50)
    });

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
    });

    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    });

    $('.main-actions li a').click(function(e){
        if (!($(this).hasClass('active'))) {
            e.preventDefault();
        }
    });
    $('.overlay-area-custom').children('.close').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).parents('.overlay-area-custom').hide();
        $(this).parents('.overlay-area-custom').find($('.overlay-div')).hide();
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

    if($('#picker').length>0) {
        $('#picker').farbtastic('#color');
    };
    if($('#sb-search').length>0) {
        new UISearch( document.getElementById( 'sb-search' ) );
    }

    if ($('.toggle-lt-bar').length>0) {
        ui.ltBarToggle();
    }

    /* grid/list view for items-list */

    $('.view-type .list').click(function(e){
        e.preventDefault();
        $('.view-type .grid span').removeClass('current');
        $(this).find('span').addClass('current');
        $('.entities').removeClass('grid-view');
        $('.entities').addClass('list-view');
    });

     $('.view-type .grid').click(function(e){
        e.preventDefault();
        $('.view-type .list span').removeClass('current');
        $(this).find('span').addClass('current');
        $('.entities').addClass('grid-view');
        $('.entities').removeClass('list-view');
    });

     $('.lt-bar .select').click(function(e){
        $(this).find('span').toggleClass('snf-checkbox-checked snf-checkbox-unchecked');
        $(this).find('em').toggle();
        if ( $(this).find('span').hasClass('snf-checkbox-unchecked')){
            $('.list-view  li .check span').removeClass('snf-checkbox-checked');
            $('.list-view  li .check span').addClass('snf-checkbox-unchecked');
        } else {
            $('.list-view  li .check span').addClass('snf-checkbox-checked');
            $('.list-view  li .check span').removeClass('snf-checkbox-unchecked');
        }
        ui.entitiesActionsEnabled();
     });

    // set filter visible
    $('.filter-menu .filter').click(function(e) {
        e.preventDefault();
        $(this).parents('.filter-menu').toggleClass('current');
    });

    // temp function used to demonstrate the visual effect of the building state of vm
    $('[data-status="building"] .btn5.temp').click(function(e) {
        e.preventDefault();
        $(this).siblings('.container').find('.complete').toggleClass('build-progress');
    });

    $('[data-status="rebooting"] .btn5.temp').click(function(e) {
        e.preventDefault();
        $(this).siblings('.container').find('.snf-pc-full').toggleClass('reboot-progress');
    })

    // //temp function to preventDefault of links in modal
    // $('.reveal-modal a:not(".close-reveal-modal, .generate-key-btn, .import-key-btn")').click(function(e){
    //     e.preventDefault();
    //     $('a.close-reveal-modal').trigger('click');
    // });

     // temp btn to show communication error message
    $('.temp-for-btns .communication-error-btn').click(function(e) {
         e.preventDefault();
         e.stopPropagation();
         $('.communication-error').animate({bottom: "0px"});
     });

    $('.communication-error a').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.communication-error').animate({bottom: "-151px"});

    });
    $('.communication-error').click(function(e) {
        e.stopPropagation();
    });

    $('.show-add-tag').click(function(e) {
    e.preventDefault();
    $(this).parents('.tags-area, .tags').find('.snf-color-picker').slideDown('slow', function() {
        $('#hide-add-tag-dummy').scrollintoview({
            'duration': 'slow'
        });
    });
    ui.colorPickerVisible = 1;
    });

    $('.hide-add-tag').click(function(e) {
    e.preventDefault();
    $(this).parents('.tags-area, .tags').find('.snf-color-picker').slideUp(400, function() {
        $('.show-add-tag').first().scrollintoview({
            'duration': 'slow'
        });
        ui.colorPickerVisible = 0;
    });
    });

    // connected details js
    ui.detailsCustom($('#disk-connected'));
    ui.detailsCustom($('#network-connected'));
    ui.detailsCustom($('#vm-connected'));
    ui.firewallSetup();
    $('.firewall .more  a').click(function(e){
        e.preventDefault();
        if ($(this).find('span').hasClass('snf-radio-checked')) {
            return false;
        }
        $(this).parents('.firewall').removeAttr('data-firewall');
        $(this).parents('.firewall').data('firewall', $(this).parent().attr('class'));
        $(this).find('span').toggleClass('snf-radio-unchecked snf-radio-checked');
        $(this).parent('p').siblings('p').find('span').removeClass('snf-radio-checked');
        $(this).parent('p').siblings('p').find('span').addClass('snf-radio-unchecked');
         ui.firewallSetup();
    });
    $('.firewall').mouseenter(function(e){
        $(this).css('z-index',2);
        $(this).find('.more').stop(true, true).slideDown(200);
    });
    $('.firewall').mouseleave(function(e){
        $(this).css('z-index',1);
        $(this).find('.more').stop(true, true).slideUp(200);
    });
    ui.tabs($('.tabs'), $('.content'));
    ui.hashTabs($('.tabs'), $('.content'));

    $('.act').click(function(e) {
        $(this).addClass('pending last');
    });

    $('.remove .cancel').click(function(e) {
        e.preventDefault();
        $('a.close-reveal-modal').trigger('click');
        $('.last').removeClass('pending last');
    });

    $('.remove .ok').click(function(e) {
        e.preventDefault();
        $('a.close-reveal-modal').trigger('click');
        var connection_img = $('.connections').find('.last');
        connection_img.addClass('open', 0);
        connection_img.removeClass('last');
        var img = connection_img.closest('.item').find('.img-wrap .snf-font');
        img.addClass('reboot-progress');
        setTimeout(function() {
            var connections_list = connection_img.closest('.connections').children('li:not(".hidden")');
            if(connections_list.length>1) {
                connection_img.closest('li').slideUp(function(){
                    connection_img.closest('li').addClass('hidden');
                    if(connections_list.find('.pending').length == 0) {
                      img.removeClass('reboot-progress');
                    }
                });
            }
            else {
                connection_img.closest('.item').slideUp(function(){
                    img.closest('li').addClass('hidden');
                    img.removeClass('reboot-progress');
                    img.removeClass('reboot-progress');
                });
            }
            connection_img.removeClass('pending');
        }, 3000)
    });
    // end of connected details js

    ui.replaceClass($('a.current, a.active'), 'outline', 'full');

    $('.delete').click(function(e) {
        e.preventDefault();
        $(this).closest('div').fadeOut('slow');
    })
})


$(window).resize(function(e){
    ui.setElminHeight($('.main > .details'));
    ui.setElminHeight($('.lt-bar'));
    ui.setElHeight($('.scroll-wrap'));
})