/*
**  Copyright 2012, Andreas Johansson
**  Licensed under a MIT license, http://ibuypink.com/mit-license/
**
*/(function(b){b.fn.carouselFade=function(c){function n(){f=!0;o({rel:"next"})}function o(a){switch(a.rel){case"next":g="add";break;case"prev":g="subtract";break;default:g="episode"}var b=j[q(a.href)];if(m){b.removeClass(c.fadeOut).addClass(c.fadeIn).siblings().removeClass(c.fadeIn).addClass(c.fadeOut);f=!1}else b.fadeTo(c.transdur,1,function(){f=!1}).siblings().fadeTo(c.transdur,0);p(a)}function p(a){l.find("a").removeClass(c.active);var b=l.find(".item-"+(e+1)+" a");b.length>0&&b.addClass(c.active)}function q(a){g==="episode"&&(e=b(a).index());if(e===j.length-1){g==="add"&&(e=0);g==="subtract"&&e--}else if(e===0){g==="add"&&e++;g==="subtract"&&(e=j.length-1)}else{g==="add"&&e++;g==="subtract"&&e--}return e}function r(d){if(b("#"+c.control).length===0&&k.length>1)switch(d){case"carousel":i.after('<ul id="'+c.control+'"></ul>');l=b("#"+c.control);l.append('<li id="'+c.prevId+'"><a href="javascript:;" rel="prev">'+c.prev+"</a></li>");l.append('<li id="'+c.nextId+'"><a href="javascript:;" rel="next">'+c.next+"</a></li>");break;case"full":i.children().each(function(d){if(d===0){i.after('<ul id="'+c.control+'"></ul>');l=b("#"+c.control);l.append('<li id="'+c.prevId+'"><a href="" rel="prev">'+c.prev+"</a></li>")}a=d+1;l.append('<li class="item-'+a+'"><a href="#item-'+a+'" rel="episode">'+a+"</a></li>");d===i.children().length-1&&l.append('<li id="'+c.nextId+'"><a href="javascript:;" rel="next">'+c.next+"</a></li>")});break;default:i.children().each(function(d){if(d===0){i.after('<ul id="'+c.control.replace("#","")+'"></ul>');l=b("#"+c.control)}a=d+1;l.append('<li class="item-'+a+'"><a href="#item-'+a+'" rel="episode">'+a+"</a></li>")})}return b("#"+c.control)}var d={nav:"full",control:"carousel-nav",transdur:1e3,fadeOut:"fade-out",fadeIn:"fade-in",active:"active",time:500,prev:"Prev",prevId:"carousel-prev",next:"Next",nextId:"carousel-next"},c=b.extend(d,c),e=0,f=!1,g="add",h,i=b(this),j=new Array,k=i.find(".item"),l=r(c.nav),m=Modernizr.csstransitions;return this.each(function(){k.each(function(a){var d=b(this).addClass("item-"+(a+1)).attr({style:"transition-duration:"+c.transdur+"ms"+"; -moz-transition-duration:"+c.transdur+"ms"+"; -webkit-transition-duration:"+c.transdur+"ms"+"; -o-transition-duration:"+c.transdur+"ms"});j[a]=d});b("#"+c.control).find("a").on("click",function(){var a=b(this);f||o({rel:a.attr("rel"),href:a.attr("href")});clearInterval(h);return!1});i.find(":first-child").addClass(c.fadeIn);p();j.length>1&&(h=setInterval(n,c.transdur+c.time))})}})(jQuery);