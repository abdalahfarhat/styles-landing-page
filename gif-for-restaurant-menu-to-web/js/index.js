
window.onload = function() {

	'use strict';

	var
		box = document.getElementById('box'),
		wrap = document.getElementById('wrap'),

		canvas = document.getElementById('bg'),
		ctx = canvas.getContext('2d'),

		list = document.getElementById('list'),
		listitems = list.getElementsByTagName('li'),

		styler = document.createElement('style'),


		boxwidth = 0,
		boxheight = 0,
		itemheight = 0,
		bgcolors = [],

		cx = 0,
		pv = 0,

		starty, starttop,

		$document = $(document.documentElement),
		$wrap = $(wrap),
		$listitems = [],
		$links = [],
		$svg = [],
		$svgs = [],
		$heads = [],
		$headsvgs = [],
		$liquids = [],
		$liquidmasks = [],

		sizetoanimate = 0,
		currentindex = 0,
		previndex = 0,
		numdisplay = 4,

		liquidpath,
		liquidwaveheight = 12,
		liquidwavetimes = 8,
		headshakeheight = 35,
		headshaketimes = 5,

		bystep = $.browser.mobile && window.navigator.standalone,
		isfallinganimation = false,

		wavetime = 750,
		backtime = 500,

		j = 0, numsvgs = 0,
		i = 0, numitems = listitems.length;


	for (; i < numitems; i++) {
		bgcolors.push(document.defaultView.getComputedStyle(listitems[i], null)['backgroundColor']);
		listitems[i].style.background = 'none';
		$listitems[i] = $(listitems[i]);
		$links[i] = $listitems[i].find('a').attr('data-type', listitems[i].className).click(linkclick);
		$svg[i] = $listitems[i].find('div.svg').attr('data-type', listitems[i].className);
		$svgs[i] = $svg[i].find('svg');
		$heads[i] = $svg[i].find('div.head');
		$headsvgs[i] = $heads[i].find('svg');
		$liquids[i] = $svg[i].find('.liquid');
		if (!$liquids[i].length) {
			$liquids[i] = null;
		} else {
			liquidpath = $liquids[i][0].getAttribute('d').split(' ');
			$liquids[i].attr({
				'data-d-top': liquidpath[0].split(',')[1],
				'data-d-last': ' '+ liquidpath[2] +' '+ liquidpath[3]
			});
			$liquidmasks[i] = $svg[i].find('mask').children();
		}
		for (j = 0, numsvgs = $svgs[i].length; j < numsvgs; j++) {
			$svgs[i][j] = $($svgs[i][j]);
		} 
	}

	if (bystep) {
		wavetime *= 0.5;
		backtime *= 0.5;
	}

	$document.bind($._event.gettype({mousedown: down}))
		.bind('selectstart dragstart', function() {
			return false;
		});
	window.addEventListener('resize', resize, false);
	document.getElementsByTagName('head')[0].appendChild(styler);
	document.body.classList.add('show');

	resize();


	function down(e) {
		starty = $._event.getpoint(e)[1];
		starttop = -currentindex*itemheight;
		$wrap._stop()._css('translate3dY', starttop);
		$document.bind($._event.gettype({mousemove: move, mouseup: up}));
	}

	function move(e) {
		var points = $._event.getpoint(e),
			clienty = points[1],
			top = (clienty-starty)/(numdisplay*1.5);
		cx = points[0];
		pv = top;
		if ((!starttop && clienty > starty) || (currentindex == numitems-numdisplay && starty > clienty)) {
			top /= 2;
		};
		$wrap._css('translate3dY', starttop+top);
		elastic();
		tilting();
		e.preventDefault();
	}

	function up(e) {
		var clienty = $._event.getpoint(e)[1],
			_previndex = currentindex,
			moveyto = -currentindex*itemheight;
		if (Math.abs(starty-clienty) > 50) {
			currentindex = Math.max(0, Math.min(numitems-numdisplay, starty > clienty ? currentindex+1 : currentindex-1));
			$({temp: pv})._animate({temp: 0}, {duration: wavetime, easing: 'easeOutExpo', bystep: bystep, step: wave}); // liquids wave
		}
		if (_previndex != currentindex) {
			previndex = _previndex;
		}
		sizetoanimate = -currentindex*itemheight - $wrap._css('translate3dY');
		isfallinganimation = currentindex != numitems-numdisplay && sizetoanimate > 0;
		$wrap._animate({translate3dY: -currentindex*itemheight}, {duration: backtime, bystep: bystep, easing: 'easeOutCubic'});
		$({temp: pv})._animate({temp: 0}, {duration: backtime, easing: 'easeInOutCubic', bystep: bystep, step: feet}); // back
		$document.unbind($._event.gettype({mousemove: move, mouseup: up}));
	}

	function linkclick() {
		var type = this.getAttribute('data-type');
		return false;
	}

	function wave(v) {
		liquidwave(v.percent);
	}

	function feet(v) {
		pv = v.temp;
		elastic();
		tilting(v.percent);
	}

	function elastic() {

		var top, height, i;

		for (i = pv >= 0 ? numitems-1 : 0; (pv >= 0 && i > -1) || (0 > pv && i < numitems); ) {
			ctx.fillStyle = bgcolors[i];
			top = listitems[i].offsetTop;
			height = listitems[i].offsetHeight;
			// ctx.fillRect(0, top*2, boxwidth*2, height*2); // for retina
			ctx.fillRect(0, top, boxwidth, height);
			ctx.beginPath();
			if (pv >= 0) {
				top = Math.round(top+height);
			}
			// ctx.moveTo(0, top*2); // for retina
			ctx.moveTo(0, top);
			// ctx.bezierCurveTo(0, top*2, cx*2, (top+pv)*2, boxwidth*2, top*2); // for retina
			ctx.bezierCurveTo(0, top, cx, (top+pv), boxwidth, top);
			ctx.closePath();
			ctx.fill();
			i = pv >= 0 ? i-1 : i+1;
		}

		// requestAnimationFrame(elastic);

	}

	function tilting(percent) {

		var angle = pv/5,
			type, control, i = 0;

		for (; i < numitems; i++) {
			if ($svg[i].length) {

				$svg[i]._css({rotate: angle});
				$liquids[i] && $liquids[i]._css({rotate: -angle});
				$liquidmasks[i] && $liquidmasks[i]._css({rotate: angle});

				type = $svg[i][0].getAttribute('data-type');
				if (type == 'beer') {
					$heads[i]._css({rotate: -angle, translate3dY: -Math.abs(angle)/7});
				} else if (percent !== undefined && isfallinganimation) {
					control = Math.sin((percent == 1 ? 0 : percent)*Math.PI);
					$heads[i]._css({rotate: -angle/7/*-control*angle/1.5*/, translate3dY: -control*(sizetoanimate/2)});
				}

			}
		}

	}

	function liquidwave(percent) {

		var liquidcontrol = Math.sin((percent*(360*liquidwavetimes))*Math.PI/360)*(liquidwaveheight-liquidwaveheight*percent),
			shakecontrol, type, liquid, top, i = 0;

		if (!isfallinganimation) {
			shakecontrol = Math.sin((percent*(360*headshaketimes))*Math.PI/360)*(headshakeheight/2.5-headshakeheight/2.5*percent);
		} else {
			percent = percent-0.5;
			if (0 > percent) {
				shakecontrol = pv/5*Math.abs(percent)/0.5;
			} else {
				percent = percent/0.5;
				shakecontrol = Math.sin((percent*(360*headshaketimes/2))*Math.PI/360)*((headshakeheight*1.25)-(headshakeheight*1.25)*percent);
			}
		}

		for (; i < numitems; i++) {
			type = $svg[i][0].getAttribute('data-type');
			if ($liquids[i]) {
				liquid = $liquids[i][0];
				top = parseInt(liquid.getAttribute('data-d-top'));
				liquid.setAttribute('d', [
					'M0,', top,
					' L35,', top,
					' Q47.5,', top-liquidcontrol, ',60,', top,
					' Q72.5,', top+liquidcontrol, ',85,', top,
					liquid.getAttribute('data-d-last')
				].join(''));
			}
			if (type != 'beer') {
				$headsvgs[i]._css({rotate: shakecontrol});
			}
		}

	}

	function resize() {

		var i = 0, windowheight = window.innerHeight;

		itemheight = Math.ceil(windowheight/4);

		styler.innerHTML = '#list a { line-height: '+ itemheight +'px; }';
		$wrap._stop()._css({translate3dY: -currentindex*itemheight});

		box.style.height = windowheight +'px';
		boxwidth = list.offsetWidth;
		boxheight = list.offsetHeight;
		// canvas.width = boxwidth*2; // for retina
		// canvas.height = boxheight*2; // for retina
		canvas.width = boxwidth;
		canvas.height = boxheight;

		elastic();

	}

}