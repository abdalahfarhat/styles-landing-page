$(function() {

  $('.img-container img').hover(
    function() {
      $(this).css('opacity', '.25');
      var a = $(this).attr('alt');
      $(this).parent().append('<div class="title animated fadeInUp"><p>' + a + '</p></div>');
    },
    function() {
      $(this).css('opacity', '1');
      $(this).siblings().remove('.title');
    }
  );

//   $('.img-container img').on('click', function() {
//     $(this).siblings('form').addClass('show-hide');
//   });

//   $("form").submit(function(e) {
//     e.preventDefault();

//     $('form').removeClass('show-hide');
//     var newSrc = $(this).children('#img-url').val();
//     $(this).parent().children('img').attr("src", newSrc);
//   });

});