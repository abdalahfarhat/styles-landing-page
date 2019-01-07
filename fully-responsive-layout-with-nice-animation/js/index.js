$(document).ready(function () {
	var $cont = $('.cont');
	var $slide = $('.slide');
	var $closeBtn = $('.slide__close');
	var $text = $('.slide__text');
	var $iconTwitter = $('.icon-link--twitter');
	var numSlides = 5;
	var initialAnimDur = 7131;
	var animDelay = 1000;
	var initialAnim = true;
	var clickAnim = false;

	$(document).on('click', '.slide__bg-dark', function () {
		if (initialAnim || clickAnim) return;
		var _this = $(this).parent();
		var target = +_this.attr('data-target');
		clickAnim = true;

		_this.css({
			'transform': 'translate3d(-100%, 0, 0)',
			'transition': '750ms',
			'cursor': 'default' });


		_this.find('.slide__img-wrapper').css({
			'transform': 'translate3d(0, 0, 0) scale(.95, .95)',
			'transition': '2000ms' });


		for (var i = target, length = $slide.length; i < length; i++) {
			$('.slide--' + (i + 1)).css({
				'transform': 'translate3d(0, 0, 0)',
				'transition': '750ms' });

		}

		for (var _i = target, _length = $slide.length; _i > 1; _i--) {
			$('.slide--' + (_i - 1)).css({
				'transform': 'translate3d(-150%, 0, 0)',
				'transition': '750ms' });

		}

		setTimeout(function () {
			$slide.not(_this).find('.slide__bg-dark').css({
				'opacity': '0' });

		}, 750);

		$closeBtn.addClass('show-close');
		$iconTwitter.addClass('icon-show');

		_this.find('.slide__text').css({
			'transform': 'translate3d(150px, -40%, 0)',
			'opacity': '1',
			'transition': '2000ms',
			'-webkit-transition': '2000ms' });

	});

	$(document).on('mousemove', '.slide', function () {
		if (initialAnim || clickAnim) return;
		var _this = $(this);
		var target = +_this.attr('data-target');

		_this.css({
			'transform': 'translate3d(-' + (100 / numSlides * (numSlides - (target - 1)) + 5) + '%, 0, 0)',
			'transition': '750ms' });


		_this.find('.slide__text').css({
			'transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
			'-moz-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
			'opacity': '1',
			'transition': '750ms',
			'-webkit-transition': '750ms' });


		for (var i = target, length = $slide.length; i < length; i++) {
			$('.slide--' + (i + 1)).css({
				'transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i + 1 - 1)) - 5) + '%, 0, 0)',
				'transition': '750ms' });

		}

		for (var _i2 = target; _i2 > 1; _i2--) {
			$('.slide--' + (_i2 - 1)).css({
				'transform': 'translate3d(-' + (100 / numSlides * (numSlides - (_i2 - 1 - 1)) + 5) + '%, 0, 0)',
				'transition': '750ms' });

		}

		_this.find('.slide__img-wrapper').css({
			'transform': 'translate3d(-200px, 0, 0) scale(.85, .85)',
			'transition': '750ms' });


		$slide.not(_this).find('.slide__img-wrapper').css({
			'transform': 'translate3d(-200px, 0, 0) scale(.90, .90)',
			'transition': '1000ms' });


		$slide.not(_this).find('.slide__bg-dark').css({
			'opacity': '.75' });

	});

	$(document).on('mouseleave', '.slide', function () {
		if (initialAnim || clickAnim) return;
		var _this = $(this);
		var target = +_this.attr('data-target');

		for (var i = 1, length = $slide.length; i <= length; i++) {
			$('.slide--' + i).css({
				'transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
				'transition': '1000ms' });

		}

		$slide.find('.slide__img-wrapper').css({
			'transform': 'translate3d(-200px, 0, 0) scale(1, 1)',
			'transition': '750ms' });


		$slide.find('.slide__bg-dark').css({
			'opacity': '0' });


		$text.css({
			'transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
			'opacity': '0',
			'transition': '200ms',
			'-webkit-transition': '200ms' });

	});

	$(document).on('click', '.slide__close', function () {

		setTimeout(function () {
			clickAnim = false;
		}, 1000);

		$closeBtn.removeClass('show-close');
		$iconTwitter.removeClass('icon-show');

		for (var i = 1, length = $slide.length; i <= length; i++) {
			$('.slide--' + i).css({
				'transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
				'transition': '1000ms',
				'cursor': 'pointer' });

		}

		$text.css({
			'transform': 'translate3d(150px, -40%, 0)',
			'opacity': '0',
			'transition': '200ms',
			'-webkit-transition': '200ms' });


		setTimeout(function () {
			$text.css({
				'transform': 'translate3d(0, -50%, 0)' });

		}, 200);
	});

	setTimeout(function () {
		$cont.addClass('active');
	}, animDelay);

	setTimeout(function () {
		initialAnim = false;
	}, initialAnimDur + animDelay);

});