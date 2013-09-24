   $(document).ready(function(){



    $('.adv-main .expand-link').click( function(e){
        e.preventDefault();
        var link = $(this);
        link.toggleClass('current');
        var arrow = link.find('span.snf-arrow-up, span.snf-arrow-down');
        arrow.toggleClass('snf-arrow-up');
        arrow.toggleClass('snf-arrow-down');

        link.parents('div.advanced-conf-step').find('.advanced-conf-options').slideToggle();
    })

    $('.network-data a.select-network').click( function(e){
    e.preventDefault();
    $(this).toggleClass('current'); //edw mallon dn xreiazetai????
    $(this).parents('li.network-data').find('.ips-list').slideToggle();
    })

})