// Set up Smooth Scroll for .imNav links
			$(".imNav").smoothScroll();

			// declare var for making later animations code more clear
      		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      		// declare variables for only 1 animation
      		var topDone = false;
      		var servicesDone = false;
      		var portfolioDone = false;
      		var contactDone = false;


      		var doAnimation = function (section, target, animation){
      			$(section)
      			.find(target)
      			.css('visibility', 'visible')
      			.addClass("animated "+ animation )
      			.one(animationEnd, function(){
					$(section)
      				.find(target)
					.removeClass("animated "+ animation )}
				);
      		};

      		var doAnimationM = function (section){
      			doAnimation(section,".fU","bounceInDown");
				doAnimation(section,".fD","bounceInUp");
				doAnimation(section,".fL","bounceInLeft");
				doAnimation(section,".fR","bounceInRight");
      		};


			$("#scrollSpyTarget").on("activate.bs.scrollspy", function(){
		        var currentItem = $(".nav li.active > a").attr('href');
		        // switch
		        switch (currentItem) {
				  case "#top":
				  	if (topDone === false){
					    doAnimationM("#top");
					    topDone = true;
					}
					break;
				  case "#services":
				    if (servicesDone === false) {
				    	doAnimationM("#services");
				    	servicesDone = true;
				    }
				    break;
				  case "#portfolio":
				    if (portfolioDone === false) {
				    	doAnimationM("#portfolio");
				    	$(".aniThumb")
		      			.css('visibility', 'visible')
		      			.addClass("animated zoomIn")
		      			.one(animationEnd, function(){
							$(".aniThumb")
							.removeClass("animated zoomIn")}
				);
				    	portfolioDone = true;
				    }
				    break;
				  case "#contact":
				    if (contactDone === false) {
				    	doAnimationM("#contact");
				    	contactDone = true;
				    }
				    break;
				}
    		})