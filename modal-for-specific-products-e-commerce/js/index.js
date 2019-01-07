setTimeout(function() {
$(document).ready(function() {
	var arr = $('.product-sku').map(function(index, val) {
			return $(val).text()
	});

	switch (true) {
			case ($.inArray("LNC-L2850303", arr) !== -1):
					$('.popup').removeClass('hidden').addClass('visible');
					break;

			default:
					$('.popup').addClass('hidden');
					break;
	}
});
}, 1000);

$(function() {
$('[data-popup-open]').load(function(e) {
	var targeted_popup_class = jQuery(this).attr('data-popup-open');
	$('[data-popup="popup"]').fadeIn(350);

	e.preventDefault();
});
});

$(document).ready(function() {
$(".popup-close").click(function() {
	$(".popup").removeClass("visible").addClass("hidden").fadeOut(350);
});
});