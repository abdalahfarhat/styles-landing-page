var videoswiper = new Swiper($(".videoswiper"), {
  autoplay: 6000,
  pagination: false,
  slidesPerView: 3,
  spaceBetween: 0,
  loop: false,
  grabCursor: false,
  breakpoints: {
    1280: {
      slidesPerView: 3
    },
    800: {
      slidesPerView: 2
    },
    640: {
      slidesPerView: 1
    }
  },
  nextButton: ".videoswiper .swiper-button-next",
  prevButton: ".videoswiper .swiper-button-prev",
  onPaginationRendered: function(swiper, paginationContainer) {
    var numberOfBullets = swiper.params.loop
      ? Math.ceil(
          (swiper.slides.length - swiper.loopedSlides * 2) /
            swiper.params.slidesPerGroup
        )
      : swiper.snapGrid.length;
    //console.log('numberOfBullets: '+numberOfBullets);
    if (numberOfBullets < 2) {
      swiper.paginationContainer.css({
        display: "none"
      });
    } else {
      swiper.paginationContainer.css({
        display: "block"
      });
    }
  }
});
$('.videoswiper .swiper-slide').each(function(index, element) {
  var href = $(element).find('.card-img a').attr('href');
  $(element).magnificPopup({
    items: {
      src: href
    },
    type: 'iframe'
  });
});

/*$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
  disableOn: 700,
  type: "iframe",
  mainClass: "mfp-fade",
  removalDelay: 160,
  preloader: false,
  fixedContentPos: false
});*/