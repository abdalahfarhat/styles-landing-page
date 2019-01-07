$(document).ready(function(){
    $("html").niceScroll({
        scrollspeed: 51,
        mousescrollstep: 45,
    });

    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1000);
            event.preventDefault();
        });
    });

    var headerHeight = $(".s").outerHeight(true);
    $(" #about, #home, #portfolio").css("padding-top", headerHeight )
    $(" #about, #portfolio").css("padding-bottom", headerHeight )
});