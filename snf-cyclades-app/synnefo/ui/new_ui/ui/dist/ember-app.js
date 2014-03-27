window.Snf = Ember.Application.create({
    LOG_ACTIVE_GENERATION: true,
    LOG_MODULE_RESOLVER: true,
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_VIEW_LOOKUPS: true,
    currentPath: '',
});

Snf.ApplicationAdapter = DS.FixtureAdapter;


Snf.ApplicationController = Ember.Controller.extend({
    updateCurrentPath: function() {
        Snf.set('currentPath', this.get('currentPath'));
    }.observes('currentPath')
});;/*
* These functions are used throughout ember
*/

_.mixin({
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});


em = {};

em.removeByValue = function(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
};



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

;/* Add New Button */

// {{add-new type=controller.type icon=controller.iconCls action="openWizard"}}

Snf.AddNewComponent = Ember.Component.extend({

	layoutName: 'elem', // templateName is deprecated for components
	addNewBtn: true,
	selectable: false,
	iconCls: function() {
		var baseIcon = this.get('icon');
		return	baseIcon.replace('full', 'create-full');
	}.property(),
	tagName: 'li',
	status: 'add-new',
	classNameBindings: ['status'],
	attributeBindings: ['data-status'],

	'data-status': function() {
		return this.status;
	}.property(),

	text: function() {
		var msg = 'Create New ';
		var btnType = this.get('type');
		switch(btnType){
			case 'vms':
				return msg + 'Machine';
			case 'networks':
				return msg + 'Network';
			case 'volumes':
				return msg + 'Volume';
			case 'snapshots':
				return msg + 'Snapshot';
			case 'images':
				return '+ Upload New Image';
		}
	}.property(),

	click: function () {
		this.sendAction('action');
	},

});;Snf.BtnSimpleComponent = Ember.Component.extend({
	tagName: 'a',
	click: function() {
		this.sendAction("action", this.get('param'));
	},
	content: undefined // will be set if we want to print a message inside the span
});;/* {{btn-span class="class-for-a" content="message" spanCls="class-for-span"}} */

Snf.BtnSpanComponent = Ember.Component.extend({
	tagName: 'a',
	layoutName: 'components/btn-span',
	click: function() {
		this.sendAction("action");
	}
});
;/* Use: */
/* If the initial state of the checkbox is unchecked:  {{checkbox-custom}} */
/* If the initial state of the checkbox is checked:  {{checkbox-custom checkboxState="preselected"}} */

Snf.CheckboxCustomComponent = Ember.Component.extend({
	tagName: 'a',
	classNames: ['check'],
	layoutName: 'components/btn-span',
	spanCls: undefined,
	checkedCls: 'snf-checkbox-checked',
	uncheckedCls: 'snf-checkbox-unchecked',


	didInsertElement: function() {
		this.setInitClasses();
	},
	setInitClasses: function() {
		var initialState = this.get('checkboxState');
        if(initialState === 'preselected')
			this.check();
		else
			this.uncheck();
	},
	toggleParentLiState: function() {
		var elState = this.get('spanCls');
		var checkedCls = this.get('checkedCls');
		var uncheckedCls = this.get('uncheckedCls');
		
		if(elState === checkedCls)
			this.$().closest('li').addClass('selected');
		else if(elState === uncheckedCls)
			this.$().closest('li').removeClass('selected');
	},
	changeState : function() {
		var currentState = this.get('spanCls');
		if(currentState === this.get('checkedCls')) {
			this.uncheck();
            this.sendAction('unselect', this.get('param'));
		} else {
			this.check();
            this.sendAction('select', this.get('param'));
        }
    },
    check : function(param) {
		this.get('param').set('isSelected', true);
		this.set('spanCls', this.get('checkedCls'));
        this.toggleParentLiState();
    },
    uncheck : function(param) {
        this.get('param').set('isSelected', false);
        this.set('spanCls', this.get('uncheckedCls'));
		this.toggleParentLiState();
	},

    reset: function() {
		if(this.get('checkboxState') === 'preselected')
			this.check();
		else
			this.uncheck();
    },
    click: function(e) {
		e.preventDefault();
		e.stopPropagation();
		this.changeState();
    }
});;Snf.CloseWizardComponent = Snf.BtnSpanComponent.extend({
	classNames: ['close'],
	spanCls: 'snf-close',
});;Snf.EditablePropComponent = Ember.Component.extend({

    tagName: 'div',
    classNames: ['editable'],
    layoutName: 'editable-prop',
    isEditable: false,

    actions: {
        allowEdit: function(){
            this.set('isEditable', true);
        },
        acceptEditableChanges: function(){
            this.set('isEditable', false);
            this.sendAction('ok');
        },
    }

});
;Snf.RevealModalComponent = Ember.Component.extend({
    classNames: ['inner-modal'],
    actions: {
        ok: function () {
            this.sendAction("ok", this.get('param'));
            $(this).foundation('reveal', 'close');
        },
        close: function () {
            $(this).foundation('reveal', 'close');       
        },
    },
});
;Snf.SideactionsProjectComponent = Ember.Component.extend({

    tagName: 'li',
    classNames: ['bottom'],
    layoutName: 'sideactions-project',
    isEditable: false,
    isDisplayed: false,

    availableProjects: function() {
        var current = this.get('current');
        return this.get('projects').filter(function(p) {
            return p.get('id') != current.get('id');
        });
    }.property('projects'),

    mouseEnter: function(evt) {
        this.set('isDisplayed', true);
    },

    mouseLeave: function(evt) {
        this.set('isEditable', false);
        this.set('isDisplayed', false);
    },

    actions: {
        showProjects: function(){
            this.set('isEditable', true);
        },
        reassignProject: function(){
            this.sendAction('reassignProject', this.get('newproject'));
            this.set('isEditable', false);
            this.set('isDisplayed', false);
        }
    },
});
;Snf.TagElComponent = Ember.Component.extend({
    tagName: 'li',
    title:'tag1',
    color: 'yellow',
    style: function () {
        return 'background-color:'+this.color;
    }.property('color'),

    didInsertElement: function() {
        this.$().find('.tag').attr('data-tooltip','');
        Foundation.libs.tooltips.init();
    },

    actions: {
        deleteTag: function() {
            this.sendAction('deleteTag', this.get('param'));
        },
    },

});
;Snf.ElemsListController = Ember.ArrayController.extend({
    
    type: '',

    fullName: function () {
        return _.capitalize(this.type);
    }.property('type'),

    // returns type without an 's', i.e. network
    _item: function () {
        return this.type.substring(0, this.type.length - 1);
    }.property('type'),
    
    // returns type without an 's', i.e. network
    itemController: function () {
        return this.get('_item');
    }.property(),

    // returns snf-network-full
    iconCls:  function () {
        return 'snf-'+this.get('_item')+'-full';
    }.property(),

    // allows grid-view/list-view icons in actions-bar
    hasViewOptions: true,
    
    // allows search functionality
    hasSearch: true,

    // allows items filtering
    hasFilter: true,

    pageTitle: function () {
        return this.get('fullName')+' ('+this.get('viewCls')+')';
    }.property('viewCls', 'fullName'),

    // used for link-to purposes
    parent: function () {
        return this.type;
    }.property(),

    // used for link-to purposes
    childInit: function () {
        return this.get('_item')+'init';
    }.property(),

    selectedItems : Ember.A(),

    actions: {
        toggleCheckboxesState: function(){
            console.log('toggleChecks');
        },
        selectItem: function(param) {
            this.get('selectedItems').pushObject(param);
            console.log(this.get('selectedItems').toString());
        },
        unselectItem: function(param) {
            em.removeByValue(this.get('selectedItems'), param);
        },
    },


});

Snf.ElController = Ember.ObjectController.extend({

    type: '',

    // returns snf-network-full
    iconCls:  function () {
        return 'snf-'+this.type+'-full';
    }.property(),

    hasConnect: false,

    // allows grid-view/list-view icons in actions-bar
    hasViewOptions: true,

    // allows search functionality
    hasSearch: false,

    // allows items filtering
    hasFilter: false,

    pageTitle: function (){
        return this.get('model').get('name');
    }.property('name'),

    parent: function() {
        return this.type+'s';
    }.property(),

    childInit: function() {
        return this.type+'init';
    }.property(),

    // defines how many action icons will be visible at the sidebar
    maxActionsVisible: 4,

    // show main action icons
    mainActions: function() {
        var cnt = this.maxActionsVisible - 1;
        return this.get('actionsMeta').slice(0,cnt);
    }.property('model.enabledActions'),

    // ... and more actions on hover
    secondaryActions: function() {
        var cnt = this.maxActionsVisible - 1 - this.get('actionsCount');
        return this.get('actionsMeta').slice(cnt);
    }.property('model.enabledActions'),

    // returns true if therea are more actions that can be shown at the sidebar
    actionsMany: function() {
        return this.get('model').get('enabledActions').length > this.maxActionsVisible;
    }.property('model.enabledActions'),

    actionsCount: function() {
        return this.get('model').get('enabledActions').length;
    }.property('model.enabledActions'),


    actions: {
        refreshModel: function(model){
            this.controllerFor(this.type).set('model', model);
        },
        saveModel: function(){
            this.get('model').save();
        },

    },

    projects: function(){
        return this.store.find('project');
    }.property(),


});
;var actionsMetaNetwork = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-network-modal',
        spanCls: 'snf-trash-outline',
        controller: 'network'
    },
};

Snf.NetworkController = Snf.ElController.extend({

    maxActionsVisible: 2,
    type: 'network',
    needs: ['networks'],
    vmsCnt: function(){
        return this.get('model').get('vms').length;
    }.property('model.vms'),

    submenu: [{
        'link': 'network.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'network.vm-connected',
        'icon': 'snf-pc-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) { return actionsMetaNetwork[val]; });      
    }.property('model.enabledActions'),

    actions: {
        destroyNetwork: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            var viewCls = this.get('controllers.networks.viewCls') || 'grid-view';
            this.transitionToRoute('networks', viewCls);
        },
    }

});


Snf.NetworksController = Snf.ElemsListController.extend({
    type : 'networks',
    actionsMeta: function(){
        return _.toArray(actionsMetaNetwork);
    }.property(),
});


Snf.NetworkInfoController = Snf.NetworkController.extend();

Snf.NetworkVmConnectedController = Snf.NetworkController.extend();

Snf.NetworkVmPortsController = Ember.ObjectController.extend({

    ports: function() {
        return  this.get('model').get('ports');
    }.property(),

});
;Snf.PortController = Ember.ObjectController.extend();;Snf.ProjectsController = Ember.ArrayController.extend();

Snf.ProjectController = Ember.ObjectController.extend();;Snf.TagController = Ember.ObjectController.extend({
    actions: {
        createTag: function(data, model) {
            var tag = this.store.createRecord('tag', data);
            tag.save();

            // model can be any model class instance which 
            // shares the tags interface used below.
            if (model) {
              model.get('tags').addObject(tag);
            }
        }
    },
});


var _defaultNewTagColor = '#16C1E9';

Snf.AddTagController = Snf.TagController.extend({
    newTagName: '',
    newTagColor: _defaultNewTagColor,
    isOpen: false,

    actions: {
        open: function(){
            this.toggleProperty('isOpen');
        },
        close: function(){
            this.set('isOpen', false);
        },

        handleSubmit: function() {

            // resolve form params
            var tagDetails = {
                name: this.get('newTagName'),
                color: $('#color').val(),
            };

            // validate ???
            // failed validation messages ???

            // do create tag
            this.send('createTag', tagDetails, this.get('model'));

            // hide form (view should use this attr)
            this.set('isOpen', false);

            // reset the newTag
            this.set('newTagName', '');
            this.set('newTagColor', _defaultNewTagColor);
        }
    }
});
;var actionsMetaVm = {
    'connect': {
        title: 'connect',
        act: 'connect-vm-modal',
        spanCls: 'snf-thunder-full',
        controller: 'vm',
    },
    'start': {
        title: 'start me now',
        act: 'start-vm-modal',
        spanCls: 'snf-switch',
        controller: 'vm',
    },
    'destroy': {
        title: 'destroy',
        act: 'destroy-vm-modal',
        spanCls: 'snf-trash-outline',
        controller: 'vm',
    },
    'reboot': {
        title: 'reboot',
        act: 'reboot-vm-modal',
        spanCls: 'snf-refresh-outline',
        controller: 'vm',
    },
    'shutdown': {
        title: 'shutdown',
        act: 'shutdown-vm-modal',
        spanCls: 'snf-pc-broken-full',
        controller: 'vm',
    },
};

Snf.VmController = Snf.ElController.extend({

    type: 'vm',
    iconCls: 'snf-pc-full',
    hasConnect: true,
    hasTags : true,
    isSelected: false,
    needs: ['vms'],

    submenu: [
    {
        'link': 'vm.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'vm.disk-connected',
        'icon': 'snf-volume-outline',
    },
    {
        'link': 'vm.network-connected',
        'icon': 'snf-network-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) {
            return actionsMetaVm[val];
        });
    }.property('model.enabledActions'),


    actions: {

        deleteTag: function(tag) {
            this.get('model').get('tags').removeObject(tag);
        },

        dettachVolume: function(volume){
            volume.get('vm').get('volumes').removeObject(volume);
        },

        rebootVm: function(){
            this.get('model').set('status','rebooting');
            var that = this;
            setTimeout(function(){
                that.get('model').set('status','running'); 
            },3000);
        },

        destroyVm: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            var viewCls = this.get('controllers.vms.viewCls') || 'grid-view';
            this.transitionToRoute('vms', viewCls);
        },

        shutdownVm: function(){
            this.get('model').set('status','shutting');
            var that = this;
            setTimeout(function(){
                that.get('model').set('status','off'); 
            },3000);
        },

        startVm: function(){
            this.get('model').set('status','running');
        },

        reassignProject: function(project){
            //this.get('model').set('project',project);
        },
    },
});

Snf.VmsController = Snf.ElemsListController.extend({
    type : 'vms',
    iconCls  : 'snf-pc-full',
    fullName: 'Virtual Machines',

    actionsMeta: function(){
        return _.toArray(actionsMetaVm);
    }.property(),
});

Snf.VmInfoController = Snf.VmController.extend();

Snf.VmDiskConnectedController = Snf.VmController.extend();


Snf.VmNetworkConnectedController = Snf.VmController.extend();

Snf.VmNetworkPortsController = Ember.ObjectController.extend({

    ports: function() {
        return  this.get('model').get('ports');
    }.property(),

});
;var actionsMetaVolume = {
    'destroy': {
        title: 'destroy',
        act: 'destroy-volume-modal',
        spanCls: 'snf-trash-outline',
        controller: 'volume'
    },
};

Snf.VolumeController = Snf.ElController.extend({
    type: 'volume',
    needs: ['volumes'],

    submenu: [
    {
        'link': 'volume.info',
        'icon': 'snf-info-outline',
    },
    {
        'link': 'volume.vm-connected',
        'icon': 'snf-pc-outline',
    }],

    actionsMeta: function() {
        var enabledActions = this.get('model').get('enabledActions');
        return _.map(enabledActions, function(val,key) {return actionsMetaVolume[val]; });      
    }.property('model.enabledActions'),

    actions: {

        dettachVolume: function(volume){
            volume.get('vm').get('volumes').removeObject(volume);
        },
        destroyVolume: function(){
            this.get('model').deleteRecord();
            this.get('model').save();
            this.transitionToRoute('volumes', viewCls);
        },
    }
});


Snf.VolumesController = Snf.ElemsListController.extend({
    type : 'volumes',
    actionsMeta: function(){
        return _.toArray(actionsMetaVolume);
    }.property(),
});

;/* Controllers for Wizards */

Snf.VmsCreateController = Ember.Controller.extend({
	currentStep: 0,
	type: 'vm',

	headers: function() {
		var type = this.get('type');
		return Snf.wizards.get(type).stepsHeaders;
	}.property(),
	
	menus: function() {
		var type = this.get('type');
		return Snf.wizards.get(type).stepsMenus;
	}.property(),
	
	totalSteps: function() {
		var type = this.get('type');
		return Snf.wizards.get(type).stepsLength;
	}.property(),

	btnLeftLabel: function(){
		return (this.get('currentStep') === 0)?'CANCEL':'PREVIOUS';
	}.property('currentStep'),

	btnRightLabel: function(){
		if(this.get('totalSteps')!==undefined)
			return (this.get('currentStep') === (this.get('totalSteps')-1))?'CREATE':'NEXT';
	}.property('currentStep'),

	onMove: false,
	directionMove: undefined,
	init: function() {
		this._super();
		this.set('currentStep', 0);
		this.set('onMove', false);
		this.set('directionMove', undefined);
	},
	showImageCategory: undefined,
	pickFlavor: undefined,
	selectedImageID: undefined,
	resetClose: function() {
		this.get('target').send('closeWizard');
		this.init();
	},
	actions: {
		moveNext: function() {
			if(!this.get('onMove')) {
				if(this.get('currentStep') === (this.get('totalSteps')-1))
					this.resetClose();
				else {
					this.set('directionMove', 'next');
					this.set('onMove', true);
				}
			}
		},
		moveBack: function() {
			if(!this.get('onMove')) {
				if(this.get('currentStep') === 0) {
					this.resetClose();
				}
				else {
					this.set('directionMove', 'prev');
					this.set('onMove', true);
				}
			}
		},
		menuAction: function(actionName, value) {
			if(actionName === 'showImageCategory') {
				console.log('showImageCategory');
				this.set('showImageCategory', value);
			}
			else if (actionName === 'pickFlavor') {
				console.log('pickFlavor');
				this.set('selectedMenuOption', value);
			}
		},
		newVmConf: function(dataType, dataValue) {
			console.log('[newVmConf] dataType: ' + dataType + 'selectedImageID ' + dataValue);
			if(dataType === 'image') this.set('selectedImageID', dataValue);
		}
	}
});


Snf.WizardVmStepController = Ember.Controller.extend({
	needs: ['vmsCreate'],
	index: 0,
	indexToDisplay: function(){
		return this.get('index')+1;
	}.property(),
	isCurrent: function() {
		return this.get('index') === this.get('controllers.vmsCreate').get('currentStep');
	}.property('controllers.vmsCreate.currentStep'),
	isPast: function() {
		return this.get('index') < this.get('controllers.vmsCreate').get('currentStep');
	}.property('controllers.vmsCreate.currentStep'),
	isNext: function() {
		return this.get('index') === (this.get('controllers.vmsCreate').get('currentStep')+1);
	}.property('controllers.vmsCreate.currentStep'),

});

Snf.WizardVmStep1Controller = Snf.WizardVmStepController.extend({
	index: 0
});

Snf.WizardVmStep2Controller = Snf.WizardVmStepController.extend({
	index: 1
});

Snf.WizardVmStep3Controller = Snf.WizardVmStepController.extend({
	index: 2
});

Snf.WizardVmStep4Controller = Snf.WizardVmStepController.extend({
	index: 3
});;Ember.Handlebars.helper('status-to-text', function(value) {
  return statusText[value];
}, 'status');


Ember.Handlebars.helper('bytes-to-human',function (bytes) {
  function humanSize(bytes, si) {
      var thresh = si ? 1000 : 1024;
      if(bytes < thresh) return bytes + ' B';
      var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
      var u = -1;
      do {
          bytes /= thresh;
          ++u;
      } while(bytes >= thresh);
      return bytes.toFixed(1)+' '+units[u];
  }
  return humanSize(bytes,true);
}, 'bytes');;var statusText ={
    'off'      : 'STOPPED',
    'error'    : 'ERROR',
    'building' : 'BUILDING',
    'running'  : 'RUNNING',
    'rebooting': 'REBOOTING',
    'starting' : 'STARTING',
    'shutting' : 'SHUTTING DOWN',
};

/* Wizards */

Snf.wizards = Ember.Object.create({
  vm: Ember.Object.create({
    // each step must have a headline
    stepsHeaders: [
        {
            title:'Select an OS',
            subtitle:'Choose your preferred image'
        },
        {
            title:'Select CPUs, RAM and Disk Size',
            subtitle:'Available options are filtered based on the selected image'
        },
        {
            title:'Virtual machine custom options',
            subtitle:'tba'
        },
        {
            title:'Confirm your settings',
            subtitle:'Confirm that the options you have selected are correct'
        },
    ],
    stepsMenus: [
        {
            actionName: 'showImageCategory',
            options:['System', 'My images', 'Shared with me', 'Public'] // Snaphots could be in this list
        },
        {
            actionName: 'pickFlavor',
            options: ['Small', 'Medium', 'large']
        }
    ],
    stepsLength: 4
  }),

  network: Ember.Object.create({
    stepsHeaders: [
        {
            title: 'Create new private network',
            subtitle: ''
        }
    ],
    stepsMenus: [],
    stepsLength: 1
  }),
});

Snf.SystemUUIDs = ['5e06c85e-166f-4dec-a5ff-f3931e80a48d'];
;Ember.Inflector.inflector.uncountable('account');

Snf.Account = DS.Model.extend({
	email: DS.attr('string')
});

Snf.Account.FIXTURES = [{
	id: 1,
	email: "athina@mail.com"
}];
// accounts that have published or shared image
Snf.AccountsUUIDs = Ember.Object.create({
"3757a587-ea42-4bec-8bfa-1b35da94e86a": "user01@mail.gr",
"847d3f38-9606-43aa-ac66-f53e16b91034": "user02@mail.gr",
"3ae10b0d-122a-45e8-8106-3b46c8427956": "user03@mail.gr",
"5ba7b641-9d74-4407-ac1e-1d58f6225258": "user04@mail.gr",
"1f0a0cb2-12f6-440b-854f-87489e45e682": "user05@mail.gr",
"11317487-1eb8-4669-bbb6-2ab6381f60f3": "user06@mail.gr",
"2bcf1f3d-6faf-49af-be7c-3772d708de3e": "user07@mail.gr",
"5e06c85e-166f-4dec-a5ff-f3931e80a48d": "user08@mail.gr",
"07a108f3-7d8c-4eb5-a652-b5144b92b896": "user09@mail.gr",
"d3394a1a-c107-42b2-be34-65c79486ed1c": "user10@mail.gr",
"f43489df-0331-4302-83e4-554605c65f75": "user11@mail.gr",
"736b4003-ed68-484b-9893-35928e44bc73": "user12@mail.gr",
"4de95599-8065-45a6-96e1-2dd2ed4015df": "user13@mail.gr",
"a7e3f286-943a-4d2d-835a-ab8df14646a7": "user14@mail.gr",
"c5972b99-e823-48c7-80ad-e35be480dfab": "user15@mail.gr",
"534b9f26-0a3b-4964-af0c-4af525538d75": "user16@mail.gr",
"f4a9495-dfc6-46d5-950b-5e26c4a32a4f": "user17@mail.gr",
"aaff1da5-2a98-4e16-ab27-37cb24d6062c": "user18@mail.gr",
"1ef1003b-0f94-4c89-9415-18b7a759e104": "user19@mail.gr",
"8be365b4-5034-4edf-b2a8-eaa7ec51d911": "user20@mail.gr",
"07d39ccb-beaa-4d24-a630-ad6f02f0a842": "user21@mail.gr",
"49e2cb58-b2e5-4daa-897b-38196765b913": "user22@mail.gr",
"61e9793a-55b5-40d4-8bbc-0f8da2dddff0": "user23@mail.gr",
"e06780e5-5222-40a6-8c25-62d74942f8f1": "user24@mail.gr",
"181a0935-57e6-41a0-ad47-7089f73d4e2c": "user25@mail.gr",
"a4809bc1-7278-4722-883c-817e4e8367b1": "user26@mail.gr",
"3fef635b-3529-4fc7-8a48-b185e7fe25bd": "user27@mail.gr",
"a73dd3fc-f67d-49f0-892f-f3ed0bf1316b": "user28@mail.gr",
"4df24393-d83d-4b0e-ab00-0f32684a2de4": "user29@mail.gr"
});;// included some properties of the received json
Snf.Image = DS.Model.extend({
  name: DS.attr(),
  status: DS.attr(),
  disk_format: DS.attr(),
  size: DS.attr('number'),
  created_at: DS.attr(),// should be date
  updated_at: DS.attr(),// should be date
  deleted_at: DS.attr(),// should be date
  is_public: DS.attr('boolean'),
  sortorder: DS.attr('number'),
  properties: DS.attr('raw')
  /*
    properties include:
    partition_table
    kernel
    osfamily
    users // maybe more than one
    gui
    sortorder
    os
    root_partition
    description
  */
});


Snf.Image.FIXTURES =
[
{
"status": "available",
"name": "CentOS",
"checksum": "1cd682b9b56a4e13e41fc6626474b8e038036808dfe1ec862c642d4362658ef0",
"created_at": "2014-02-24 15:59:15",
"disk_format": "diskdump",
"updated_at": "2014-02-24 15:59:15",
"properties": {
"partition_table": "msdos",
"kernel": "2.6.32",
"osfamily": "linux",
"users": "root",
"gui": "No GUI",
"sortorder": "6",
"os": "centos",
"root_partition": "1",
"description": "CentOS release 6.5 (Final)"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/centos-6.x-14-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "bace133d-4d1f-40aa-a495-1a1d7d5c1726",
"size": 709644288
},
{
"status": "available",
"name": "FreeBSD",
"checksum": "ab99fcf5ab7c9903ff3b8d3ea134b356aebd54bc07aa25c81b12850e81071930",
"created_at": "2014-02-24 13:07:12",
"disk_format": "diskdump",
"updated_at": "2014-02-24 13:07:12",
"properties": {
"partition_table": "gpt",
"kernel": "FreeBSD 9.2-RELEASE",
"osfamily": "freebsd",
"users": "root",
"gui": "No GUI",
"sortorder": "10",
"os": "freebsd",
"root_partition": "2",
"description": "FreeBSD 9.2-RELEASE (GENERIC)"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/freebsd-9.2-2-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "2da09920-20c1-4f48-ac04-e5e18029ca0c",
"size": 1610612736
},
{
"status": "available",
"name": "OpenSUSE",
"checksum": "542597ba73388ddcc5752437e810a1b9b1a82912f063a70ab1ec0e757be55118",
"created_at": "2014-02-24 13:04:58",
"disk_format": "diskdump",
"updated_at": "2014-02-24 13:04:58",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root user",
"gui": "KDE 4",
"sortorder": "9",
"os": "opensuse",
"root_partition": "1",
"description": "openSUSE 13.1 (x86_64)"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/opensuse_desktop-13.1-3-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "e1be6e12-2e18-4417-a49d-0e0bc189c141",
"size": 5204701184
},
{
"status": "available",
"name": "cassandra_deb_v3.3",
"checksum": "6d799ff55063bbc0b5a034340c461d06a25f639cbda30efc3314a2bc97309c72",
"created_at": "2014-02-24 11:58:01",
"disk_format": "diskdump",
"updated_at": "2014-02-24 11:58:01",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"exclude_task_deletesshkeys": "yes",
"exclude_task_addswap": "yes",
"os": "debian",
"root_partition": "1",
"description": "wheezy + java-1.7,cassandra-2.0,ycsb(+sin),ganglia"
},
"location": "pithos://f4a9495-dfc6-46d5-950b-5e26c4a32a4f/images/cassandra_base_v3.3.diskdump",
"container_format": "bare",
"owner": "f4a9495-dfc6-46d5-950b-5e26c4a32a4f",
"is_public": true,
"deleted_at": "",
"id": "4a9134b9-5e7b-471c-83dc-a091e11cd090",
"size": 1391607808
},
{
"status": "available",
"name": "Windows Server 2008R2",
"checksum": "07e8fdc61b5142beb40d22a420f80dcf839f5f4b9ddaa3ebd0c9ff6062fb6a30",
"created_at": "2014-02-18 08:25:56",
"disk_format": "diskdump",
"updated_at": "2014-02-18 08:25:56",
"properties": {
"partition_table": "msdos",
"kernel": "Windows NT Kernel",
"osfamily": "windows",
"users": "Administrator",
"gui": "Windows,Aero Theme",
"sortorder": "7",
"os": "windows",
"root_partition": "2",
"description": "Windows Server 2008 R2 Datacenter"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/windows-2008R2-16-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "e394efad-11cd-414b-a76d-6dcf245da919",
"size": 15439233024
},
{
"status": "available",
"name": "cassandra_deb_v3.2",
"checksum": "10303f9b358bd4c530196a3d86d049e1ca256ec736368ce73df32988073e723d",
"created_at": "2014-02-17 12:34:25",
"disk_format": "diskdump",
"updated_at": "2014-02-17 12:34:25",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "wheezy (7.3) + oracle java1.7,cassandra2.0,ycsb,ganglia,c-tool",
"os": "debian",
"root_partition": "1",
"users": "root"
},
"location": "pithos://f4a9495-dfc6-46d5-950b-5e26c4a32a4f/images/cassandra_deb_v3.2-201402171425.diskdump",
"container_format": "bare",
"owner": "f4a9495-dfc6-46d5-950b-5e26c4a32a4f",
"is_public": true,
"deleted_at": "",
"id": "440d9ca1-9132-4880-b96f-c7ebed5f3150",
"size": 1654947840
},
{
"status": "available",
"name": "Fedora",
"checksum": "ca37b5f75e4e2082ba3e7dff85645fe20d19606b44f8d0af630f81563a1c89be",
"created_at": "2014-02-13 11:03:54",
"disk_format": "diskdump",
"updated_at": "2014-02-13 11:03:54",
"properties": {
"partition_table": "msdos",
"kernel": "3.12.10",
"osfamily": "linux",
"users": "root user",
"gui": "MATE Desktop Environment 1.6.2",
"sortorder": "5",
"os": "fedora",
"root_partition": "2",
"description": "Fedora release 20 (Heisenbug)"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/fedora-20-2-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "04fa9ca6-7417-41a7-a20c-23a416b2b55c",
"size": 3522433024
},
{
"status": "available",
"name": "Debian Desktop",
"checksum": "e18d7ab60f4969e33bff3df22c8ee3cb4db95121744280efe6619c4de4462d13",
"created_at": "2014-02-10 17:39:46",
"disk_format": "diskdump",
"updated_at": "2014-02-10 17:39:46",
"properties": {
"partition_table": "msdos",
"kernel": "3.2.0",
"osfamily": "linux",
"users": "root user",
"gui": "GNOME 3.4",
"sortorder": "2",
"os": "debian",
"root_partition": "1",
"description": "Debian 7.4 (Wheezy) Desktop"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/debian_desktop-7.0-3-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "31773c86-46b4-420c-bd9e-d6f51535a902",
"size": 4044349440
},
{
"status": "available",
"name": "Debian Base",
"checksum": "5921d279415e13d1fcf278e3ffb302f7f4b2618cb6ba9a0d5b273ca1bbb8c0bc",
"created_at": "2014-02-10 17:03:46",
"disk_format": "diskdump",
"updated_at": "2014-02-10 17:03:46",
"properties": {
"partition_table": "msdos",
"kernel": "3.2.0",
"osfamily": "linux",
"users": "root",
"gui": "No GUI",
"sortorder": "1",
"os": "debian",
"root_partition": "1",
"description": "Debian 7.4 (Wheezy) Base System"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/debian_base-7.0-3-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "eb925e7d-63be-45a6-bc1c-fba9e74bc996",
"size": 570810368
},
{
"status": "available",
"name": "Debian Base (OldStable)",
"checksum": "be5b30830cda9e70951ea1e5e76a35334ea23da4615fdf6071f9a748fad8ee4b",
"created_at": "2014-02-10 16:45:33",
"disk_format": "diskdump",
"updated_at": "2014-02-10 16:45:33",
"properties": {
"partition_table": "msdos",
"kernel": "2.6.32",
"osfamily": "linux",
"users": "root",
"gui": "No GUI",
"sortorder": "1",
"os": "debian",
"root_partition": "1",
"description": "Debian 6.0.8 (Squeeze) Base System"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/debian_base-6.0-13-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "09b738a6-bf7e-4eae-b271-082d1081862c",
"size": 474664960
},
{
"status": "available",
"name": "mininet_netman2014",
"checksum": "3a35b40900493af100d0e6deb96aec7c99029a1cff694f838c22063faa38a2e6",
"created_at": "2014-02-03 18:30:50",
"disk_format": "diskdump",
"updated_at": "2014-02-03 18:30:50",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Mininet 2.1.0 for NetMan 2014 lab",
"os": "ubuntu",
"root_partition": "1",
"users": "mininet root"
},
"location": "pithos://847d3f38-9606-43aa-ac66-f53e16b91034/images/mininet_netman2014-201402031013.diskdump",
"container_format": "bare",
"owner": "847d3f38-9606-43aa-ac66-f53e16b91034",
"is_public": true,
"deleted_at": "",
"id": "88e185c5-fd22-452a-943d-de230d4a3be9",
"size": 1851117568
},
{
"status": "available",
"name": "cassandra_base_v01",
"checksum": "600ec3523613183fd1ed66719c7791ddac3a7d6754d2c930de0ba32a7cfc7318",
"created_at": "2014-01-30 16:03:35",
"disk_format": "diskdump",
"updated_at": "2014-01-30 16:03:35",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root user",
"swap": "5:1022",
"os": "ubuntu",
"root_partition": "1",
"description": "Ubuntu SVR 13.10 + java,cassandra,YCSB,ganglia"
},
"location": "pithos://f4a9495-dfc6-46d5-950b-5e26c4a32a4f/images/cassandra_base_v01-201401301753.diskdump",
"container_format": "bare",
"owner": "f4a9495-dfc6-46d5-950b-5e26c4a32a4f",
"is_public": true,
"deleted_at": "",
"id": "8f0dab5d-1f7d-4783-b3ef-005ef0677355",
"size": 2268602368
},
{
"status": "available",
"name": "mininet-test2",
"checksum": "5a4d3075414618555b5a0da1ce1a82d076c20379a2c15c1f4cb56981ea9fdc4b",
"created_at": "2014-01-28 15:44:34",
"disk_format": "diskdump",
"updated_at": "2014-01-28 15:44:34",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Mininet on Ubuntu 13.04",
"os": "ubuntu",
"root_partition": "1",
"users": "mininet root"
},
"location": "pithos://847d3f38-9606-43aa-ac66-f53e16b91034/images/mininet-test2-201401280735.diskdump",
"container_format": "bare",
"owner": "847d3f38-9606-43aa-ac66-f53e16b91034",
"is_public": true,
"deleted_at": "",
"id": "f0ebd2e4-1a27-450e-8c83-e8d350c0dc24",
"size": 1851379712
},
{
"status": "available",
"name": "mininet-test1",
"checksum": "1e6d70d0d48cb93c4c40695ec75d4c973512da8bc82803ed4eecf1e5cd1a4402",
"created_at": "2014-01-28 14:26:12",
"disk_format": "diskdump",
"updated_at": "2014-01-28 14:26:12",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Mininet on Ubuntu 13.04",
"os": "ubuntu",
"root_partition": "1",
"users": "mininet root"
},
"location": "pithos://847d3f38-9606-43aa-ac66-f53e16b91034/images/mininet-test1-201401280618.diskdump",
"container_format": "bare",
"owner": "847d3f38-9606-43aa-ac66-f53e16b91034",
"is_public": true,
"deleted_at": "",
"id": "726090b4-00d2-4f44-bb32-83429181bee3",
"size": 1848168448
},
{
"status": "available",
"name": "debian_ATDS_2014",
"checksum": "20d4ca674c216f2a36ad94bbe7b924e357490655871c399f3b2c4e9987a62312",
"created_at": "2014-01-28 11:23:54",
"disk_format": "diskdump",
"updated_at": "2014-01-28 11:23:54",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"swap": "5:466",
"os": "debian",
"root_partition": "1",
"description": "Image for ATDS 2014"
},
"location": "pithos://61e9793a-55b5-40d4-8bbc-0f8da2dddff0/images/debian_ATDS_2014-201401281318.diskdump",
"container_format": "bare",
"owner": "61e9793a-55b5-40d4-8bbc-0f8da2dddff0",
"is_public": true,
"deleted_at": "",
"id": "67f21595-ab0d-4af5-8974-b655b679a86a",
"size": 1208614912
},
{
"status": "available",
"name": "okeanos-is",
"checksum": "4fda6e3716e9b5bcc0a4a0707ea1eff68659777a4d4c636446fe6035e099f7f7",
"created_at": "2014-01-24 08:56:54",
"disk_format": "diskdump",
"updated_at": "2014-01-24 08:56:54",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "okeanos-is-on-centos",
"os": "centos",
"root_partition": "1",
"users": "root"
},
"location": "pithos://3ae10b0d-122a-45e8-8106-3b46c8427956/images/okeanos-is-201401241028.diskdump",
"container_format": "bare",
"owner": "3ae10b0d-122a-45e8-8106-3b46c8427956",
"is_public": true,
"deleted_at": "",
"id": "f00b0d29-62f4-46db-a78e-370d596fc553",
"size": 4442464256
},
{
"status": "available",
"name": "Windows Server 2012",
"checksum": "38b5424f9977a441861a20e82a78f86985fc579991245b682aacc04915e8f4db",
"created_at": "2014-01-23 09:35:02",
"disk_format": "diskdump",
"updated_at": "2014-01-23 09:35:02",
"properties": {
"partition_table": "msdos",
"kernel": "Windows NT Kernel",
"osfamily": "windows",
"users": "Administrator",
"gui": "Windows,Metro UI",
"sortorder": "8",
"os": "windows",
"root_partition": "2",
"description": "Windows Server 2012 Datacenter"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/windows-2012-6-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "09ff8272-3018-422f-a91f-386615ef0fb2",
"size": 15780020224
},
{
"status": "available",
"name": "HMMY-tools v1.0",
"checksum": "d21c6893df33d24afb10e348fc4bd93b538040b22b3d2608e461762b95970f23",
"created_at": "2014-01-22 16:25:59",
"disk_format": "diskdump",
"updated_at": "2014-01-22 16:25:59",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04 LTS with pre-installed tools for HMMY students",
"os": "ubuntu",
"root_partition": "1",
"users": "root user"
},
"location": "pithos://534b9f26-0a3b-4964-af0c-4af525538d75/images/HMMY-tools v1.0-201401221736.diskdump",
"container_format": "bare",
"owner": "534b9f26-0a3b-4964-af0c-4af525538d75",
"is_public": true,
"deleted_at": "",
"id": "430afb49-6471-425f-9aec-622ce41d7a5a",
"size": 8173547520
},
{
"status": "available",
"name": "xubuntu",
"checksum": "00751c6e170d493218725bd7485e8c1e1f034a85eb20db4bc924e90962676e82",
"created_at": "2014-01-17 15:50:34",
"disk_format": "diskdump",
"updated_at": "2014-01-17 15:50:34",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "user",
"swap": "5:1022",
"os": "ubuntu",
"root_partition": "1",
"description": "Xubuntu 13.10"
},
"location": "pithos://3757a587-ea42-4bec-8bfa-1b35da94e86a/images/xubuntu-201401171739.diskdump",
"container_format": "bare",
"owner": "3757a587-ea42-4bec-8bfa-1b35da94e86a",
"is_public": true,
"deleted_at": "",
"id": "2953ee6f-7dac-4173-9c13-19a0b87162f9",
"size": 2812469248
},
{
"status": "available",
"name": "Mageia-3",
"checksum": "64e117012f89154f5668b59e27f399768e218c60c50d6cd9ca5645466270bb75",
"created_at": "2014-01-16 20:53:57",
"disk_format": "diskdump",
"updated_at": "2014-01-16 20:53:57",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Mageia 3",
"os": "mageia",
"root_partition": "1",
"users": "root user"
},
"location": "pithos://07a108f3-7d8c-4eb5-a652-b5144b92b896/images/Mageia-3-x86_64.img",
"container_format": "bare",
"owner": "07a108f3-7d8c-4eb5-a652-b5144b92b896",
"is_public": true,
"deleted_at": "",
"id": "ca446474-a846-45ab-b8b9-7bcd41e7c905",
"size": 909467136
},

{
"status": "available",
"name": "Openfiler ESA 2.99",
"checksum": "5ef6be48c689126cfb2c24c1c70f73a4dccb2f0e7ea173d1dee311970fad2d57",
"created_at": "2014-01-16 16:25:50",
"disk_format": "diskdump",
"updated_at": "2014-01-16 16:25:50",
"location": "pithos://8be365b4-5034-4edf-b2a8-eaa7ec51d911/images/openfiler-2.99-201401161810.diskdump",
"container_format": "bare",
"owner": "8be365b4-5034-4edf-b2a8-eaa7ec51d911",
"is_public": true,
"deleted_at": "",
"id": "890d0d9c-f9f6-4643-bc9d-f6eb387573a1",
"size": 1887083520,
"properties": {
  "partition_table": "msdos",
  "osfamily": "linux",
  "users": "root openfiler ofguest",
  "description": "Openfiler 2.99",
  "swap": "3:1028",
  "exclude_task_assignhostname": "yes",
  "os": "linux",
  "root_partition": "2",
  "password_hashing_method": "md5"
},
},


{
"status": "available",
"name": "NetBSD",
"checksum": "7dabf52d1632d3bcf83cbb89e4d1bfec715d184542dd8741b2d9f100d78f53fc",
"created_at": "2014-01-16 11:17:01",
"disk_format": "diskdump",
"updated_at": "2014-01-16 11:17:01",
"properties": {
"partition_table": "msdos",
"osfamily": "netbsd",
"users": "root",
"gui": "No GUI",
"sortorder": "12",
"os": "netbsd",
"root_partition": "1",
"description": "NetBSD 6.1.2 (GENERIC)"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/netbsd-6.1-2-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "1768283d-0034-4b27-a2e6-7063a3f5ab06",
"size": 5100273664
},
{
"status": "available",
"name": "OpenBSD",
"checksum": "db7135cb525adfd464c196c204aa0a096d6e8596b7c01ad27c9a7120ba4dc4e0",
"created_at": "2014-01-14 10:20:17",
"disk_format": "diskdump",
"updated_at": "2014-01-14 10:20:17",
"properties": {
"partition_table": "msdos",
"osfamily": "openbsd",
"users": "root",
"gui": "No GUI",
"sortorder": "11",
"os": "openbsd",
"root_partition": "4",
"description": "OpenBSD 5.4 (GENERIC)"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/openbsd-5.4-2-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "826db4a0-8ab1-45eb-b6fe-7c9a53a8a5b8",
"size": 5100273664
},
{
"status": "available",
"name": "Ubuntu Desktop LTS",
"checksum": "cdeb5be4eb282aed75389e8b2a9ea489cf277234a5f7502aa62debf73c184c91",
"created_at": "2013-12-19 14:16:43",
"disk_format": "diskdump",
"updated_at": "2013-12-19 14:16:43",
"properties": {
"partition_table": "msdos",
"kernel": "3.2.0",
"osfamily": "linux",
"users": "user",
"gui": "Unity 5.10",
"sortorder": "3",
"os": "ubuntu",
"root_partition": "1",
"description": "Ubuntu 12.04.3 LTS"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/ubuntu_desktop-12.04-6-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "57e4c30b-b7e8-44e8-ae93-16e4a6ebc11b",
"size": 2610372608
},
{
"status": "available",
"name": "Ubuntu Server",
"checksum": "15d960bd90784096a612aabb9cbdcab8ae1a9d8d5d847d20f4c416c8291727cd",
"created_at": "2013-12-19 10:48:39",
"disk_format": "diskdump",
"updated_at": "2013-12-19 10:48:39",
"properties": {
"partition_table": "msdos",
"kernel": "3.2.0",
"osfamily": "linux",
"users": "user",
"gui": "No GUI",
"sortorder": "3",
"os": "ubuntu",
"root_partition": "1",
"description": "Ubuntu 12.04.3 LTS"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/ubuntu_server-12.04-7-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "d77f6f3d-8935-4bae-86b8-48d039106f72",
"size": 1080287232
},
{
"status": "available",
"name": "Kubuntu",
"checksum": "72ee40c0c66451227f07f6d6213274cf899e9f8cb492033d20ccbdfa0fdb7bdc",
"created_at": "2013-12-11 09:45:50",
"disk_format": "diskdump",
"updated_at": "2013-12-11 09:45:50",
"properties": {
"partition_table": "msdos",
"kernel": "3.11.0",
"osfamily": "linux",
"users": "user",
"gui": "KDE 4.11.2",
"sortorder": "4",
"os": "kubuntu",
"root_partition": "1",
"description": "Kubuntu 13.10"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/kubuntu-13.10-1-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "5f0a7a25-6210-4e28-b6fa-c9978fb3f61d",
"size": 3425742848
},
{
"status": "available",
"name": "CELAR_Jenkins_snapshot_111213",
"checksum": "6d45dc96602288eb3551456fea8a7b56a6d70ae1345ece08c3db35f020cdc7e8",
"created_at": "2013-12-11 08:57:38",
"disk_format": "diskdump",
"updated_at": "2013-12-11 08:57:38",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.2 LTS",
"os": "ubuntu",
"root_partition": "1",
"users": "user konstantin vangelis"
},
"location": "pithos://3fef635b-3529-4fc7-8a48-b185e7fe25bd/images/CELAR_Jenkins_snapshot_111213-201312111053.diskdump",
"container_format": "bare",
"owner": "3fef635b-3529-4fc7-8a48-b185e7fe25bd",
"is_public": true,
"deleted_at": "",
"id": "fa34e0a0-b474-464b-a563-9aea1bc3e9b5",
"size": 2463830016
},
{
"status": "available",
"name": "CELAR_Nexus_snapshot_111213",
"checksum": "13df1df1751af3c70c71be5caea0d7c0b29e80b2ada484e3231b3f6623995436",
"created_at": "2013-12-11 08:57:38",
"disk_format": "diskdump",
"updated_at": "2013-12-11 08:57:38",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.3 LTS",
"os": "ubuntu",
"root_partition": "1",
"users": "user konstantin vangelis"
},
"location": "pithos://3fef635b-3529-4fc7-8a48-b185e7fe25bd/images/CELAR_Nexus_snapshot_111213-201312111052.diskdump",
"container_format": "bare",
"owner": "3fef635b-3529-4fc7-8a48-b185e7fe25bd",
"is_public": true,
"deleted_at": "",
"id": "8258fe3d-3b6d-49c7-88aa-bc28cc44d609",
"size": 2709106688
},
{
"status": "available",
"name": "Ubuntu Desktop",
"checksum": "36fbc5c30735ef5dfa7b03db6dd873c09597dcc4bd9051d76173a5d9ad7a679d",
"created_at": "2013-12-10 11:29:35",
"disk_format": "diskdump",
"updated_at": "2013-12-10 11:29:35",
"properties": {
"partition_table": "msdos",
"kernel": "3.11.0",
"osfamily": "linux",
"users": "user",
"gui": "MATE Desktop Environment 1.6.0",
"sortorder": "3",
"os": "ubuntu",
"root_partition": "1",
"description": "Ubuntu 13.10 with MATE"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/ubuntu_desktop-13.10-1-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "49beee24-17b5-4bb2-9de6-7cef3d92de42",
"size": 3679756288
},
{
"status": "available",
"name": "Dartha ubuntu",
"checksum": "be14316a5f867d763d00a7173dc9e3b2d295df7dd365061b3dbb8a2eaa5e1203",
"created_at": "2013-12-10 09:15:06",
"disk_format": "diskdump",
"updated_at": "2013-12-10 09:15:06",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.3 LTS no gui",
"os": "ubuntu",
"root_partition": "1",
"users": "malf"
},
"location": "pithos://e06780e5-5222-40a6-8c25-62d74942f8f1/images/Dartha ubuntu-201312101103.diskdump",
"container_format": "bare",
"owner": "e06780e5-5222-40a6-8c25-62d74942f8f1",
"is_public": true,
"deleted_at": "",
"id": "d0ae1af2-eac0-453e-bb2e-720b10a2e2d4",
"size": 2346725376
},
{
"status": "available",
"name": "Dartha Ubuntu",
"checksum": "0f436378ba7c0c5700b0133fb4eb6d0181a33e4b696b44a019abb8f77cede553",
"created_at": "2013-12-09 22:00:58",
"disk_format": "diskdump",
"updated_at": "2013-12-09 22:00:58",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.3 Base install no Gui",
"os": "ubuntu",
"root_partition": "1",
"users": "malf"
},
"location": "pithos://e06780e5-5222-40a6-8c25-62d74942f8f1/images/Dartha Ubuntu-201312092103.diskdump",
"container_format": "bare",
"owner": "e06780e5-5222-40a6-8c25-62d74942f8f1",
"is_public": true,
"deleted_at": "",
"id": "83c4c2d5-50b4-4400-b95d-3d10a760e8d6",
"size": 1128448000
},
{
"status": "available",
"name": "archie-2013.12.01",
"checksum": "3436cf7b39d6843969c2049520fad40a984afaa3584eb89baddb7e4c074cfffe",
"created_at": "2013-12-02 21:21:51",
"disk_format": "diskdump",
"updated_at": "2013-12-02 21:21:51",
"properties": {
"partition_table": "gpt",
"osfamily": "linux",
"description": "ArchLinux 2013.12.01 w/ openssh,vim and iptables setup - Only PubKeyAuth accepted",
"os": "archlinux",
"root_partition": "2",
"users": "root"
},
"location": "pithos://5ba7b641-9d74-4407-ac1e-1d58f6225258/images/archie-2013.12.01-201312022313.diskdump",
"container_format": "bare",
"owner": "5ba7b641-9d74-4407-ac1e-1d58f6225258",
"is_public": true,
"deleted_at": "",
"id": "8fea4394-78fe-409d-a560-0cd517986c6f",
"size": 648056832
},
{
"status": "available",
"name": "arch",
"checksum": "c10e2fdf8acc6239bd07350897207218285b7348b8e1931a9ca161df06b700c3",
"created_at": "2013-11-12 18:51:06",
"disk_format": "diskdump",
"updated_at": "2013-11-12 18:51:06",
"properties": {
"partition_table": "gpt",
"osfamily": "linux",
"description": "unknown",
"os": "archlinux",
"root_partition": "1",
"users": "root"
},
"location": "pithos://c5972b99-e823-48c7-80ad-e35be480dfab/images/arch-201311122011.diskdump",
"container_format": "bare",
"owner": "c5972b99-e823-48c7-80ad-e35be480dfab",
"is_public": true,
"deleted_at": "",
"id": "4a65772b-98fd-43b3-b3b9-cd083849e63b",
"size": 752332800
},
{
"status": "available",
"name": "ckan_2_1-debian_7_1",
"checksum": "868fe3e7a016ec7d366bd15ecb33ea19b1160732ac05b7350e47a43ee133fb56",
"created_at": "2013-11-08 07:32:49",
"disk_format": "diskdump",
"updated_at": "2013-11-08 07:32:49",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "CKAN 2.1 base installation on a debian 7.1 system",
"os": "debian",
"root_partition": "1",
"users": "root ckaner"
},
"location": "pithos://d3394a1a-c107-42b2-be34-65c79486ed1c/images/ckan_2_1-debian_7_1-201311080928.diskdump",
"container_format": "bare",
"owner": "d3394a1a-c107-42b2-be34-65c79486ed1c",
"is_public": true,
"deleted_at": "",
"id": "0e399015-8723-4c78-8198-75bdf693cdde",
"size": 1995177984
},
{
"status": "available",
"name": "OPENBSD54",
"checksum": "5215920e1393f47d6fa10444695a49061b037e831c4cafae82c3839e9453030b",
"created_at": "2013-11-04 18:33:51",
"disk_format": "diskdump",
"updated_at": "2013-11-04 18:33:51",
"properties": {
"exclude_all_tasks": "true"
},
"location": "pithos://a73dd3fc-f67d-49f0-892f-f3ed0bf1316b/images/openbsd54.diskdump",
"container_format": "bare",
"owner": "a73dd3fc-f67d-49f0-892f-f3ed0bf1316b",
"is_public": true,
"deleted_at": "",
"id": "493e78e9-f469-4a71-abea-4d50db71f535",
"size": 2147483648
},
{
"status": "available",
"name": "Gitlab ubuntu 12.04",
"checksum": "93d0832a479dee3b8f8e0ac042cfcc93bc462399b012726b5bf9aa05abd855bc",
"created_at": "2013-10-31 23:37:16",
"disk_format": "diskdump",
"updated_at": "2013-10-31 23:37:16",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "user",
"exclude_task_deletesshkeys": "yes",
"exclude_task_assignhostname": "yes",
"os": "ubuntu",
"root_partition": "1",
"description": "Ubuntu 12.04.2 LTS"
},
"location": "pithos://2bcf1f3d-6faf-49af-be7c-3772d708de3e/images/ubuntu_gitlab.diskdump",
"container_format": "bare",
"owner": "2bcf1f3d-6faf-49af-be7c-3772d708de3e",
"is_public": true,
"deleted_at": "",
"id": "23f7c7ad-544c-46db-8626-e9f82050cee5",
"size": 35648634880
},
{
"status": "available",
"name": "openBSD53",
"checksum": "21c98906032b763550098a9b07411d684f0c7772aacb2581a8f6514590090461",
"created_at": "2013-10-29 16:29:36",
"disk_format": "diskdump",
"updated_at": "2013-10-29 16:29:36",
"properties": {
"osfamily": "freebsd",
"exclude_all_tasks": "yes",
"root_partition": "1"
},
"location": "pithos://a73dd3fc-f67d-49f0-892f-f3ed0bf1316b/images/openBSD53.diskdump",
"container_format": "bare",
"owner": "a73dd3fc-f67d-49f0-892f-f3ed0bf1316b",
"is_public": true,
"deleted_at": "",
"id": "b26866dd-4626-4c12-85e3-9435048dd8a7",
"size": 2147483648
},
{
"status": "available",
"name": "openBSD5",
"checksum": "123223fc64c98657c28205e660cfb814ad6c44c15d7692029b9afd6ebea0920b",
"created_at": "2013-10-27 22:36:49",
"disk_format": "diskdump",
"updated_at": "2013-10-27 22:36:49",
"properties": {
"osfamily": "freebsd",
"root_partition": "1"
},
"location": "pithos://a73dd3fc-f67d-49f0-892f-f3ed0bf1316b/images/openBSD51.diskdump",
"container_format": "bare",
"owner": "a73dd3fc-f67d-49f0-892f-f3ed0bf1316b",
"is_public": true,
"deleted_at": "",
"id": "8ff7d98a-9beb-46d2-8977-39b29443a7b2",
"size": 2147483648
},
{
"status": "available",
"name": "Ubuntu orchestrator",
"checksum": "a99ecd32f79e28d723f4d73a2594406e6002c74ff3ae512de6feb06135b811a8",
"created_at": "2013-10-24 14:35:10",
"disk_format": "diskdump",
"updated_at": "2013-10-24 14:35:10",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"exclude_task_deletesshkeys": "yes",
"os": "ubuntu",
"root_partition": "1",
"description": "Ubuntu 13.04"
},
"location": "pithos://61e9793a-55b5-40d4-8bbc-0f8da2dddff0/images/ubuntu.diskdump",
"container_format": "bare",
"owner": "61e9793a-55b5-40d4-8bbc-0f8da2dddff0",
"is_public": true,
"deleted_at": "",
"id": "01a4b2f1-2acd-4031-8801-3d94ebe3f4d4",
"size": 4012126208
},
{
"status": "available",
"name": "scientificlinux",
"checksum": "1d6a6568aa3ae0ae685096a716c0ad5b98bb00e6cc635a339f00f9d332ca76ef",
"created_at": "2013-10-11 15:55:20",
"disk_format": "diskdump",
"updated_at": "2013-10-11 15:55:20",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Scientific Linux SL release 5.5 (Boron)",
"os": "scientificlinux",
"root_partition": "1",
"users": "root"
},
"location": "pithos://f43489df-0331-4302-83e4-554605c65f75/images/scientificlinux-201310111828.diskdump",
"container_format": "bare",
"owner": "f43489df-0331-4302-83e4-554605c65f75",
"is_public": true,
"deleted_at": "",
"id": "e9ec7d24-96a1-412d-8e05-569bac5744a4",
"size": 3278614016
},
{
"status": "available",
"name": "Ubuntu-server-13.04",
"checksum": "0bb01480c0db44a473b79dd3e4fb4f66a02de87d572e1cf083d193afeaf3f601",
"created_at": "2013-10-06 02:31:19",
"disk_format": "diskdump",
"updated_at": "2013-10-06 02:31:19",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu server 13.04",
"os": "ubuntu",
"root_partition": "1",
"users": "user"
},
"location": "pithos://11317487-1eb8-4669-bbb6-2ab6381f60f3/images/Ubuntu-server-13.04-201310051444.diskdump",
"container_format": "bare",
"owner": "11317487-1eb8-4669-bbb6-2ab6381f60f3",
"is_public": true,
"deleted_at": "",
"id": "545d36df-53da-46bd-86ed-759ac3eb1995",
"size": 1303494656
},
{
"status": "available",
"name": "ubuntu server 12.04 + asterisk voip server",
"checksum": "4d2fe46b7cd068d520773268cf25f78fdc85bfbe3c2f521d4b78b577fee7f087",
"created_at": "2013-10-05 22:19:00",
"disk_format": "diskdump",
"updated_at": "2013-10-05 22:19:00",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.3 LTS",
"os": "ubuntu",
"root_partition": "1",
"users": "user"
},
"location": "pithos://07d39ccb-beaa-4d24-a630-ad6f02f0a842/images/ubuntu server 12.04 + asterisk voip server-201310060104.diskdump",
"container_format": "bare",
"owner": "07d39ccb-beaa-4d24-a630-ad6f02f0a842",
"is_public": true,
"deleted_at": "",
"id": "0f12a5e0-5369-4bed-abd6-5b03d87cc5da",
"size": 1805869056
},
{
"status": "available",
"name": "archlinux",
"checksum": "58a69c601898ded320cce72d84f8dbe651e33fc5ea7435bd6c03da4798e92ec8",
"created_at": "2013-10-03 06:56:14",
"disk_format": "diskdump",
"updated_at": "2013-10-03 06:56:14",
"properties": {
"partition_table": "gpt",
"osfamily": "linux",
"users": "root",
"gui": "none",
"filesystem": "ext4",
"os": "archlinux",
"root_partition": "2",
"description": "03/10/2013"
},
"location": "pithos://736b4003-ed68-484b-9893-35928e44bc73/images/archlinux.diskdump",
"container_format": "bare",
"owner": "736b4003-ed68-484b-9893-35928e44bc73",
"is_public": true,
"deleted_at": "",
"id": "c9f3980d-6a82-4121-b24e-d7b5f29a4a00",
"size": 876949504
},
{
"status": "available",
"name": "Kubuntu LTS",
"checksum": "1bf3e14d72bfb340a83e54ccfd7137ee0af7092c6d5dbfcc99432b4cb892f0d3",
"created_at": "2013-09-28 07:35:45",
"disk_format": "diskdump",
"updated_at": "2013-09-28 07:35:45",
"properties": {
"partition_table": "msdos",
"kernel": "3.2.0",
"osfamily": "linux",
"users": "user",
"gui": "KDE 4.8.2",
"sortorder": "4",
"os": "kubuntu",
"root_partition": "1",
"description": "Kubuntu 12.04.3 LTS"
},
"location": "pithos://5e06c85e-166f-4dec-a5ff-f3931e80a48d/images/kubuntu-12.04-5-x86_64.diskdump",
"container_format": "bare",
"owner": "5e06c85e-166f-4dec-a5ff-f3931e80a48d",
"is_public": true,
"deleted_at": "",
"id": "e755d33c-92fc-4042-922e-ca03d8b3ecbd",
"size": 2707611648
},
{
"status": "available",
"name": "snf-test-db590326-0df1-464d-844f-a246d7ccac91.diskdump",
"checksum": "54dc540edb181326f5231195a859b07df0fd35736f245910d95fa34d73fd6b18",
"created_at": "2013-09-25 06:22:22",
"disk_format": "diskdump",
"updated_at": "2013-09-25 06:22:22",
"properties": {
"osfamily": "linux",
"root_partition": "1"
},
"location": "pithos://49e2cb58-b2e5-4daa-897b-38196765b913/images/snf-test-db590326-0df1-464d-844f-a246d7ccac91.diskdump",
"container_format": "bare",
"owner": "49e2cb58-b2e5-4daa-897b-38196765b913",
"is_public": true,
"deleted_at": "",
"id": "6d8996b6-d4d3-4a47-9b90-fa858a87a2c3",
"size": 550367232
},
{
"status": "available",
"name": "egi-accounting-portal",
"checksum": "01501439f30196b78d136e2951831d1887c3253c68997ffb89e80bd64861a553",
"created_at": "2013-09-13 10:50:17",
"disk_format": "diskdump",
"updated_at": "2013-09-13 10:50:17",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Scientific Linux release 6.3 (Carbon)",
"os": "scientificlinux",
"root_partition": "1",
"users": "root idiaz"
},
"location": "pithos://aaff1da5-2a98-4e16-ab27-37cb24d6062c/images/egi-accounting-portal.raw",
"container_format": "bare",
"owner": "aaff1da5-2a98-4e16-ab27-37cb24d6062c",
"is_public": true,
"deleted_at": "",
"id": "15feb8ee-98b1-4a9f-b048-1f5b287d8bcc",
"size": 45097156608
},
{
"status": "available",
"name": "ubuntu",
"checksum": "3544e9198b4bec7b9a12f7729dd88faf38c0bff4aae50637c3322f688ff9ef7e",
"created_at": "2013-08-21 10:04:30",
"disk_format": "diskdump",
"updated_at": "2013-08-21 10:04:30",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.2 LTS",
"os": "debian",
"root_partition": "1",
"users": "root"
},
"location": "pithos://8be365b4-5034-4edf-b2a8-eaa7ec51d911/images/ubuntu-201308211302.diskdump",
"container_format": "bare",
"owner": "8be365b4-5034-4edf-b2a8-eaa7ec51d911",
"is_public": false,
"deleted_at": "",
"id": "ae09428c-e99a-477a-b703-224bbd7e7cb6",
"size": 781930496
},
{
"status": "available",
"name": "BackTrack 5 R3",
"checksum": "72dac278887c0411dfbc5c772a695a6ee6f3c88843c3df1673128dc83e309144",
"created_at": "2013-08-05 01:33:25",
"disk_format": "diskdump",
"updated_at": "2013-08-05 01:33:25",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"swap": "5:605",
"os": "ubuntu",
"root_partition": "1",
"description": "Backtrack 5 R3 Gnome i386"
},
"location": "pithos://181a0935-57e6-41a0-ad47-7089f73d4e2c/images/BackTrack 5 R3-201308050412.diskdump",
"container_format": "bare",
"owner": "181a0935-57e6-41a0-ad47-7089f73d4e2c",
"is_public": true,
"deleted_at": "",
"id": "9f82e379-b111-4f72-8fbf-4fb37aa5ccc9",
"size": 11485241344
},
{
"status": "available",
"name": "Advcomparch@CSLab 2012-2013",
"checksum": "8d9b9ebaefd3add69de8d834ff90957472f2df72ca4b013130fb0083ca0e7bdf",
"created_at": "2013-04-23 12:39:31",
"disk_format": "diskdump",
"updated_at": "2013-04-23 12:39:31",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.10",
"os": "ubuntu",
"root_partition": "1",
"users": "user"
},
"location": "pithos://1ef1003b-0f94-4c89-9415-18b7a759e104/images/advcomparch_cslab_ubuntu.diskdump",
"container_format": "bare",
"owner": "1ef1003b-0f94-4c89-9415-18b7a759e104",
"is_public": true,
"deleted_at": "",
"id": "505dcadb-d978-4f2b-ba68-02fc69fb50a8",
"size": 5673857024
},
{
"status": "available",
"name": "ubuntu",
"checksum": "958a674f7f97a9e7456ec6b4db41e125c9c8c2213f5192ba442ad88524517097",
"created_at": "2013-04-23 09:58:27",
"disk_format": "diskdump",
"updated_at": "2013-04-23 09:58:27",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.10",
"os": "ubuntu",
"root_partition": "1",
"users": "user"
},
"location": "pithos://a7e3f286-943a-4d2d-835a-ab8df14646a7/images/ubuntu-201304231229.diskdump",
"container_format": "bare",
"owner": "a7e3f286-943a-4d2d-835a-ab8df14646a7",
"is_public": true,
"deleted_at": "",
"id": "90554939-41c9-42e6-b654-1e167743c950",
"size": 11523715072
},
{
"status": "available",
"name": "Kali Linux (former BackTrack)",
"checksum": "e1fdc270c55f72f781e8ebba13820a5e2d8e02c8f3ef1d77faac8ec4be657b65",
"created_at": "2013-04-13 09:32:02",
"disk_format": "diskdump",
"updated_at": "2013-04-13 09:32:02",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"swap": "5:466",
"os": "debian",
"root_partition": "1",
"description": "Kali Linux 1.0 - Former BackTrack5R3 (with update option)"
},
"location": "pithos://4de95599-8065-45a6-96e1-2dd2ed4015df/images/Kali Linux (former BackTrack)-201304131215.diskdump",
"container_format": "bare",
"owner": "4de95599-8065-45a6-96e1-2dd2ed4015df",
"is_public": true,
"deleted_at": "",
"id": "c9e811fa-39a9-4d13-8a6f-9102105801cb",
"size": 7766769664
},
{
"status": "available",
"name": "BackTrack5R3",
"checksum": "6ca2c0f28026c5a73d355b878281e54f475c8da2edb09b072e7d218a4ba84d4a",
"created_at": "2013-04-11 22:59:24",
"disk_format": "diskdump",
"updated_at": "2013-04-11 22:59:24",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"swap": "5:564",
"os": "ubuntu",
"root_partition": "1",
"description": "BackTrack5R3 w/ SSH & Correct Locale"
},
"location": "pithos://4de95599-8065-45a6-96e1-2dd2ed4015df/images/BackTrack5R3-201304120130.diskdump",
"container_format": "bare",
"owner": "4de95599-8065-45a6-96e1-2dd2ed4015df",
"is_public": true,
"deleted_at": "",
"id": "e5a74e94-890b-44cc-8951-0786eeef7140",
"size": 11783667712
},
{
"status": "available",
"name": "Kali-Linux-Gnome-amd64",
"checksum": "cd4aa49026f4fb791442243e1429239c7e5a0027d83aecf380c41b8fee7bd804",
"created_at": "2013-04-09 14:04:33",
"disk_format": "diskdump",
"updated_at": "2013-04-09 14:04:33",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"swap": "5:466",
"os": "debian",
"root_partition": "1",
"description": "Kali Linux 1.0.2 Gnome 64"
},
"location": "pithos://a4809bc1-7278-4722-883c-817e4e8367b1/images/Kali-Linux-Gnome-amd64-201304091627.diskdump",
"container_format": "bare",
"owner": "a4809bc1-7278-4722-883c-817e4e8367b1",
"is_public": true,
"deleted_at": "",
"id": "6f88c581-1e30-4ad6-8de9-330d03fad0a8",
"size": 7716986880
},
{
"status": "available",
"name": "PANDORA Ubuntu 12.04",
"checksum": "6699cf250d4b920005fa26f98240d98b30d9d3eb50d51d12ebf59092b223149f",
"created_at": "2013-03-21 19:32:01",
"disk_format": "diskdump",
"updated_at": "2013-03-21 19:32:01",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.2 LTS",
"os": "ubuntu",
"root_partition": "1",
"users": "user"
},
"location": "pithos://2bcf1f3d-6faf-49af-be7c-3772d708de3e/images/pandora_ubuntu_12_04.diskdump",
"container_format": "bare",
"owner": "2bcf1f3d-6faf-49af-be7c-3772d708de3e",
"is_public": true,
"deleted_at": "",
"id": "aaafe1de-edfe-4f29-8c3f-50707ccd7d0a",
"size": 5000081408
},
{
"status": "available",
"name": "Ubuntu-10.04",
"checksum": "7e2f5a282a936b47d27e26c1a9926be8b7df41c072e72addecbe2c452582bd7f",
"created_at": "2013-03-21 13:47:11",
"disk_format": "diskdump",
"updated_at": "2013-03-21 13:47:11",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 10.04.4 LTS",
"os": "ubuntu",
"root_partition": "1",
"users": "nemo"
},
"location": "pithos://1f0a0cb2-12f6-440b-854f-87489e45e682/images/Ubuntu-10.04.4.diskdump",
"container_format": "bare",
"owner": "1f0a0cb2-12f6-440b-854f-87489e45e682",
"is_public": true,
"deleted_at": "",
"id": "917ee618-c03a-4473-9024-9448e12890c1",
"size": 761368576
},
{
"status": "available",
"name": "ubuntu",
"checksum": "e277e73ac70e94f951ac31b9fc859ced696234d2fd91b887d83daf822d7e9a88",
"created_at": "2013-03-19 15:56:47",
"disk_format": "diskdump",
"updated_at": "2013-03-19 15:56:47",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.2 LTS",
"os": "ubuntu",
"root_partition": "1",
"users": "user"
},
"location": "pithos://8be365b4-5034-4edf-b2a8-eaa7ec51d911/images/ubuntu-201303191752.diskdump",
"container_format": "bare",
"owner": "8be365b4-5034-4edf-b2a8-eaa7ec51d911",
"is_public": true,
"deleted_at": "",
"id": "5583fed1-5273-4c64-9e32-3fbe476bd7b7",
"size": 2622562304
},
{
"status": "available",
"name": "Archlinux",
"checksum": "1a126aad07475b43300448b0b26478391094bc07bcc1959b446344211be13974",
"created_at": "2013-01-28 22:44:55",
"disk_format": "diskdump",
"updated_at": "2013-01-28 22:44:55",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"users": "root",
"exclude_task_assignhostname": "yes",
"os": "archlinux",
"root_partition": "1",
"description": "Archlinux base install 2012.12.01"
},
"location": "pithos://4df24393-d83d-4b0e-ab00-0f32684a2de4/images/archlinux.12.2012",
"container_format": "bare",
"owner": "4df24393-d83d-4b0e-ab00-0f32684a2de4",
"is_public": true,
"deleted_at": "",
"id": "b4713f20-3a41-4eaf-81ae-88698c18b3e8",
"size": 752782848
},
{
"status": "available",
"name": "ubuntu",
"checksum": "f3703675b311604a9d37f88a0de4a9bc5550a1e65f8f6b1d01605604868accf2",
"created_at": "2013-01-23 16:15:22",
"disk_format": "diskdump",
"updated_at": "2013-01-23 16:15:22",
"properties": {
"partition_table": "msdos",
"osfamily": "linux",
"description": "Ubuntu 12.04.1 LTS",
"os": "ubuntu",
"root_partition": "1",
"users": "user"
},
"location": "pithos://8be365b4-5034-4edf-b2a8-eaa7ec51d911/images/ubuntu-201301231811.diskdump",
"container_format": "bare",
"owner": "8be365b4-5034-4edf-b2a8-eaa7ec51d911",
"is_public": true,
"deleted_at": "",
"id": "5ed5a29b-292c-4fe0-b32c-2e2b65628635",
"size": 2578100224
}
];

;var statusActionsNetwork = {
    'error'      : {
        enabledActions : ['destroy'],
    },
    'building'      : {
        enabledActions : [],
    },
    'running'      : {
        enabledActions : ['destroy'],
    },
    'starting'      : {
        enabledActions : ['destroy'],
    },
    'shutting'      : {
        enabledActions : ['destroy'],
    },
};

Snf.Network = DS.Model.extend({

    name       : DS.attr(),
    status     : DS.attr(),
    ports      : DS.hasMany('port', { async:true }),
    project    : DS.belongsTo('project',{ async:true}),

    enabledActions: function() {
        return statusActionsNetwork[this.get('status')].enabledActions;
    }.property('status'),

    _vms: function() {
        var self = this;

        this.set('vms', this.get('ports').getEach('vm').filter(function(p) {
            if (!p) { return false; }
            var fp = p.get('isFulfilled');

            if (!fp) {
                p.then(function(n) {
                    self._vms();
                });
            }
            return p.get('isFulfilled');
        }).map(function(p) {
            return p.content;
        }).uniq());

    }.observes('ports.@each.vm'),

    vms: Ember.A(),

});


Snf.Network.FIXTURES = [
    {
        id: 1,
        name: 'Network 1',
        status: 'running',
        ports: [1,3,4,6],
        project: 1,
    },
    {
        id: 2,
        name: 'Network 2',
        status: 'building',
        ports: [2,5],
        project: 2,
    },
    {
        id: 3,
        name: 'Network 3',
        status: 'error',
        project: 3,
    },
];
;Snf.Port = DS.Model.extend({

    vm         : DS.belongsTo('vm', {async:true}),
    network    : DS.belongsTo('network', {async:true}),
    firewall   : DS.attr(),
    ipv4       : DS.attr(),
    ipv6       : DS.attr(),

    // firewallState can be off or on
    firewallState: function() {
        var state = 'off';
        if ( _.contains(['on','partial'], this.get('firewall')) ) { state='on'; }
        return state;
    }.property('firewall'),


});


Snf.Port.FIXTURES = [
    {
        id: 1,
        vm: 1,
        network: 1,
        firewall: 'on',
        ipv4: '83.212.96.12',
    },
    {
        id: 2,
        vm: 1,
        network: 2,
        firewall: 'partial',
        ipv4: '83.212.96.30',
    },
    {
        id: 3,
        vm: 2,
        network: 1,
        firewall: 'off',
        ipv4: '83.212.96.00',
    },
    {
        id: 4,
        vm: 3,
        network: 1,
        firewall: 'on',
        ipv6: 'FE80:0000:0000:0000:0202:B3FF:FE1E:8329',
    },
    {
        id: 5,
        vm: 3,
        network: 1,
        firewall: 'on',
        ipv6: '2001:0db8:85a3:0042:1000:8a2e:0370:7334'
    },
    {
        id: 6,
        vm: 1,
        network: 1,
        firewall: 'on',
        ipv6: ' 2001:0db8:85a3:0042:1000:8a2e:0370:7334',
    },
];
;Snf.Project = DS.Model.extend({
    name      : DS.attr(),
    vms       : DS.hasMany('vm', { async:true }),
});

Snf.Project.FIXTURES = [
    {
        id: 1,
        name: 'Awesome Project',
        vms: [1,5],
    },
    {
        id: 2,
        name: 'Project 2',
        vms: [2,6],
    },
    {
        id: 3,
        name: 'Project 3',
        vms: [3,7],
    },
    {
        id: 4,
        name: 'Project 4',
        vms: [4]
    },
];;Snf.Tag = DS.Model.extend({

    name     : DS.attr(),
    color    : DS.attr(),
    vm       : DS.belongsTo('vm', { async:true }),

});


Snf.Tag.FIXTURES = [
    {
        id: 1,
        name: 'hacking',
        color: '#1E96FF',
        vm: 1,
    },
    {
        id: 2,
        name: 'movies',
        color: '#FFCB44',
        vm: 1,
    },
    {
        id: 3,
        name: 'dev',
        color: '#DF2F74',
        vm: 1,
    },
    {
        id: 4,
        name: 'var',
        color: '#F76720',
        vm: 2,
    },
    {
        id: 5,
        name: 'hacking',
        color: '#1E96FF',
        vm: 2,
    },
    {
        id: 6,
        name: 'movies',
        color: '#FFCB44',
        vm: 2,
    },
    {
        id: 7,
        name: 'dev',
        color: '#DF2F74',
        vm: 3,
    },
    {
        id: 8,
        name: 'dev',
        color: '#DF2F74',
        vm: 4,
    },
    {
        id: 9,
        name: 'dev',
        color: '#DF2F74',
        vm: 5,
    }
];
;var statusActionsVm = {
    'off'      : {
        enabledActions : ['connect', 'start', 'destroy', ],
    },
    'error'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'building'      : {
        enabledActions : ['connect'],
    },
    'running'      : {
        enabledActions : ['connect', 'reboot', 'shutdown', 'destroy','connect', 'reboot',  ],
    },
    'rebooting'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'starting'      : {
        enabledActions : ['connect', 'destroy'],
    },
    'shutting'      : {
        enabledActions : ['connect', 'destroy'],
    },
};

Snf.Vm = DS.Model.extend({

    name      : DS.attr(),
    status    : DS.attr(),
    os        : DS.attr(),
    hostname  : DS.attr(),
    created   : DS.attr('date'),
    updated   : DS.attr('date'),
    tags      : DS.hasMany('tag', { async:true }),
    volumes   : DS.hasMany('volume', { async:true}),
    ports     : DS.hasMany('port', { async: true}),
    project   : DS.belongsTo('project',{ async:true}),
    
    enabledActions: function() {
        return statusActionsVm[this.get('status')].enabledActions;
    }.property('status'),


    _networks: function() {
        var self = this;

        this.set('networks', this.get('ports').getEach('network').filter(function(p) {
            // wait until ports are loaded
            if (!p) { return false; }
            var fp = p.get('isFulfilled');

            // if ports are not Fulfilled, wait until they actually are loaded
            // and then call again _networks()
            if (!fp) {
                p.then(function(n) {
                    self._networks();
                });
            }

            return p.get('isFulfilled');
        }).map(function(p) {
            // console.log(p.toString());
            // p returns promise whereas p.content returns a network
            return p.content;
        }).uniq());

    // recalculate _networks when a network of a port changes
    }.observes('ports.@each.network'),

    // networks is a VM computed property
    /* From ember.Array documentation:
    When you are designing code that needs to accept any kind of Array-like
    object, you should use these methods instead of Array primitives because
    these will properly notify observers of changes to the array.*/
    networks: Ember.A(),
});


Snf.Vm.FIXTURES = [
    {
        created: '2011-04-19T10:18:52.085737+00:00',
        id: 1,
        name: "The answer to everything",
        os: 'windows',
        status: "running",
        hostname: 'http://www.in.gr',
        updated: "2011-05-29T14:07:07.037602+00:00",
        tags: [1,2,3],
        volumes: [1,2],
        ports: [1,2,6],
        project: 1,
    },
    {
        id: 2,
        name: 'My even cooler VM 2 that has a long name',
        status: 'error',
        os: 'unknown',
        hostname: "user@snf-38389.vm.okeanos.grnet.gr",
        updated: "2011-05-29T14:07:07.037602+00:00",
        tags: [4,5,6],
        volumes: [3],
        ports: [3],
        project: 2,
    },
    {
        id: 3,
        name: 'vm name 3 really large name vm name vm 1 really large name vm',
        status: 'building',
        os: 'windows',
        hostname: "user@snf-38389.vm.okeanos.grnet.gr",
        tags: [7],
        ports: [4,5],
        project: 3,
    },
    {
        id: 4,
        name: 'So awesome VM 4',
        status: 'off',
        os: 'fedora',
        tags: [8],
        project: 4,
    },
    {
        id: 5,
        name: 'olga',
        status: 'rebooting',
        os: 'kubuntu',
        tags: [9],
        project: 1,
    },
    {
        id: 6,
        name: 'athina',
        status: 'starting',
        os: 'kubuntu',
        project: 2,
    },
    {
        id: 7,
        name: 'kpap',
        status: 'shutting',
        os: 'kubuntu',
        project: 3,
    },
];
;var statusActionsVolume = {
    'error'      : {
        enabledActions : ['destroy'],
    },
    'building'      : {
        enabledActions : [],
    },
    'running'      : {
        enabledActions : ['destroy'],
    },
    'starting'      : {
        enabledActions : ['destroy'],
    },
};

Snf.Volume = DS.Model.extend({

    name        : DS.attr(),
    status      : DS.attr(),
    size        : DS.attr('number'),
    storageType : DS.attr('string', {defaultValue: 'Archipelago'}),
    vm          : DS.belongsTo('vm', { async:false }),
    project     : DS.belongsTo('project',{ async:true}),

    enabledActions: function() {
        return statusActionsVolume[this.get('status')].enabledActions;
    }.property('state'),

});


Snf.Volume.FIXTURES = [
    {
        id: 1,
        name: 'Ο αγαπημένος μου δίσκος',
        status: 'running',
        size: 10737418240,
        vm: 1,
        project: 1,
    },
    {
        id: 2,
        name: 'Crypto',
        status: 'running',
        size: 2048,
        vm: 1,
        project: 1,
    },
    {
        id: 3,
        name: 'Disk 3',
        status: 'starting',
        size: 4096,
        storageType: 'drpd',
        vm: 3,
        project: 1,
    },
];
;Snf.Router.map(function() {

    this.resource('vms', { path: '/vms/:view_cls' });
    this.resource('vmsCreate', { path: '/vms/create' });
    this.resource('vminit', { path: '/vm'});
    this.resource('vm', { path: '/vm/:vm_id' }, function () {
        this.route('info');
        this.route('disk-connected');
        this.route('network-connected');
    });

    this.resource('networks', {path: '/networks/:view_cls'});
    this.resource('networksCreate', { path: '/networks/create' });
    this.resource('networkinit', { path: '/network'});
    this.resource('network', { path: '/network/:network_id' }, function () {
        this.route('info');
        this.route('vm-connected');
    });

    this.resource('volumes', {path: '/volumes/:view_cls'});
    this.resource('volumesCreate', { path: '/volumes/create' });
    this.resource('volumeinit', { path: '/volume'});
    this.resource('volume', { path: '/volume/:volume_id' }, function () {
       this.route('info');
       this.route('vm-connected');
    });

});;Snf.ApplicationRoute = Ember.Route.extend({
    actions: {
        openModal: function(modalName, controller, model) {

            this.controllerFor(controller).set("model", model);
            this.render('modals/'+modalName, {
                into: 'application',
                outlet: 'modal',
                controller: controller,
            });
            $('#app-modal').foundation('reveal','open');
        },
    }
});


Snf.ElemsRoute = Ember.Route.extend({
    
    modelName: '',

    model: function(params){
        this.set( 'viewCls', params.view_cls );
        var controller = this.get("controller");

        // Ember checks if controller is already set, and if so, does not set it
        // up again. Hence, the following hack:
        if (controller) {
            controller.set("viewCls", params.view_cls);
        }

        // end of hack
        return this.store.find(this.modelName);
    },
    
    renderTemplate: function() {
        this.render('elems');
    },
   
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set("viewCls", this.get("viewCls"));
        controller.set('modelName', this.modelName);
    },
    
    actions: {
        openWizard: function() {
            var wizardType = this.routeName;
            this.transitionTo(wizardType+'Create');
        }
    }

});
;Snf.NetworksRoute = Snf.ElemsRoute.extend({
    modelName: 'network',
});

Snf.NetworkRoute = Ember.Route.extend({
    renderTemplate: function() {

        this.render('details');

        var controller = this.controllerFor('networks');
        if (!controller.get('model').get("length")) {
            controller.set('model',this.store.find('network'));
        }

        this.render('lt-bar', {
            into: 'details',
            outlet: 'lt-bar',
            controller: controller,
        });
    },
});

Snf.NetworkIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        if ( Snf.get('currentPath') == 'network.vm-connected' ) {
            this.transitionTo('network.vm-connected');
        } else {
            this.transitionTo('network.info');
        }
    },
});

Snf.NetworkinitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('network');
    },

    afterModel: function(model) {
       this.transitionTo('network', model.get('firstObject').id);
    },
});

Snf.NetworkInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/network-info');
    },
    model: function () {
        return this.modelFor("network");
    },
});

Snf.NetworkVmConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/network-vm-connected');
    },
    model: function () {
        return this.modelFor("network");
    }
});
;Snf.VmsRoute = Snf.ElemsRoute.extend({
    modelName: 'vm',
});

Snf.VmRoute = Ember.Route.extend({
    renderTemplate: function() {

        this.render('details');

        var controller = this.controllerFor('vms');
        if (!controller.get('model').get("length")) {
            controller.set('model',this.store.find('vm'));
        }

        this.render('lt-bar', {
            into: 'details',
            outlet: 'lt-bar',
            controller: controller,
        });
    },
});

Snf.VmIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        if ( Snf.get('currentPath') == 'vm.disk-connected' ) {
            this.transitionTo('vm.disk-connected');
        } else if ( Snf.get('currentPath')=='vm.network-connected' ) {
            this.transitionTo('vm.network-connected');
        } else {
            this.transitionTo('vm.info');
        }
    },
});

Snf.VminitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('vm');
    },
    
    afterModel: function(model) {
        this.transitionTo('vm', model.get('firstObject').id);
    },
});

Snf.VmInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/vm-info');
    },
    model: function () {
        return this.modelFor("vm");
    },
});

Snf.VmDiskConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/vm-disk-connected');
    },
    model: function () {
        return this.modelFor("vm");
    }
});

Snf.VmNetworkConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/vm-network-connected');
    },
    model: function () {
        return this.modelFor("vm");
    }
});
;Snf.VolumesRoute = Snf.ElemsRoute.extend({
    modelName: 'volume',
});

Snf.VolumeRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details');

        var controller = this.controllerFor('volumes');
        if (!controller.get('model').get("length")) {
            controller.set('model',this.store.find('volume'));
        }

        this.render('lt-bar', {
            into: 'details',
            outlet: 'lt-bar',
            controller: controller,
        });
    },
});


Snf.VolumeIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        if ( Snf.get('currentPath') == 'volume.vm-connected' ) {
            this.transitionTo('volume.vm-connected');
        } else {
            this.transitionTo('volume.info');
        }
    },
});


Snf.VolumeinitRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('volume');
    },
    afterModel: function(model) {
       this.transitionTo('volume', model.get('firstObject').id);
    },
});

Snf.VolumeInfoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/volume-info');
    },
    model: function () {
        return this.modelFor("volume");
    },
});

Snf.VolumeVmConnectedRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('details/volume-vm-connected');
    },
    model: function () {
        return this.modelFor("volume");
    }
});
;Snf.VmsCreateRoute = Ember.Route.extend({
    init: function() {
        this._super();
        console.log('init of VmsCreateRoute');
    },
    renderTemplate: function(controller) {
        this.render('wizardVm', {controller: controller}); // view
    },
    setupController: function(controller) {
        controller.set('image', this.store.find('image'));
        controller.set('account', this.store.find('account', 1));
    },
    actions: {
        closeWizard: function() {
            history.back();
        }
    }
});;Snf.AddTagView = Ember.View.extend({

    classNames: ['add-tag'],
    templateName: 'add-tag',

    didInsertElement: function() {
        $('#colorpicker').farbtastic('#color');
    },
    
});
;Snf.FirewallView = Ember.View.extend({

    tagName: 'div',
    classNames: ['firewall'],
    templateName: 'firewall',
    didInsertElement: function () {
        this.$().mouseenter(function(e){
            $(this).css('z-index',2);
            $(this).find('.more').stop(true, true).slideDown(200);
        });
        this.$().mouseleave(function(e){
            $(this).css('z-index',1);
            $(this).find('.more').stop(true, true).slideUp(200);
        });
    },
});
;Snf.ItemsListLtBarView = Ember.View.extend({

    tagName: 'div',
    classNames: ['lt-bar'],
    templateName: 'items-list-lt-bar',
    didInsertElement: function () {
        ui.setElminHeight(this.$());
    }

});
;Snf.ItemsListView = Ember.View.extend({

    tagName: 'ul',
    classNames: ['items-list'],
    templateName: 'items-list',

});
;Snf.scrollWrapView = Ember.View.extend({
    tagName: 'div',
    classNames: ['scroll-wrap scroll-pane-arrows'],
    templateName: 'scroll-wrap',
    didInsertElement: function() {
        ui.setElHeight(this.$());
    },
});
;Snf.tagsListView = Ember.View.extend({
    tagName: 'ul',
    classNames: ['tags'],
    templateName: 'tags-list',
});
;Snf.toggleLtBarView = Ember.View.extend({
    tagName: 'a',
    classNames: ['toggle-lt-bar'],
    templateName: 'toggle-lt-bar',

    didInsertElement: function() {
        var that = this;
        this.$().click(function (e) {
            that.aux_function(400,e);
        });
        this.$().find('img-wrap a').click(function(e) {
            // TODO: hide list
        });
    },

    aux_function: function (speed,e) {
        e.preventDefault();
        e.stopPropagation();
        this.listToggle(speed,e);
    },

    listToggle: function (speed,e) {
        var cmarg = parseInt($('.lt-bar').width()) - parseInt($('.toggle-lt-bar').outerWidth(true));        
        var ctemp = cmarg / parseInt($('.lt-bar').width());
        var cvelocity = parseInt($('.lt-bar').width())/speed;
        var cdelay = parseInt($('.toggle-lt-bar').outerWidth(true))/cvelocity;
        var self =this;
        var marg = '';

        if($(this).hasClass('fix-position')) {
            marg = parseInt($(self).css('marginLeft')) - cmarg;
            $(this).animate({
                'margin-left': marg,
            }, ctemp * speed, 'linear', function(){
                $(self).removeAttr('style');
                $(self).removeClass('fix-position');
            });
            $('.lt-bar').animate({
                width: 'toggle'
            }, speed, 'linear');
        }
        else {
            $(this).addClass('fix-position');
            var scrollBarWidth = 14;
            marg = parseInt($(self).css('marginLeft')) + cmarg - scrollBarWidth;
            setTimeout(function(){
                $(self).animate({
                    'margin-left': marg,
                }, speed, 'linear');
            }, cdelay);
            $('.lt-bar').animate({
                width: 'toggle'
            }, speed, 'linear', ui.setCustomScrollBar);
        }
    }

});;/* Wizard View */

Snf.WizardVmView = Ember.View.extend({
	tagName: 'section',
	classNames: ['overlay-area-custom'],
	templateName: 'wizard/wizard-vm',
	didInsertElement: function() {
        $('body').addClass('with-overlay');
		this.$().fadeIn(100);
        this.$().find('.wizard').fadeIn('slow');
	},
	willDestroy: function() {
		$('body').removeClass('with-overlay');
	},
	counter: function() {
		return Snf.wizards.get('vm').get('stepsLength');
	}.property(),
	init: function() {
		this._super();
	},
	moveSteps: function() {
		if(this.get('isVisible')) {
			var onMove = this.get('controller').get('onMove');
			if(onMove) {
				var el = this.$();
				var self = this;

				var elCurrent = el.find('.step.current');
				var totalSteps = this.get('controller').get('totalSteps');

				var elSteps = el.find('.step');
				var elToDisplay;

				var pastCurrentStep = this.get('controller').get('currentStep');
				var newCurrentStep;

				var direction = this.get('controller').get('directionMove');
				var pos = (direction==='next')?(100):(-100);
				if(direction === 'next')
					newCurrentStep = ++pastCurrentStep;
				else if(direction === 'prev')
					newCurrentStep = --pastCurrentStep;

				if(direction === 'next') {
					elToDisplay = el.find('.step.next');
				}
				else {
					elToDisplay = el.find('.step.prev');
				}

				$('body').css('overflow', 'hidden');

				elToDisplay.css({
					left: pos.toString()+'%'
				}).addClass('current');

				elToDisplay.css({
					top: document.body.scrollTop + 'px'
				});

				elSteps.animate({
					marginLeft: (-pos).toString() + '%'
				},{
					complete: _.bind(function() {
						elCurrent.removeClass('current');
						window.scroll(0, 0);
						elToDisplay.css({
							left: '0',
							top: '0'
						});
						elSteps.css({
							marginLeft: '0'
						});
						$('body').css('overflow', 'visible');
						this.get('controller').set('currentStep',newCurrentStep);
						this.get('controller').set('onMove', false);
					}, this)
				});
			}
		}
	}.observes('controller.onMove'),
});


/* Steps */

Snf.WizardStepView = Ember.View.extend({
	index: 0,
	classNameBindings: ['isCurrent:current::', 'isNext:next::', 'isPast:past::', 'isFirst:preselected::', 'stepWithNum'],
	classNames: ['step'],
	templateName: function() {
		var stepNum = this.get('index')+1;
		return 'wizard/step-'+stepNum;
	}.property('this.index'),
	stepWithNum: function() {
		var stepNum = this.get('index')+1;
		return 'step-'+stepNum;
	}.property(),
	isCurrent: function() {
		return this.get('index') === this.get('controller').get('controllers.vmsCreate').get('currentStep');
	}.property('controller.controllers.vmsCreate.currentStep'),
	isPast: function() {
		return this.get('index') < this.get('controller').get('controllers.vmsCreate').get('currentStep');
	}.property('controller.controllers.vmsCreate.currentStep'),
	isNext: function() {
		return this.get('index') === (this.get('controller').get('controllers.vmsCreate').get('currentStep')+1);
	}.property('controller.controllers.vmsCreate.currentStep'),
	isFirst: function() {
		return this.get('index') === 0;
	}.property('controller.controllers.vmsCreate.currentStep'),
});

Snf.WizardVmStep1View = Snf.WizardStepView.extend({
	index: 0,
});

Snf.WizardVmStep2View = Snf.WizardStepView.extend({
	index: 1
});

Snf.WizardVmStep3View = Snf.WizardStepView.extend({
	index: 2,
});

Snf.WizardVmStep4View = Snf.WizardStepView.extend({
	index: 3
});


/* Views in step-1 */

Snf.WizardImageView = Ember.View.extend({
	tagName: 'li',
	templateName: 'wizard/image-view',
	classNames: ['image'],
	classNameBindings: ['type', 'isVisibleCategory:current-category::', 'isCurrent:current::'],
	imageData: function(){
		// is there another way to extract all the data?
		return Ember.Object.create(this.get('image').get('data'));
	}.property('this.image'), // ??
	type: function() {
		var type;
		var imageOwnerID = this.get('imageData').get('owner');
		var isPublic = this.get('imageData').get('is_public');
		var currentUserID = this.get('controller').get('account');
		if(isPublic) {
			if(currentUserID === imageOwnerID)
				type = 'my-image';
			else
				Snf.SystemUUIDs.forEach(function(item) {
						if(item === imageOwnerID) type = 'system-image';
						else type = 'public-image';
				});
		}
		else {
			if(currentUserID === imageOwnerID)
				type = 'my-image';
			else
				type = 'shared-with-me';
		}
		return type;
	}.property('imageData'), // ??

	ownerEmail: function(){
		var ownerUUId = this.get('imageData').get('owner');
		var ownerEmail = Snf.AccountsUUIDs.get(ownerUUId);
		if(this.get('type') !== 'system')
			return 'system';
		else
			return ownerEmail;
	}.property('this.image'), //??
	didInsertElement: function() {
		this.toggleDetailsArea();
		// this.selectImage();
	},
	toggleDetailsArea: function() {
		var btnDetails = this.$().find('.btn-col a');
		btnDetails.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			btnDetails.toggleClass('current');
			btnDetails.parents('li').find('.details').stop().slideToggle();
		});
	},
	isVisibleCategory: function() {
		return (this.get('type') === this.get('controller').get('controllers.vmsCreate').get('showImageCategory'));
	}.property('controller.controllers.vmsCreate.showImageCategory'),
	click: function(e) {
			e.preventDefault();

			this.set('isCurrent',!this.get('isCurrent'));
			console.log('selected image ', this.get('imageData').get('id'));
			this.get('controller').send('newVmConf', 'image', this.get('imageData').get('id'));
		}
 });


/* Headers */

Snf.WizardHeaderView = Ember.View.extend({
	tagName: 'li',
	templateName: 'wizard/header',
	classNameBindings: ['isCurrent:current::', 'isPast:past::', 'isFirst:preselected::','isMoving:hide-el::'],
	index: function() {
		// not good approach for big collections/arrays
		var headers = this.get('controller').get('headers');
		var header = this.get('context');
		return headers.indexOf(header);
	}.property(),
	indexToDisplay: function() {
		return this.get('index')+1;
	}.property('this.index'),
	isCurrent: function() {
		return this.get('index') === this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
	isFirst: function() {
		return this.get('index') === 0;
	}.property('controller.currentStep'),
	isMoving: function() {
		// the currentStep changes after the movement of the steps is over
		if(this.get('isCurrent')) {
			return this.get('controller').get('onMove');
		}
		else
			return false;
	}.property('controller.onMove'),
	isPast: function() {
		return this.get('index') < this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
});



/* Menus */

Snf.WizardMenuView = Ember.View.extend({
	tagName: 'nav',
	classNames: ['menu'],
	classNameBindings: ['isCurrent:current::', 'isMoving:hide-el::'],
	templateName: 'wizard/menu',
	index: function() {
		// not good approach for big collections/arrays
		var menus = this.get('controller').get('menus');
		var menu = this.get('context');
		return menus.indexOf(menu);
	}.property(),
	isCurrent: function() {
		return this.get('index') === this.get('controller').get('currentStep');
	}.property('controller.currentStep'),
	isMoving: function() {
		// the currentStep changes after the movement of the steps is over
		if(this.get('isCurrent')) {
			return this.get('controller').get('onMove');
		}
		else
			return false;
	}.property('controller.onMove')
});

// ['System', 'My images', 'Shared with me', 'Public']
// ['Small', 'Medium', 'large']
Snf.WizardMenuOptionView = Ember.View.extend({
	tagName: 'li',
	classNameBindings: ['isCurrent:current::', 'isEnabled::disabled'],
	templateName: 'wizard/menu-option',
	menuAction: function() {
		return this.get('parentView').get('context.actionName');
	}.property(),
	actionValue: function() {
		var description = this.get('context').toString();
		console.log('description ', description);
		switch (description) {
			case 'System': return 'system-image';
			case 'My images': return 'my-image';
			case 'Shared with me': return 'shared-with-me';
			case 'Public': return 'public-image';
		}
	}.property(),
	isCurrent: function() {
		console.log("this.get('actionValue') ", this.get('actionValue'));
		console.log("this.get('controller').get('showImageCategory') ", this.get('controller').get('showImageCategory'));
		return (this.get('actionValue') === this.get('controller').get('showImageCategory'));
	}.property('controller.showImageCategory'),
	isEnabled: true
});

/* Navigation Arrows */

// The only buttons that are views are the buttons that move the wizard
// The reason is that they shouldn't be isolated from the surrounding
// (Their labels changes depanding the current step)
Snf.WizardBtnBackView = Ember.View.extend({
	classNames: ['nav', 'prev'],
	tagName: 'a',
	templateName: 'components/btn-span',
	content: function(){
		return this.get('controller').get('btnLeftLabel');
	}.property('controller.btnLeftLabel'),
	click: function() {
		this.get('controller').send('moveBack');
	}
});

Snf.WizardBtnNextView = Ember.View.extend({
	classNames: ['nav', 'next'],
	tagName: 'a',
	templateName: 'components/btn-span',
	content: function(){
		return this.get('controller').get('btnRightLabel');
	}.property('controller.btnRightLabel'),
	click: function() {
		this.get('controller').send('moveNext');
	}
});