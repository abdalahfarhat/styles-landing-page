jQuery(document).ready(function(){
	$('.menu-item').addClass('menu-trigger');
	$('.menu-trigger').click(function(){
		$('#menu-trigger').toggleClass('clicked');
		$('.container').toggleClass('push');
		$('.menu-type').toggleClass('open');
	});
});