$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1500);
				return false;
			}
		}
	});
	
	$("#img-ian").addClass("animated bounce");
	
	$("#pro-title").css("color","#90E6EF");
	
	/**********************/
	$("#owl-demo").owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
			autoHeight:false
  });
	/***************************/
});