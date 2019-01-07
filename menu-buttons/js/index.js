var menu = $('.wrapper a');

menu.on('click', function() {
  var menuNum = $(this).data('menu');
  $(this).toggleClass('menu-'+ menuNum +'-active');
})