/*
* These functions are used throughout ember
*/

_.mixin({
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});


em = {};




/* ---------------------- */
/* END OF EMBER FUNCTIONS */




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
ui.checkbox = {};
ui.radiobtn = {};

/* when closeEl el is clicked, its parent with class divToCloseClass slidesUp */
ui.closeDiv = function(closeEl, divToCloseClass) {
    closeEl.click(function(e){
        e.preventDefault();
        $(this).parents(divToCloseClass).slideUp('slow');
    });
};


ui.trimChars = function( str, chars) {
    if ( str.length>chars){
        return $.trim(str).substring(0, chars)+ "...";
    } else {
        return str;
    }
};


/* Sets element min-height
* Used for .details, .lt-bar divs
*/
ui.setElminHeight = function(el){
    var WindowHeight = $(window).height();
    var header = $('.header').outerHeight();
    var actions = $('.actions-bar').height();
    var h1= WindowHeight - (header+actions);
    el.css('min-height', h1);
};

/* Sets element height
* Used for .details, .lt-bar divs
*/
ui.setElHeight = function(el){
    var WindowHeight = $(window).height();
    var header = $('.header').outerHeight();
    var actions = $('.actions-bar').height();
    var h1= WindowHeight - (header+actions);
    el.css('height', h1);
};

/* Sets element max-height
* Used for div.storage-progress
*/
ui.setElmaxHeight = function(el){
    var WindowHeight = $(window).height();
    var header = $('.header').outerHeight();
    var actions = $('.actions-bar').height();
    var h1= WindowHeight - (header+actions);
    el.css('max-height', h1);
};

/* 
* Logic for Entities actions. Present in items_list pages
* Available categories are :
*  - both/single ( for multiple entities/single entities)
*  - running/off ( for running/off entities)
*  - permanent ( for entities always active )
* Can be used for pithos as well
* Available categories are :
* - files ( for files only actions)
* - folders ( for folders only actions)
* - all ( for files/folders actions)
*/
ui.entitiesActionsEnabled = function(){
    var all = $('.snf-checkbox-checked').length;
    var running = $('.snf-checkbox-checked').parents('li.running').length;
    var off = $('.snf-checkbox-checked').parents('li.off').length;
    var files = $('.snf-checkbox-checked').parents('li.file').length;
    var folders = $('.snf-checkbox-checked').parents('li.folder').length;

    console.log(files,'files');
    console.log(folders,'folders');

    $('.lt-bar .lt-actions li:not(.permanent) a').removeClass('active');

    if ( ( files * folders )>0 ) {
        $('.lt-actions li.all a').addClass('active');
    } else {
        if ( files>0 ) {
            $('.lt-actions li.files a').addClass('active');
        }
        if ( folders>0 ){
            $('.lt-actions li.folders a').addClass('active');
        }
    }

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
};

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
    });
};

ui.detailsCustom = function(area) {
    // position last connected item
    var el = area.find('.item').last();
    // -2 is the border width;
    var moveY = el.find('.connections >li').last().outerHeight(true) - 2;
    el.css('top',moveY);
    el.css('marginTop', -moveY);
};

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
};




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
};

function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
}


// toggle expand arrrow  and  area
// todo: one function for all the areas we reveal
ui.expandDownArea = function(arrow_link, area) {
    var arrow = $(arrow_link);
    arrow.find('span.snf-arrow-up, span.snf-arrow-down').toggleClass('snf-arrow-up snf-arrow-down');
    // $('.wizard-content').removeAttr('style');
    $(area).stop().slideToggle(600, function() {
        if ($(area).is(':visible')) {
            arrow.find('.snf-arrow-down .snf-arrow-up').removeClass('snf-arrow-down').addClass('snf-arrow-up');
        } else {
            arrow.find('.snf-arrow-down .snf-arrow-up').addClass('snf-arrow-down');
        }

    });
};

// toggle checkbox and area
ui.slideHiddenArea = function(checkbox_link, area) {
    area.stop().slideToggle(400, function() {
        if (area.is(':visible')) {
            ui.checkbox.check(checkbox_link);
        } else {
           ui.checkbox.uncheck(checkbox_link);
        }
    });
};


// the function replaces part of the class of a span that is placed inside an a element
// the class is a word with the form : firstSubStr+*+str1 and it will be converted to: firstSubStr+*+str2
// it must be uniquely recognized by the firstSubStr and the str1.

ui.replaceClass = function(elements, str1, str2, firstSubStr) {
    $.each($(elements), function() {
        var classOld = $(this).find('span').attr('class');
        var classNew;
        if(classOld !== undefined && classOld.indexOf(str1) != -1) {
            if(classOld.indexOf(' ') == -1) {
                classNew = classOld.replace(str1, str2);
                $(this).find('.'+classOld).removeClass(classOld).addClass(classNew);
            }
            else {
                // the string starts with the firstSubStr and after the end of the word there's a space
                var expr1 = new RegExp('^'+firstSubStr+'+(\\S*)+'+str1+'+(\\s+)', 'g');

                // the word is between spaces
                var expr2 = new RegExp('(\\s+)'+firstSubStr+'+(\\S*)+'+str1+'+(\\s+)', 'g');

                // before the word there's at least one space and the string ends with this word
                var expr3 = new RegExp('(\\s+)'+firstSubStr+'+(\\S*)+'+str1+'$', 'g');

                // spaces all over the string
                var spacesExp = new RegExp('\\s+', 'g');

                if(classOld.match(expr1) !== null) {
                    classToReplace = classOld.match(expr1);
                }
                else if(classOld.match(expr2) !== null) {
                    classToReplace = classOld.match(expr2);
                }
                else if (classOld.match(expr3) !== null) {
                    classToReplace = classOld.match(expr3);
                }
                classToReplace = classToReplace.toString().replace(spacesExp,"");
                classNew = classToReplace.replace(str1, str2);
                $(this).find('.'+classToReplace).removeClass(classToReplace).addClass(classNew);
            }
        }
    });
};

function bytesToSize(bytes) {
    var sizes = [ 'n/a', 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return  (bytes / Math.pow(1024, i)).toFixed( 0 ) + sizes[ isNaN( bytes ) ? 0 : i+1 ];
}
function date_ddmmmyytime(date)
{
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getYear();
  if(y >= 100)
  {
    y -= 100;
    y += 2000;
  }

    var curr_hour = date.getHours();

    if (curr_hour < 12){
        a_p = "am";
    } else {
       a_p = "pm";
    }

    if (curr_hour === 0) {
       curr_hour = 12;
    }
    if (curr_hour > 12){
       curr_hour = curr_hour - 12;
    }

    var curr_min = date.getMinutes();

  return "" +
    (d<10?"0"+d:d) + "/" +m + "/" + y + ' '+curr_hour + ":" + curr_min + a_p;
}

 // returns the file class/extension of a file
ui.mimeToExt = function( mimetype) {
  var mimeExt = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
  };
  console.log(mimetype);
  return mimeExt[mimetype] || 'unknown';
};

$(document).ready(function(){

    $('html').click(function(e) {
        // not sure if we want to hide the error window after every click in the ui
        if($('.communication-error').css('bottom') == '0px') {
            $('.communication-error').animate({bottom: "-151px"});
        }
    });

    if($('.vms.entities').length!==0){
        ui.inactiveActions();
    }
    ui.setElminHeight($('.main > .details'));
    ui.setElminHeight($('.lt-bar'));
    ui.setElmaxHeight($('.storage-progress'));
    $('#hd-search .hd-icon-search').click(function(e){
        var that = this;
        $(this).parents('.hd-search').toggleClass('hd-open');
        if ($(this).parents('.hd-search').hasClass('hd-open')) {
            $(that).parents('.hd-search').find('input[type="search"]').focus();
        } else {
            $(that).parents('.hd-search').find('input[type="search"]').val('');
        }
    });

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
     });

    $('.arrows').on('click','.inactive', function(e){
        e.preventDefault();
        e.stopPropagation();
    });


    $('.lt-actions a:not(.active)').click(function(e){
        e.preventDefault();
    });

    if ($('.entities .items-list >li').length == 1) {
        $('.body-wrapper').addClass('no-vm');
    }

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
        },50);
    });

    ui.closeDiv($('.info .close'), '.info');

    ui.overlay();
    ui.colorPickerVisible = 0;

    $("a.disabled").each(function() {
        $(this).removeAttr('href');
    });
    
    $("a.disabled").click(function(e) {
        e.preventDefault();
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
    });

    $('.browse-files').click(function(e){
        e.preventDefault();
    });

    if($('#picker-1').length>0) {
        $('#picker-1').farbtastic('#color-1');
    }
    if($('#picker-2').length>0) {
        $('#picker-2').farbtastic('#color-2');
    }
    if($('#sb-search').length>0) {
        new UISearch( document.getElementById( 'sb-search' ) );
    }

    if ($('.toggle-lt-bar').length>0) {
        ui.ltBarToggle(400);
    }

    /* grid/list view for items-list */

    $('.actions-bar .list, .actions-bar .grid').click(function(e){
        //e.preventDefault();
        /*if (!($(this).find('span').hasClass('current'))) {
            $('.actions-bar .grid span, .actions-bar .list span').removeClass('current');
            $(this).find('span').addClass('current');
            $('.entities').toggleClass('grid-view list-view');
        }*/
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
    });

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

    $('.firewall').mouseenter(function(e){
        $(this).css('z-index',2);
        $(this).find('.more').stop(true, true).slideDown(200);
    });
    $('.firewall').mouseleave(function(e){
        $(this).css('z-index',1);
        $(this).find('.more').stop(true, true).slideUp(200);
    });
    


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
        
    });
    // end of connected details js

    ui.replaceClass($('a.current, a.active'), 'outline', 'full', 'snf-');



    $('.storage-progress').hover(
        function(e){
            $(this).find('.details').stop(false,true).slideDown();
        },
        function(e){
            $(this).find('.details').stop(false,true).slideUp();
        }
    );

    $('.btn-more').mouseenter(function(e) {
        $(this).find('.explain').stop(true, true).show('slow');
    });

    $('.btn-more').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.btn-more').removeClass('clicked');
        $('.btn-more').siblings('ul').hide();
        $(this).addClass('clicked');
        $(this).siblings('ul').stop(true, true).slideDown('slow');
    });
    $('.containers .project').mouseleave(function(e){
        $(this).find('ul').fadeOut();
        $(this).find('.btn-more').removeClass('clicked');
    });

    if ($('.containers .btn-more').length>0) {
        $('body').click(function(e){
            $('.btn-more').removeClass('clicked');
            $('.btn-more').siblings('ul').fadeOut();
        });
    }

    // add a <span> element inside the content of each a.wrap-a element
    $('a.wrap-a').wrapInner('<span></span>');


});


$(window).resize(function(e){
    ui.setElminHeight($('.main > .details'));
    ui.setElminHeight($('.lt-bar'));
    ui.setElHeight($('.scroll-wrap'));
    ui.setElmaxHeight($('.storage-progress'));

});

