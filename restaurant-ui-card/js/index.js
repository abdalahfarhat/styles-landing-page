$('.infos_left').click(function () {
	var focus = $(this).parent();
	focus.addClass('restaurant--active');	focus.find('.reservation_right').addClass('reservation_right--active');
	focus.find('.reservation_btn').addClass('reservation_btn--active');	
		focus.find('.reservation_btn').html('Détails');	
});

$('.reservation_btn').click(function () {
	var focus = $(this).parent();
	focus.addClass('restaurant--active');	focus.find('.reservation_right').addClass('reservation_right--active');
	focus.find('.reservation_btn').addClass('reservation_btn--active');	
		focus.find('.reservation_btn').html('Détails');	
});

$('.close_it').click(function () {
	var focus = $(this).parent();
	focus.removeClass('restaurant--active');	focus.find('.reservation_right').removeClass('reservation_right--active');
	focus.find('.reservation_btn').removeClass('reservation_btn--active');	
		focus.find('.reservation_btn').html('Réserver');	
});


  $( function() {
    $( "#datepicker" ).datepicker();
  } );