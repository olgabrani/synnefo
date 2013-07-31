$(document).ready(function(){

    //show selection window of vm_list_v1.html
    $('.vm_container').find('.img').mouseenter(function(event){
        event.preventDefault();
        elem = $('.vm_container').find('.vm_options');
        if(elem.length!==0){
            elem.slideDown('slow');
            elem.removeClass('invisible');
        }
        
    });
    $('.vm_options').mouseleave(function(event){
        event.preventDefault();
        if(!$(this).hasClass('invisible'))
        {
            elem.slideUp('slow');
            elem.addClass('invisible');
        }
    })

    //checkbox in selection window of vm_list_v1.html
    $('.select').click(function(event){
        event.preventDefault();
        var checkbox = $(this).find('.custom_checkbox');
        if(checkbox.hasClass('checkbox-unchecked')){
            checkbox.html('b');
            checkbox.removeClass('checkbox-unchecked');
            checkbox.addClass('checkbox-checked');
        }
        else{
            checkbox.html('a');
            checkbox.removeClass('checkbox-checked');
            checkbox.addClass('checkbox-unchecked');
        }
    });
   
});