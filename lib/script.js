/* pulsate code source: http://jsfiddle.net/ipyxel/yGZxL/ */
function pulsate() {
	var pulser = $(".down-arrow");
	if(!pulser.hasClass('stop pulsing')){
		pulser.animate({opacity:
		/*how faded element will get*/ 0.2},
		/*how quickly element fades out*/ 1000, 'linear')
		.animate({opacity: 1},
		/*how quickly element will fade back in*/1000, 'linear', pulsate);
	} else{
		pulser.animate({opacity: 1},10)
		.removeClass('stop pulsing');
	}
}

$(function() {
	$(".description").hover(function() {
			$(this).css("height", "30%");
			$(this).css("width", "45%");
			$(this).css("font-size", "160%");
			$(this).css("margin-left", "52%");
		}, function() {
			$(this).css("height", "24%");
			$(this).css("width", "40%");
			$(this).css("font-size", "140%");
			$(this).css("margin-left", "55%");
		
		}	
	);
});

$(document).ready(function() {

	pulsate();
	
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		$(".welcome-screen").css("opacity", 1 - scroll / 500);
		$(".container").css("opacity", scroll / 700);
		$(".initial-text").css("opacity", 1 - scroll / 800);
	});	
});


