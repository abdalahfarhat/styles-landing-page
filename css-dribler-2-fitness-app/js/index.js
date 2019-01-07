// Hello!
// This is a on going project of mine called "CSS Dribler" where i take designs from dribbble, and make them into code, in order to hone my skills.
 

//Credits below

// Design By:
//   - Giga Tamarashvili
  
// Link: https://dribbble.com/shots/2940650-Fitness-App
 

$( document ).ready(function(){
  $('.bar.a').removeClass('start');
  $('circle:nth-child(3)').css({'stroke-dashoffset': '200px'})
}); 


  
$('.week a').click(function(){
  if($('.bar').hasClass('start')){
    $('.bar').removeClass('start');
  }else{
    $('.bar.a').addClass('start');
    
    setTimeout(function () { 
    $('.bar.a').removeClass('start');
}, 900);
  }
  
  if($('.week a').hasClass('active')){
   
    $('.week a').removeClass('active')
  }
    $target = $(event.target); 
  
    $($target).addClass('active');
});