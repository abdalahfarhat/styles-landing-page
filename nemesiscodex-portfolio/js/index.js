window.animateTo = function(to) {
      
        $('html, body').animate({
            scrollTop: $(to).offset().top - 42.0
         
        }, 250);
         $('.full-screen-second').animate({
            scrollTop: 0
          });
};

window.goToLinkedin = function() {
  window.open('https://www.linkedin.com/in/nemesiscodex/', '_blank');
  setTimeout(function() {
    alert("Genus-V");
  }, 3000)
}

$(document).ready(function(){
  var pattern = Trianglify({
    cell_size: 100, 
    x_colors: 'random',
    height: window.innerHeight,
    width: window.innerWidth,
  });
  document.body.appendChild(pattern.canvas());
  
  var $canvas = $('canvas');
  $('a').attr("target", "_blank");
  $(window).resize( function(){
    var pattern = Trianglify({
      cell_size: 100, 
      x_colors: 'random',
      height: window.innerHeight,
      width: window.innerWidth,
    });
    document.body.appendChild(pattern.canvas($canvas[0]));
  });
  
});


//Analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66606764-1', 'auto');
  ga('send', 'pageview');