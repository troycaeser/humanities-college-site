$(document).ready(function() {

	$(window).scroll(function(){
		var current_scroll_position = $(this).scrollTop();

		if(current_scroll_position > 30){
			$('.big_nav').addClass('big_nav_shrink');
			$('.hero-main').addClass('hero-main-shrink')
		}
		else if(current_scroll_position < 30){
			$('.big_nav').removeClass('big_nav_shrink');
			$('.hero-main').removeClass('hero-main-shrink');
			$('li').removeClass('active');
		}

		var stuff = $('.post').text();
		// alert(stuff);

		// var pos = $('#breadcrumb').offset();
		// alert(pos);
		$('.post').each(function(){
			if(current_scroll_position >= $(this).offset().top && current_scroll_position <= $(this).next().offset().top)
			{
				// $('#breadcrumb').html('stuff > more >> ' + $(this).html());
				$('#breadcrumb').html($(this).offset().top);

				return; //break the loop
			}
		});
	});
});