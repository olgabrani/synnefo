    $('.adv-main .btn5').click( function(e){
        e.preventDefault();
        $(this).toggleClass('current');
        $(this).parents('div.advanced-conf-step').find('.advanced-conf-options').slideToggle();
    })

    $('.network-data a.select-network').click( function(e){
    e.preventDefault();
    $(this).toggleClass('current'); //edw mallon dn xreiazetai????
    $(this).parents('li.network-data').find('.ips-list').slideToggle();
    })

    // $('.adv-main .btn5').click( function(e){
    // e.preventDefault();
    // $(this).toggleClass('current'); //edw mallon dn xreiazetai????
    // $(this).parents('li.network-data').find('.ips-list').slideToggle();
    // })



