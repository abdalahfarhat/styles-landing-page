$("ul li:nth-child(1)").click(function(){
  $(".left-set img:nth-child(2)").animate({
    opacity: 1
  })
})

$("ul li:nth-child(2)").click(function(){
  $(".left-set img:nth-child(2)").animate({
    opacity: 0
  })
})