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
		
		var oldNav = parseInt($(this).find('span').text());

		if ($(this).hasClass('den-child') && classToMove === 'den-child') {
			navToMove = navToMove + oldNav;
		} else {
			var diff = navToMove - oldNav;
			if (diff > 0) {
				navToMove = Math.abs(diff);
				$(this).addClass('den-child');
				$(this).removeClass('rugge-child');
			} else if (diff < 0) {
				navToMove = Math.abs(diff);
				$(this).addClass('rugge-child');
				$(this).removeClass('den-child');
			} else {
				navToMove = '00';
				$(this).removeClass('den-child rugge-child');
			}
		}

		if ($(this).hasClass('rugge-child') && classToMove === 'rugge-child') {
				navToMove = navToMove + oldNav;
		} else {
			var diff = navToMove - oldNav;
			if (diff > 0) {
				navToMove = Math.abs(diff);
				$(this).addClass('rugge-child');
				$(this).removeClass('den-child');
			} else if (diff < 0) {
				navToMove = Math.abs(diff);
				$(this).addClass('den-child');
				$(this).removeClass('rugge-child');
			} else {
				navToMove = '00';
				$(this).removeClass('rugge-child den-child');
			}
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
