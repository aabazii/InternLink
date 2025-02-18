jQuery(function($) {

	'use strict';
	
	$(".loader").delay(1000).fadeOut("slow");
	$("#overlayer").delay(1000).fadeOut("slow");  

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});

		setTimeout(function() {
			
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function(){
				var $this = $(this);
				
				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle' : 'collapse',
					'data-target' : '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class' : 'collapse',
					'id' : 'collapseItem' + counter,
				});

				counter++;
			});

		}, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
			var $this = $(this);
			if ( $this.closest('li').find('.collapse').hasClass('show') ) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();  
		});

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		});

		$('body').on('click', '.site-mobile-menu .site-nav-wrap li a', function(e) {
			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$('.js-menu-toggle').removeClass('active');
			}
			var target = $(this).attr('href');
			if (target.startsWith('#')) {
				$('html, body').animate({
					scrollTop: $(target).offset().top
				}, 600, 'easeInOutCirc');
				e.preventDefault();
			}
		});

		$(document).mouseup(function(e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	}; 
	siteMenuClone();

	(function sitePlusMinus() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	});

	var siteIstotope = function() {
		var $container = $('#posts').isotope({
			itemSelector : '.item',
			isFitWidth: true
		});

		$(window).resize(function(){
			$container.isotope({
				columnWidth: '.col-sm-3'
			});
		});
		
		$container.isotope({ filter: '*' });

		$('#filters').on( 'click', 'button', function(e) {
			e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			$container.isotope({ filter: filterValue });
			$('#filters button').removeClass('active');
			$(this).addClass('active');
		});
	}

	siteIstotope();

	var fancyBoxInit = function() {
		$('.fancybox').on('click', function() {
			var visibleLinks = $('.fancybox');

			$.fancybox.open( visibleLinks, {}, visibleLinks.index( this ) );

			return false;
		});
	}
	fancyBoxInit();

	var stickyFillInit = function() {
		$(window).on('resize orientationchange', function() {
			recalc();
		}).resize();

		function recalc() {
			if ( $('.jm-sticky-top').length > 0 ) {
				var elements = $('.jm-sticky-top');
				Stickyfill.add(elements);
			}
		}
	}
	stickyFillInit();

	var OnePageNavigation = function() {
		$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
			e.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				'scrollTop': $(hash).offset().top
			}, 600, 'easeInOutCirc', function(){
				window.location.hash = hash;
			});
		});
	};
	OnePageNavigation();

	var counterInit = function() {
		if ( $('.section-counter').length > 0 ) {
			$('.section-counter').waypoint( function( direction ) {
				if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
					var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
					$('.number').each(function(){
						var $this = $(this),
							num = $this.data('number');
							console.log(num);
						$this.animateNumber(
							{
								number: num,
								numberStep: comma_separator_number_step
							}, 7000
						);
					});
				}
			} , { offset: '95%' } );
		}
	}
	counterInit();

	var selectPickerInit = function() {
		$('.selectpicker').selectpicker();
	}
	selectPickerInit();

	var owlCarouselFunction = function() {
		$('.single-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			autoplay: true,
			items:1,
			nav: false,
			smartSpeed: 1000
		});
	}
	owlCarouselFunction();

	var quillInit = function() {
		var toolbarOptions = [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{ 'header': 1 }, { 'header': 2 }],
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],
			[{ 'script': 'sub'}, { 'script': 'super' }],
			[{ 'indent': '-1'}, { 'indent': '+1' }],
			[{ 'direction': 'rtl' }],
			[{ 'size': ['small', false, 'large', 'huge'] }],
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
			[{ 'color': [] }, { 'background': [] }],
			[{ 'font': [] }],
			[{ 'align': [] }],
			['clean']
		];

		if ( $('.editor').length > 0 ) {
			new Quill('#editor-1', {
				modules: {
					toolbar: toolbarOptions,
				},
				placeholder: 'Compose an epic...',
				theme: 'snow'
			});
			new Quill('#editor-2', {
				modules: {
					toolbar: toolbarOptions,
				},
				placeholder: 'Compose an epic...',
				theme: 'snow'
			});
		}
	}
	quillInit();
});
