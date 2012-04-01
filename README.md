#jQuery.carousel.js

##About

jQuery.carousel.js is a simple fade in/fade out carousel primarly using CSS Transitions with Javascript as fallback. This is work in progress. 

##Dependencies

jQuery.carousel requires:

1. jQuery 1.7 (due to use of "on()" and probably an easy fix if you need an older version of jQuery)
2. Modernizr (any version?)
3. Seperate CSS; setting styles for each item, giving each an absolute position. Styles and javascript is *mostly* seperated. 

	
## How to use
More info coming soon. Meanwhile, check out `demo.html` and `demo.css`.

By default the carousel auto starts and the interval is killed as soon as the user interacts with any part of the carousel navigation.

##Settings (default values)
	
	nav: 'full', //full, episode or carousel
	control: '#billboard-nav', //id of navigation
	transdur: 1000, //duration for transition
	time: 500' //time for each slide visible
	fadeOut: 'fade-out', //class name for fade out
	fadeIn: 'fade-in', //class name for fade in
	active: 'active' //class name for active slide in navigation
	prev: 'Prev' //label for previous link
	next: 'Next' //label for next link

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

