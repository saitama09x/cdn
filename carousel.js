(function($){

$(document).ready(function(){

var carousel = $("#carousel");
var wrap = carousel.find('.carousel-wrapper');
var elem_arr = [];
var max_width = 600 * wrap.find('.slider-image').length;

var right_nav = $("<div>");
right_nav.addClass("right-nav");
var right_nav_img = $("<img>");
right_nav_img.attr({"src" : 'http://staging.xiliumvirtual.com/wp-content/uploads/2018/10/right_arrow.png'});
right_nav_img.css({'height' : "110px", 'position': 'relative', 'top': '145px'});
right_nav.append(right_nav_img);

var left_nav = $("<div>");
left_nav.addClass("left-nav");
var left_nav_img = $("<img>");
left_nav_img.attr({"src" : 'http://staging.xiliumvirtual.com/wp-content/uploads/2018/10/left_arrow.png'});
left_nav_img.css({'height' : "110px", 'position': 'relative', 'top': '145px'});
left_nav.append(left_nav_img);

left_nav.css({'position' : 'absolute', "left" : "0px", "top" : "0px"});
right_nav.css({'position' : 'absolute', "right" : "0px", "top" : "0px"});

carousel.append(left_nav);
carousel.append(right_nav);

wrap.css({'width' : max_width + "px"});

wrap.find('.slider-image').each(function(i,v){
	var img = $(this).find('img');
	var width = img.width();
	var height = img.height();
	
	$(this).find('img').css({'width' : width + "px", 'display' : 'none'});
	
	$(this).css({'width' : "600px", "height" : "400px", 
		'background-image' : 'url(' + img.attr('src') + ')',
		'background-size' : "600px 400px"});
	
	elem_arr.push($(this));
});


var cur_pos = 0;
var is_clicked = false;
var offset = null;
var left_pos = 0;
var start_click = 0;

wrap.mousedown(function(e){

	if(!is_clicked){
		cur_pos = e.clientX;
		start_click = cur_pos;
		is_clicked = true;
		offset = $(this).offset();
		left_pos = offset.left;
	}

})
.mousemove(function(e){
	if(is_clicked){
		var xpos = cur_pos - e.clientX;
		cur_pos = e.clientX;
		left_pos = left_pos - xpos;
		var diff = max_width - (left_pos - ($(document).width() - 50));
		if(diff < max_width * 2 && left_pos <= 50){
			$(this).css({ "transform" : "translate("+left_pos+"px, 0px)"});
		}
	}
})
.mouseup(function(e){
	is_clicked = false;
	var _diff = start_click - cur_pos;
	if(_diff > 100 && _diff < 300){
		left_pos = left_pos - _diff;
		var diff = max_width - (left_pos - ($(document).width() - 50));
		if(diff < max_width * 2 && left_pos <= 50){
			$(this).css({ "transition" : "transform 500ms", "transform" : "translate("+left_pos+"px, 0px)"});
		}
	}
})
.mouseleave(function(e){
	is_clicked = false;
});


right_nav.click(function(){

	left_pos = left_pos + 200;
	var diff = max_width - (left_pos - ($(document).width() - 50));
	if(diff < max_width * 2 && left_pos <= 50){
		wrap.css({ "transform" : "translate("+left_pos+"px, 0px)"});
	}
});

left_nav.click(function(){
	left_pos = left_pos - 200;
	var diff = max_width - (left_pos - ($(document).width() - 50));
	if(diff < max_width * 2 && left_pos <= 50){
		wrap.css({ "transform" : "translate("+left_pos+"px, 0px)",  "transition" : "transform 500ms"});
	}
});

});
	
})(jQuery)