$(function(){
  $(".main-menu a").click(function(e){
    e.preventDefault();
    $(this).parents("li").addClass("current").siblings().removeClass("current");
  });
})