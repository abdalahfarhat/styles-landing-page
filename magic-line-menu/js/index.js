$(document).ready(function() {
  // cool nav menu
  $(window).on('load resize', function() {
    var $thisnav = $('.current-menu-item').offset().left;

    $('.menu-item').hover(function() {
      var $left = $(this).offset().left - $thisnav;
      var $width = $(this).outerWidth();
      var $start = 0;
      $('.wee').css({ 'left': $left , 'width': $width });
    }, function() {
      var $initwidth = $('.current-menu-item').width();
      $('.wee').css({ 'left': '0' , 'width': $initwidth });
    });
  });

});