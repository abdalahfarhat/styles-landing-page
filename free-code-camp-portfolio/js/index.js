var app = angular.module('portfolio', [])

//navigation controller
.controller('navCtrl', function($scope) {
  //navigation menu items
  $scope.navigation = [{
    id: '#about',
    name: 'About'
  }, {
    id: '#portfolio',
    name: 'Portfolio'
  }, {
    id: '#contact',
    name: 'Contacts'
  }, ];

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top'
  })

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
    $('.navbar-toggle:visible').click();
  });

  //animation on Scroll
  $scope.animateHeader = function() {
    var doc = document,
      elem = doc.documentElement,
      header = doc.querySelector('.navbar-inverse'),
      didScroll = false,
      changeEffect = 220;

    window.addEventListener('scroll', function(e) {
      if (!didScroll) {
        didScroll = true;
        setTimeout($scope.scrollPage, 250);
      }
    }, false);

    $scope.scrollPage = function() {
      var sy = window.scrollY;
      if (sy >= changeEffect) {
        $('.navbar-inverse').addClass('navbar-animated');
      } else {
        $('.navbar-inverse').removeClass('navbar-animated');
      }
      didScroll = false;
    };
  };

  $scope.animateHeader();
})

//home controller
.controller('homeCtrl', function($scope) {
  $scope.title = "Welcome!";
  $scope.description = "Sit back, relax and explore some amazing portfolios!";
})

//about controller
.controller('aboutCtrl', function($scope) {
  $scope.aboutText = {
    title: "Hello there!",
    copyText: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    facebookUrl: "",
    githubUrl: "",
    codepenUrl: ""
  };

})

//portfolio controller
.controller('portfolioCtrl', function($scope) {
    $scope.works = [{
      id: 1,
      thumbnail: 'http://placehold.it/360x400',
      url: '',
      caption: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.',
      title: 'Project 1'
    }, {
      id: 2,
      thumbnail: 'http://placehold.it/360x400',
      url: '',
      caption: 'Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      title: 'Project 2'
    }, {
      id: 3,
      thumbnail: 'http://placehold.it/360x400',
      url: '',
      caption: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
      title: 'Project 3'
    }, {
      id: 4,
      thumbnail: 'http://placehold.it/360x400',
      url: '',
      caption: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      title: 'Project 4'
    }, {
      id: 5,
      thumbnail: 'http://placehold.it/360x400',
      url: '',
      caption: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
      title: 'Project 5'
    }, {
      id: 6,
      thumbnail: 'http://placehold.it/360x400',
      url: '',
      caption: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.',
      title: 'Project 6'
    }];
  })
  //contact controller
  .controller('contactCtrl', function($scope) {
    $scope.contact = {};
  });