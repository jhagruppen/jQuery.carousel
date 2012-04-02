#jQuery.carousel.js

##About

jQuery.carousel.js is a simple carousel/gallery plugin that focus on seperating Javascript and CSS. It primarily uses CSS Transitions to handle the animations, so the value that changes can possibly be anything and fallbacks to fade-in/out if CSS Transitions is not supported by the browser. 

By default, the carousel auto starts and loops through all the items and starts over from the beginning. The interval is killed as soon as the user interacts with any part of the carousel navigation.


##Dependencies

jQuery.carousel.js requires:

1. jQuery 1.7 (due to use of "on()" and probably an easy fix if you need an older version of jQuery)
2. Modernizr (any version?)
3. Seperate CSS; setting styles for each item, giving each an absolute position. Styles and javascript is *mostly* seperated. 

## How to use

Check out `demo.html` and `demo.css` for an example how to use it.

Basically, make sure jQuery and Modernizr is included before the plugin.

Use any HTML you prefer, as long as it's structured this way and you use the `item`-class.

#####HTML

	<element id="your_id">
		<element class="item">…</element>
		<element class="item">…</element>
		<element class="item">…</element>
	</element>
	
#####Javascript

	$('#your_id').carousel({
		prev: '&larr;',
		next: '&rarr;',
		transdur: 250,
		time: 1250
	});



##Settings (with default values)
	
	nav: 'full', //full, episode or carousel
	control: 'carousel-nav', //id of navigation
	transdur: 1000, //duration for transition
	time: 500' //time for each slide visible
	out: 'fade-out', //class name for fade out
	in: 'fade-in', //class name for fade in
	active: 'active', //class name for active slide in navigation
	prev: 'Prev', //label for previous link
	prevId: 'carousel-prev', //id for prev wrapping element
	next: 'Next', //label for next link
	nextId: 'carousel-next' //id for next wrapping element
	

###Setting: nav
<table>
	<tr>
		<th width="20%">'full'</th>
		<td>Displays the full set of ways to navigate the carousel, i.e.  	"prev | 1 | 2 | 3 | … | next" </td>
	</tr>
	<tr>
		<th>'episode'</th>
		<td>Displays a link for each item in the carousel, each represented by a number, i.e. " 1 | 2 | 3 | … " </td>
	</tr>
	<tr>
		<th>'carousel'</th>
		<td>Just displays a previous and next button, i.e. " prev | next" </td>
	</tr>
</table>


## Browser support
More info coming soon.

So far tested and works with:

* Chrome 18/Mac
* Safari 5/Mac
* Opera 11.6/Mac
* Firefox 11/Mac

