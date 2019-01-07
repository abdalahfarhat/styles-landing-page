/*Hide menu by default*/
$("#menu").hide();

/*When menu button is clicked, toggle the menu*/
$("#menu-btn").click(function(){
  $("#menu").slideToggle();
});