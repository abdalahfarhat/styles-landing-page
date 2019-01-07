/*-- Printing and PDF exports --*/
var link = document.createElement( 'link' );
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = window.location.search.match( /print-pdf/gi ) ? 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.2.0/css/print/pdf.css' : 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.2.0/css/print/paper.css';
      document.getElementsByTagName( 'head' )[0].appendChild( link );


$(document).ready( function() {
        
        $(".social-profile:first").clone().prependTo("#contact") ;
        
        showNotification("Also press <b>space</b>, <b>arrows</b>, <b>esc</b> keys to navigate.") ;
        
      });
      // Full list of configuration options available at:
      // https://github.com/hakimel/reveal.js#configuration
      Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        transition: 'convex' // none/fade/slide/convex/concave/zoom

        // Optional reveal.js plugins
        /*dependencies: [
          { src: 'bower_components/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
          { src: 'bower_components/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: 'bower_components/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: 'bower_components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
          { src: 'bower_components/reveal.js/plugin/zoom-js/zoom.js', async: true },
          { src: 'bower_components/reveal.js/plugin/notes/notes.js', async: true }
        ]*/
      });
      
      Reveal.addEventListener( 'slidechanged', function( event ) {
        
        /*animate.css is not use here cause it isn't evident to use it with reveal's events. 
         *to have expected result when sliding, animation class have to be added and removed when it end.
         *I have got some conflicts when was trying that solution.
         *----------------------------------------------------------------------
        */
        
        /*animate slider's controls button when enabled
         *this is to take attention of user for navigation ways
         */
        if( $(".reveal .controls .navigate-left").hasClass("enabled") ) {
          
          iJS.animate( $(".reveal .controls .navigate-left.enabled")[0], "fade-in-right") ;
        }
        if( $(".reveal .controls .navigate-right").hasClass("enabled") ) {
          
          iJS.animate( $(".reveal .controls .navigate-right.enabled")[0], "fade-in-left") ;
        }
        if( $(".reveal .controls .navigate-up").hasClass("enabled") ) {
          
          iJS.animate( $(".reveal .controls .navigate-up.enabled")[0], "fade-in-up") ;
        }
        if( $(".reveal .controls .navigate-down").hasClass("enabled") ) {
          
          iJS.animate( $(".reveal .controls .navigate-down.enabled")[0], "fade-in-down") ;
        }
        
        /*few animation for some element depending of showing sliders*/
        if(Reveal.isFirstSlide() || Reveal.isLastSlide()) {
          
          $(".social-profile").each( function() {
            
            iJS.animate( this, "rotate-in") ;
          }) ;
        } 
        if(Reveal.getIndices().h == 2) {
          
          $("#portfolio a.i-animated").each( function() {

            iJS.animate( this, "flip-in-y") ;
          }) ;
        } ;
        
      } );
      

/* Take from iJS-ui
--------------------*/

//permet d'afficher les notifications
function showNotification( msg,  mode ) {

  var notify = document.getElementById("notify-block") ;

  if( ! notify ) {

    notify = document.createElement('p') ;
    notify.id = "notify-block" ;

    document.body.appendChild( notify ) ;

  } else clearTimeout( window.i_event_notify_id ) ; //utile s'il y a eu d'autre notification avant.

  notify.style.display = "none" ; //on se rassure que la zone sera invisible avant l'affichage du msg
  notify.innerHTML = msg ;

  var closeButton = document.createElement("button");
  closeButton.className = "b-dialog-close";
  closeButton.innerHTML = "X";
  closeButton.onclick = function () {

    document.body.removeChild( notify ) ;
  } ;
  notify.appendChild( closeButton ) ;

  notify.style.display = "block" ; //affiche du msg
  notify.className = "notify-normal" ;

  //le mode en principe est soit "normal" soit "warring"
  //cependant n'importe quel valeur sauf "warring" peut convernir pour un mode d'affichage normal.
  if( mode === "warring") {

    notify.className = "notify-warring" ;
    window.i_event_notify_id = setTimeout( function(){ document.body.removeChild( notify ) ; }, 20000) ; //on cache la zone après 30s

  } else if( mode === "error") {

    notify.className = "notify-error" ;
    window.i_event_notify_id = setTimeout( function(){ document.body.removeChild( notify ) ; }, 25000) ; //on cache la zone après 30s

  }
  else if( mode === "success") {

    notify.className = "notify-success" ;
    window.i_event_notify_id = setTimeout( function(){ document.body.removeChild( notify ) ; }, 25000) ; //on cache la zone après 30s

  } else window.i_event_notify_id = setTimeout( function(){ document.body.removeChild( notify ) ; }, 15000) ; //on cache la zone après 15s

}