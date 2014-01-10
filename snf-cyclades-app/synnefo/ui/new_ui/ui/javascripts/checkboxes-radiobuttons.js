/*
* functions concerning checkboxes and radiobuttons links
*/



ui.checkbox = {
    changeState : function(checkbox_link) {
        $(checkbox_link).find('.snf-checkbox-unchecked, .snf-checkbox-checked').toggleClass('snf-checkbox-unchecked snf-checkbox-checked');
        $(checkbox_link).closest('li').toggleClass('selected');
    },
    check : function(checkbox_link) {
        $(checkbox_link).find('span').removeClass('snf-checkbox-unchecked').addClass('snf-checkbox-checked');
        $(checkbox_link).closest('li').addClass('selected');
    },
    uncheck : function(checkbox_link) {
        $(checkbox_link).find('span').removeClass('snf-checkbox-checked').addClass('snf-checkbox-unchecked');
        $(checkbox_link).closest('li').removeClass('selected');
    },

    reset: function(area) {
        $(area).find('.snf-radio-checked').not('.prechecked').toggleClass('snf-radio-checked snf-radio-unchecked');
        $(area).find('.snf-radio-unchecked.prechecked').toggleClass('snf-radio-checked snf-radio-unchecked');
    }

}

ui.radiobtn = {
    changeState: function(radiobtn_link) {
        $(radiobtn_link).find('span.snf-radio-unchecked, span.snf-radio-checked').toggleClass('snf-radio-unchecked snf-radio-checked');
        $(radiobtn_link).closest('li').addClass('selected');
    },
    obtainOneChecked : function(radiobtn_link) {
        $(radiobtn_link).closest('ul').find('li').removeClass('selected');
        $(radiobtn_link).closest('ul').find('span.snf-radio-checked').toggleClass('snf-radio-unchecked snf-radio-checked');
    },
    reset : function(area) {
        $(area).find('.snf-checkbox-checked').not('.prechecked').toggleClass('snf-checkbox-checked snf-checkbox-unchecked');
        $(area).find('.snf-checkbox-unchecked.prechecked').toggleClass('snf-checkbox-checked snf-checkbox-unchecked');
    }

}

    $(document).ready(function(){

        // checkboxes binds

        $('.check').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            ui.checkbox.changeState(this);
            ui.entitiesActionsEnabled();
        });

        $('.lt-bar .select .check').click(function(e) {
            $(this).siblings('em').toggle();
            if ( $(this).find('span').hasClass('snf-checkbox-unchecked')){
                ui.checkbox.uncheck($('.list-view  li:not(".not-selectable") .check'));
            } else {
                ui.checkbox.check($('.list-view  li:not(".not-selectable") .check'));
            }
        });

        $('.trigger-checkbox.has-more .check').click(function(e) {
            ui.slideHiddenArea(this, $(this).parent().next('.more'));
        });

        $('.dhcp-option .check').click(function(e) {
            $(this).parents('li').siblings().find('ul.subnet-options').parent('li').toggle();
        })

        // for lis that we want to change the checkbox state
        $('.trigger-checkbox').click(function(e){
            $(this).find('.check').trigger('click');
        });

        $('.trigger-checkbox').find('a').click(function(e){
            e.stopPropagation();
        });

         // for checkboxes created after document.ready
        $('.items-list').on('click','.check', function(e){
            e.preventDefault();
            e.stopPropagation();
            ui.changeCheckboxState(this);
        });

        // radiobuttons binds

        $('.radiobtn').click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            if($(this).find('span').hasClass('snf-radio-unchecked')) {
                ui.radiobtn.obtainOneChecked(this);
                ui.radiobtn.changeState(this);
            }
        });

        $('.subnet-options .radiobtn').click(function(e) {
            if($(this).closest('li').hasClass('manual')) {
                $(this).siblings('.input').show();
            }
            else {
                $(this).closest('li').siblings('.manual').find('.input').hide();
            }
        });       

        $('.trigger-radiobtn').click(function(e) {
            $(this).find('.radiobtn').trigger('click');
        });

        $('.firewall .more  .radiobtn').click(function(e){
            $(this).parents('.firewall').removeAttr('data-firewall');
            $(this).parents('.firewall').data('firewall', $(this).parent().attr('class'));
            ui.firewallSetup();
        });

    })