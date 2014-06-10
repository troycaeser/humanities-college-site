$(document).ready(function() {

	$('#tiny_nav').load('includes/tiny_nav.html');
	$('#big_nav').load('includes/big_nav.html', function(){
		var menu = new cbpTooltipMenu( document.getElementById( 'cbp-tm-menu' ) );
	});
	$('#footer').load('includes/footer.html');

	$(window).scroll(function(){
		var current_scroll_position = $(this).scrollTop();
		var big_nav_scroll_position = $('.big_nav').offset().top;

		if(current_scroll_position > 10){
			$('.tiny_nav').addClass('tiny_nav_shrink');
			$('.big_nav').addClass('big_nav_shrink');
			$('.hero-main').addClass('hero-main-shrink')
			$('.main_content').addClass('main_content_slideUp');
		}
		else if(current_scroll_position < 10){
			$('.tiny_nav').removeClass('tiny_nav_shrink');
			$('.big_nav').removeClass('big_nav_shrink');
			$('.hero-main').removeClass('hero-main-shrink');
			$('.main_content').removeClass('main_content_slideUp');
			$('li').removeClass('active');
		}
	});

	var support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		effectSel = document.getElementById( 'fxselect' ),
		component = document.getElementById( 'component' ),
		items = component.querySelector( 'ul.itemwrap' ).children,
		current = 0,
		itemsCount = items.length,
		nav = component.querySelector( 'nav' ),
		navNext = nav.querySelector( '.next' ),
		navPrev = nav.querySelector( '.prev' ),
		isAnimating = false;

	function init() {
		//hideNav();
		//changeEffect();
		navNext.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'next' ); } );
		navPrev.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'prev' ); } );

		window.setInterval(function(){navigate( 'next' )}, 5000);
		//effectSel.addEventListener( 'change', changeEffect );
	}

	function hideNav() {
		nav.style.display = 'none';
	}

	function showNav() {
		nav.style.display = 'block';
	}

	function changeEffect() {
		component.className = component.className.replace(/\bfx.*?\b/g, '');
		if( effectSel.selectedIndex ) {
			classie.addClass( component, effectSel.options[ effectSel.selectedIndex ].value );
			showNav();
		}
		else {
			hideNav();
		}
	}

	function navigate( dir ) {
		if( isAnimating ) return false;
		isAnimating = true;
		var cntAnims = 0;


		var currentItem = items[ current ];

		if( dir === 'next' ) {
			current = current < itemsCount - 1 ? current + 1 : 0;
		}
		else if( dir === 'prev' ) {
			current = current > 0 ? current - 1 : itemsCount - 1;
		}

		var nextItem = items[ current ];

		var onEndAnimationCurrentItem = function() {
			this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
			classie.removeClass( this, 'current' );
			classie.removeClass( this, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
			++cntAnims;
			if( cntAnims === 2 ) {
				isAnimating = false;
			}
		}

		var onEndAnimationNextItem = function() {
			this.removeEventListener( animEndEventName, onEndAnimationNextItem );
			classie.addClass( this, 'current' );
			classie.removeClass( this, dir === 'next' ? 'navInNext' : 'navInPrev' );
			++cntAnims;
			if( cntAnims === 2 ) {
				isAnimating = false;
			}
		}

		if( support.animations ) {
			currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
			nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
		}
		else {
			onEndAnimationCurrentItem();
			onEndAnimationNextItem();
		}

		classie.addClass( currentItem, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
		classie.addClass( nextItem, dir === 'next' ? 'navInNext' : 'navInPrev' );
	}

	init();
});