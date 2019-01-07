
  var $menuWrap = $('#menu-wrap'),
    $body = $('body'),
    $menuTitle = $('#menu-title'),
    $close = $('#close'),
    $menuCards = $('.menu-card'),
    $menuInner = $('#menu-inner'),
    $menuLink = $('#menu-link');

  setCardHeight();
  $(window).resize(setCardHeight);

  $menuLink.on('click', function(e) {
    e.preventDefault();
    showOverlay();
  });

  $close.on('click', function(e) {
    e.preventDefault();
    hideOverlay();
  });

  function showOverlay() {
    $body.addClass('menu-on');
    $menuWrap.addClass('display').addClass('visible');
    setTimeout(function() {
      $menuTitle.addClass('on');
      $close.addClass('on');
    }, 200);
    $menuCards.each(function(i) {
      var $card = $(this);
      setTimeout(function() {
        $card.addClass('on');
      }, 200 + 50 * i);
    });
  }

  function hideOverlay() {
    $body.removeClass('menu-on');
    $menuCards.removeClass('on');
    $menuTitle.removeClass('on');
    $close.removeClass('on');
    setTimeout(function() {
      $menuWrap.removeClass('display').removeClass('visible');
    }, 350);
  }

  function setCardHeight() {
    var windowWidth = $(window).width();
    var topVal;
    if (windowWidth >= 1300) {
      topVal = ($(window).height() - 700) / 2;
    } else {
      topVal = ($(window).height() - 200 - (windowWidth / 1300 * 513)) / 2;
    }
    if (topVal < 10) {
      topVal = 10;
    }
    $menuInner.css('top', topVal);
  }