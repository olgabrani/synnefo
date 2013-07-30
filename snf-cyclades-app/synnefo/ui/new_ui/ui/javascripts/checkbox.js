$(document).ready(function(){
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