$(document).ready(function(){
    $('.select-flavor dl span').click(function(e){
        console.log('test');
        $(this).parents('dl').find('span').removeClass('current');
        $(this).addClass('current');
    })

   
});