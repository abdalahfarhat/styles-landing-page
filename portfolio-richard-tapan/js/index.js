var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

$(document).ready(function() {
  homeOnLoad();
  $('.toAboutMe').click(aboutMe);
  $('.toHome').click(home);
  $('.toPortfolio').click(portfolio);
  $('.toContact').click(contact);
  
  $('.nav-item a').on('click', function(){
    $('.btn-navbar').click(); //bootstrap 2.x
    $('.navbar-toggler').click() //bootstrap 3.x by Richard
});
  
  $("#contact-form").on("submit", function(e) {
    e.preventDefault();

    //get the name field value
    var name = $("#form-name").val();
    //get the name field value
    var email = $("#form-email").val();
    //get the text
    var text = $("#form-text").val();
    //pretend we don't need validation
    
    alert('Thank you for sending me a message '+name+' I will be in touch shortly');
    $.ajax({
      url: "https://formspree.io/rctapan24@gmail.com",
      method: "POST",
      data: {
        name: name,
        email: email,
        text: text,
        _subject: "New message",
      },
      dataType: "json",
      success: function() {
        $("#contact").hide();
        $(".display-none").show();
      }
    });
  });
  $("#contact-form").on("submit", function(e) {
    var name = $("#form-name").val();
    if (!name) {
      $(".sender").text("");
    } else {
      $(".sender").text(" " + name);
    }
  });
});

function aboutMe(){
  $('#aboutMeHeader').addClass('animated bounceInDown');
  $('#aboutMePic').addClass('animated bounceInLeft');;
  $('#aboutMeContent').addClass('animated bounceInRight');
  $('#aboutMeHeader, #aboutMePic #aboutMeContent').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('#aboutMeHeader').removeClass('animated bounceInDown');
    $('#aboutMePic').removeClass('animated bounceInLeft');
    $('#aboutMeContent').removeClass('animated bounceInRight');
  });
}

function homeOnLoad(){
   $('.h1typewriter, #toAboutMe').addClass('animated bounceInDown');
  $('.h1typewriter, #toAboutMe').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('.h1typewriter, #toAboutMe').removeClass('animated bounceInDown arrow-bounce');
  });
}

function home(){
  $('.h1typewriter, #toAboutMe').addClass('animated bounceInUp');
  $('.h1typewriter, #toAboutMe').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('.h1typewriter, #toAboutMe').removeClass('animated bounceInUp arrow-bounce');
  });
}

function portfolio(){
  $('#portfolioHeader3, #portfolioHeader1').addClass('animated bounceInDown');
  $('.jumbotron').addClass('animated bounceInUp');
  $('.portfolio-item').addClass('animated bounceInRight');
  $('.portfolio-item-2').addClass('animated bounceInLeft');
  $('#portfolioHeader3, #portfolioHeader1, .jumbotron').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('#portfolioHeader3, #portfolioHeader1').removeClass('animated bounceInDown');
    $('.jumbotron').removeClass('animated bounceInUp');
    $('.portfolio-item').removeClass('animated bounceInRight ');
    $('.portfolio-item-2').removeClass('animated bounceInLeft');
  });
}

function contact(){
  $('.contactHeader').addClass('animated bounceInDown');
  $('#form-name').addClass('animated bounceInLeft');
  $('#form-email').addClass('animated bounceInRight');
  $('#form-text, #form-button').addClass('animated bounceInUp');
  $('.contactHeader, #form-name, #form-email, #form-text, #form-button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('.contactHeader').removeClass('animated bounceInDown');
  $('#form-name').removeClass('animated bounceInLeft');
  $('#form-email').removeClass('animated bounceInRight');
  $('#form-text, #form-button').removeClass('animated bounceInUp');
  });
}