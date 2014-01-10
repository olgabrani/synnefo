function setArrowsStatus(remainingActions, actionsNum, visibleActions) {
    if(remainingActions<=0) {
                    $('.actions-area .arrows .down'). addClass('inactive');
                }
                else {
                    $('.actions-area .arrows .down'). removeClass('inactive');
                }
                if(remainingActions>= actionsNum - visibleActions) {
                    $('.actions-area .arrows .up'). addClass('inactive');
                }
                else {
                    $('.actions-area .arrows .up'). removeClass('inactive');
                }
}

$(document).ready(function() {
    $('.entities li.testOverlay .more').each(function(){
        var width = $(this).parent('li').outerWidth();
        var height = $(this).parent('li').outerHeight()
        $(this).css('width', width);
        $(this).css('height', height);
	});


var actionsAreaHeight = 100;
        var actionHeight, actionsNum, visibleActions, step, remainingActions;

        $('.items-list li .img-wrap').on("mouseenter", function(e) {
            var actionsArea = $(this).parents('.container').siblings('.more').find('.actions-area');             
            if(actionsArea.find('ul').height() < actionsArea.height()) {
                actionsArea.find('.arrows a').addClass('inactive');
            }
            else {
                var actionsAreaHeight = 100;
                var actionHeight = actionsArea.find('li').height();
                var actionsNum = actionsArea.find('li').length;
                var visibleActions = actionsAreaHeight/actionHeight;
                var step = 2;
                var remainingActions = actionsNum - visibleActions;
                actionsArea.find('ul').css({top: 0})
                setArrowsStatus(remainingActions, actionsNum, visibleActions);
                $('.actions-area .arrows .down').click(function(e) {
            e.preventDefault();
            if(remainingActions>0) {
                distance = parseInt($('.actions-list').css('top'), 10) - step*actionHeight;
                actionsArea.find('.actions-list').animate({top: distance+'px'}, function() {
                    remainingActions = remainingActions -2;
                    setArrowsStatus(remainingActions, actionsNum, visibleActions);
                    
                })

            }
        });
        $('.actions-area .arrows .up').click(function(e) {
            e.preventDefault();
            if(remainingActions< actionsNum - visibleActions) {
                distance = parseInt($('.actions-list').css('top'), 10) + step*actionHeight;
                actionsArea.find('.actions-list').animate({top: distance+'px'}, function() {
                    remainingActions = remainingActions +2;
                    setArrowsStatus(remainingActions, actionsNum, visibleActions);
                    
                });
            }
        });
            }
        });

    
})