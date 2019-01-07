$("a").on('click', function(event){
  if(this.hash !== ""){
    //Prevent default anchor tag behaviour
    event.preventDefault();
    //Store hash
    var hash = this.hash;
    
    //Using jQuery animate method to add smooth scrolling
    $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 1000, function(){
      window.location.hash = hash;
    });
  }
});