$(document).ready(function(){
        $('.vm_container').find('.img').mouseenter(function(event){
        event.preventDefault();
        elem = $('.vm_container').find('.vm_options');
        if(elem.length!==0){
            console.log('me vrikane k tha me diksoun!');
            elem.slideDown('slow');
            elem.removeClass('invisible');
        }
        
    });
    $('.vm_options').mouseleave(function(event){
        event.preventDefault();
        if(!$(this).hasClass('invisible'))
        {
            console.log('fainomai twra! ;)')
            elem.slideUp('slow');
            elem.addClass('invisible');
        }
    })
   
});