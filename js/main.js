$(document).ready(function() {

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

		var stuff = $('.post').text();
		// alert(stuff);

		// var pos = $('#breadcrumb').offset();
		// alert(pos);
		$('.breadcrumb_links').each(function(){
			if(current_scroll_position >= $(this).offset().top && current_scroll_position <= $(this).next().offset().top)
			{
				$('#breadcrumb_append').html('stuff > more >> ' + $(this).html());
				// $('#breadcrumb').html($(this).offset().top);

				return; //break the loop
			}
		});
	});
});