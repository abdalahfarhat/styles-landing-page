$(function(){
setInterval(function(){tadaStuff()}, 1000);
  hoverStuff();
});
function tadaStuff() {
   var randNum = Math.floor( Math.random() * $('.thumb-unit').length) + 1;
  $('.thumb-unit').eq(randNum).addClass('is-active').siblings().removeClass('is-active');
}