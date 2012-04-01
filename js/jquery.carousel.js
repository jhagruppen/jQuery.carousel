/*
**  Copyright 2012, Andreas Johansson
**  Licensed under a MIT license, http://ibuypink.com/mit-license/
**
*/
(function($) {
	$.fn.carouselFade = function(options) {
	    var defaults = {  
	    	nav: 'all',
	        control: '#billboard-nav',
	        transtime: 1000,
	        fadeOut: 'fade-out',
	        fadeIn: 'fade-in',
	        active: 'active',
	        delay: 500
	    };  
	    var options = $.extend(defaults, options); 
	    var cCount = 0;
	    var cRunning = false; // if animation is running or not
		var formula = 'add'; // default is add
	    var cInt; // carousel interval; autostart
	    var refItems = new Array(); // reference to each slide
		var refCont = $(this); // container holding all slides
		var refWidth = refCont.width();
		var refControl = setupNav(options.nav);
		var refCSSTrans = Modernizr.csstransitions; // CSS Transitions availability in browser
	    return this.each(function() {  
			refCont.find('.item').each(function(i) { 
	            var obj = $(this)
	            	.addClass('item-'+(i+1))
	            	.attr({style:'transition-duration:'+options.transtime+'ms'
	            		+'; -moz-transition-duration:'+options.transtime+'ms'
	            		+'; -webkit-transition-duration:'+options.transtime+'ms'
	            		+'; -o-transition-duration:'+options.transtime+'ms'});
	            refItems[i] = obj;
	        });
	        $(options.control).find('a').on('click', function() {
	        	var t = $(this);
	            if(!cRunning) {
	            	runCarousel({
		            	rel:t.attr('rel'),
		            	href:t.attr('href')
	            	});
	            	if(t.attr('rel')==='episode') {
	            		t.addClass(options.active).parent().siblings().find('a').removeClass(options.active);
	            	}
	            }
	            clearInterval(cInt);
	            return false;
	        });
	        refCont.find(':first-child').addClass('fade-in');
	        cInt = setInterval(init, options.transtime + options.delay);
	    });
		function init() {
			cRunning = true;
			runCarousel({rel:'next'});
		}
		function runCarousel(val) {
			switch(val.rel) {
				case 'next':
					formula = 'add';
					break;
				case 'prev':
					formula = 'subtract';
					break;
				default:
					formula = 'episode';
					break;
			} // end switch
			var el = refItems[count(val.href)];
			if (refCSSTrans) {
				el
					.removeClass(options.fadeOut).addClass(options.fadeIn)
					.siblings().removeClass(options.fadeIn).addClass(options.fadeOut);
				cRunning = false;	
			} else {
				el.fadeTo(options.transtime, 1, function() {
					cRunning = false;
				}).siblings().fadeTo(options.transtime, 0);
			}
		}
		function count(val) {
			if(cCount === (refItems.length - 1)) {
			    if(formula==='add') cCount = 0;
			    if(formula==='subtract') cCount--;
			    if(formula==='episode') cCount = $(val).index();
			} else if(cCount === 0) {
			    if(formula==='add') cCount++;
			    if(formula==='subtract') cCount = refItems.length - 1;
			    if(formula==='episode') cCount = $(val).index();
			} else {
				if(formula==='add') cCount++;
				if(formula==='subtract') cCount--;
				if(formula==='episode') cCount = $(val).index();
			}
			return cCount;
		}
		function setupNav(val) {
			if($(options.control).length===0) {
				switch(val) {
					case 'carousel':
						refCont.after('<ul id="'+options.control.replace('#', '')+'"></ul>');
						refControl = $(options.control);	
						refControl.append('<li><a href="#item" rel="prev">Prev</a></li>');
						refControl.append('<li><a href="#item" rel="next">Next</a></li>');
						break;
					case 'all':
						refCont.children().each(function(i) {
							if(i===0) {
								refCont.after('<ul id="'+options.control.replace('#', '')+'"></ul>');
								refControl = $(options.control);	
								refControl.append('<li><a href="" rel="prev">Prev</a></li>');
							} 
							a = i+1;
							refControl.append('<li><a href="#item-'+a+'" rel="episode">'+a+'</a></li>');
							if(i===refCont.children().length-1) {
								refControl.append('<li><a href="" rel="next">Next</a></li>');
							}
						});
						break;	
					default:
						refCont.children().each(function(i) {
							if(i===0) {
								refCont.after('<ul id="'+options.control.replace('#', '')+'"></ul>');
								refControl = $(options.control);	
							} 
							a = i+1;
							refControl.append('<li><a href="#item-'+a+'" rel="episode">'+a+'</a></li>');
						});
						break;	
				} 
			}
			return $(options.control);	
		}
	};
})(jQuery);


$('#billboard').carouselFade();