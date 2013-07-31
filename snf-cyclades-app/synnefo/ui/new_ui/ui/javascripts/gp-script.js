$(document).ready(function(){

    //show selection window of vm_list_v1.html
    var vm_options_win;
    $('li .vm_container').mouseenter(function(event){
        event.preventDefault();
        vm_options_win = $(this).find('.vm_options');
        if(vm_options_win.length!==0){
            vm_options_win.removeClass('invisible');
            vm_options_win.slideDown('slow');
        }

    }).mouseleave(function(event){
        event.preventDefault();
        if(!vm_options_win.hasClass('invisible'))
        {
            vm_options_win.slideUp('slow');
            vm_options_win.addClass('invisible');
        }
    })

    //checkbox in selection window of vm_list_v1.html
    $('.vm_options .select').click(function(event){
        event.preventDefault();
        var checkbox = $(this).find('.custom_checkbox');
        if(checkbox.hasClass('checkbox-unchecked')){
            checkbox.html('b');
            checkbox.removeClass('checkbox-unchecked'); 
        }
        else{
            checkbox.html('a'); 
            checkbox.addClass('checkbox-unchecked');
        }
    });
   
});