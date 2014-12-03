$(document).ready(function() {





  // ----------------------
  // touchmap________
  // ----------------------
// var users = [ 
// 	{
// 		name: "den",
// 		nav
// 	},

// ]




var rugge = $('.planet.rugge');
var den = $('.planet.den');
var planet = $('.planet');

var ruggeNav = rugge.find('span').text();
var denNav = den.find('span').text();

var ruggeVal = rugge.find('span');
var denVal = den.find('span');


//faccio il mining delle navicelle sui pianeti base
setInterval(function() {
  ++ ruggeNav;
  ++ denNav;
  rugge.find('span').text(ruggeNav);
  denVal.text(denNav);
}, 1000);


var navToMove, classToMove;

//clicco su un pianeta
planet.on('click', function () {
	// se non ho navi da muovere le raccolgo
	if( !navToMove ) {
		
		navToMove = parseInt($(this).find('span').text());
		$(this).find('span').text('00');
		console.log(navToMove);
		
		if ($(this).hasClass('den')) {
			denNav = '00';
			classToMove = 'den-child';
		} else if ($(this).hasClass('rugge')) {
			ruggeNav = '00';
			classToMove = 'rugge-child';
		}
	// se ho navi da muovere le setto sul nuovo pianeta
	} else {
		// se ci sono navi sul pianeta sommo le vecchie alle nuove
		if ($(this).find('span').text != '00') {
			var oldNav = parseInt($(this).find('span').text());
			navToMove = Math.abs(navToMove - oldNav);
		}
		if ($(this).hasClass('den')) {
			denNav = navToMove;
		} else if ($(this).hasClass('rugge')) {
			ruggeNav = navToMove;
		}
		$(this).find('span').text(navToMove);
		navToMove = null;
		 
	}

});

});
