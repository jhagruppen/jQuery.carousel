/*
**  Copyright 2012, Andreas Johansson
**  Licensed under a MIT license, http://ibuypink.com/mit-license/
**
*/
(function($) {
	$.fn.carousel = function(options) {
		var defaults = {  
			nav: 'full',
			control: 'carousel-nav',
			transdur: 1000,
			out: 'fade-out',
			in: 'fade-in',
			active: 'active',
			time: 500,
			prev:'Prev',
			prevId:'carousel-prev',
			next:'Next',
			nextId:'carousel-next'
		};  
		var options = $.extend(defaults, options); 
		var cCount = 0;
		var cRunning = false; // if animation is running or not
		var cFormula = 'add'; // default is add
		var cInt; // carousel interval; autostart
		var refCont = $(this); // container holding all slides
		var refItems = new Array(); // reference to each slide
		var refContChildren = refCont.find('.item'); 
		var refControl = setupNav(options.nav);
		var refCSSTrans = Modernizr.csstransitions; // CSS Transitions availability in browser
		return this.each(function() {  
			refContChildren.each(function(i) { 
			var obj = $(this)
				.addClass('item-'+(i+1))
				.attr({style:'transition-duration:'+options.transdur+'ms'
					+'; -moz-transition-duration:'+options.transdur+'ms'
					+'; -webkit-transition-duration:'+options.transdur+'ms'
					+'; -o-transition-duration:'+options.transdur+'ms'});
				refItems[i] = obj;
			});
			$('#'+options.control).find('a').on('click', function() {
				var t = $(this);
				if(!cRunning) {
					runCarousel({
						rel:t.attr('rel'),
						href:t.attr('href')
					});
				}
				clearInterval(cInt);
				return false;
			});
			refCont.find(':first-child').addClass(options.in);
			setActive();
			if(refItems.length>1) cInt = setInterval(init, options.transdur + options.time);
		});
		function init() {
			cRunning = true;
			runCarousel({rel:'next'});
		}
		function runCarousel(val) {
			switch(val.rel) {
				case 'next':
					cFormula = 'add';
					break;
				case 'prev':
					cFormula = 'subtract';
					break;
				default:
					cFormula = 'episode';
					break;
			} 
			var el = refItems[count(val.href)];
				if (refCSSTrans) {
					el
						.removeClass(options.out).addClass(options.in)
						.siblings().removeClass(options.in).addClass(options.out);
					cRunning = false;	
				} else {
					el.fadeTo(options.transdur, 1, function() {
						cRunning = false;
				}).siblings().fadeTo(options.transdur, 0);
			}
			setActive(val);
		}
		function setActive(val) {
			refControl.find('a').removeClass(options.active);
			var t = refControl.find('.item-'+(cCount+1)+' a');
			if(t.length>0) t.addClass(options.active);
		}
		function count(val) {
			if(cFormula==='episode') cCount = $(val).index();
			if(cCount === (refItems.length - 1)) {
				if(cFormula==='add') cCount = 0;
				if(cFormula==='subtract') cCount--;
			} else if(cCount === 0) {
				if(cFormula==='add') cCount++;
				if(cFormula==='subtract') cCount = refItems.length - 1;
			} else {
				if(cFormula==='add') cCount++;
				if(cFormula==='subtract') cCount--;
			}
			return cCount;
		}
		function setupNav(val) {
			if($('#'+options.control).length===0&&refContChildren.length>1) {
				switch(val) {
					case 'carousel':
						refCont.after('<ul id="'+options.control+'"></ul>');
						refControl = $('#'+options.control);	
						refControl.append('<li id="'+options.prevId+'"><a href="javascript:;" rel="prev">'+options.prev+'</a></li>');
						refControl.append('<li id="'+options.nextId+'"><a href="javascript:;" rel="next">'+options.next+'</a></li>');
						break;
					case 'full':
						refCont.children().each(function(i) {
							if(i===0) {
								refCont.after('<ul id="'+options.control+'"></ul>');
								refControl = $('#'+options.control);	
								refControl.append('<li id="'+options.prevId+'"><a href="" rel="prev">'+options.prev+'</a></li>');
							} 
							a = i+1;
							refControl.append('<li class="item-'+a+'"><a href="#item-'+a+'" rel="episode">'+a+'</a></li>');
							if(i===refCont.children().length-1) {
								refControl.append('<li id="'+options.nextId+'"><a href="javascript:;" rel="next">'+options.next+'</a></li>');
							}
						});
						break;	
					default:
						refCont.children().each(function(i) {
							if(i===0) {
								refCont.after('<ul id="'+options.control.replace('#', '')+'"></ul>');
								refControl = $('#'+options.control);	
							} 
							a = i+1;
							refControl.append('<li class="item-'+a+'"><a href="#item-'+a+'" rel="episode">'+a+'</a></li>');
						});
						break;	
				} 
			}
			return $('#'+options.control);	
		}
	};
})(jQuery);