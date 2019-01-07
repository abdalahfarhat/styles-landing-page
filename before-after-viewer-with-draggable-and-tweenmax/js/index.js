$(function(){
				
  /*
    Dependencies : TweenMax and Draggable
    Images by Ivaylo Yovchev ( http://www.ivayloyovchev.com/ )
    
    Test on touch device @ http://cloud.bassta.bg/before-after.html
  */
  
  
  var $dragMe			    = $("#dragme");
  var $beforeAfter		= $("#before-after");
  var $viewAfter		  = $(".view-after");
				
  Draggable.create($dragMe, {
	  type:"left",
	  bounds: $beforeAfter,
	  onDrag:updateImages
  });
			   			    
  function updateImages(){
	  TweenLite.set($viewAfter, {width: $dragMe.css("left") });		//or this.x if only dragging
  }
			   
  //Intro Animation
  animateTo(350);
			   
  //Externall nav
  $(".to-start").on("click", function(){
	  animateTo(0);
  });
			   
  $(".to-middle").on("click", function(){
	  animateTo(298);  
  });
			   
  $(".to-end").on("click", function(){
	  animateTo(598);
  });
			   
  function animateTo(_left){
	  TweenLite.to( $dragMe, 1, {left: _left, onUpdate: updateImages });
  }
  
  //V2 Click added
  $beforeAfter.on("click", function(event){			   		
	  var eventLeft = event.clientX - $beforeAfter.offset().left;
	  animateTo(eventLeft);
  });
    
				
});//end jQuery wrapper