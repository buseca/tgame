$(document).ready(function() {


// mappo i pianeti e creo le loro varibili

// tutti i pianeti nelo stage
var planet = $('.planet');

// i pianeti madre dei giocatori
var rugge = $('.planet.rugge');
var den = $('.planet.den');

// pianeti generici
var uno = $('.planet-1');
var due = $('.planet-2');
var tre = $('.planet-3');
var quattro = $('.planet-4');
var cinque = $('.planet-5');
var sei = $('.planet-6');
var sette = $('.planet-7');

// i cotenitori del numero di navicelle visualizzato nei pianeti madre
var ruggeVal = rugge.find('span');
var denVal = den.find('span');
// il numero vero e proprio
var ruggeNav = rugge.find('span').text();
var denNav = den.find('span').text();



//faccio il mining delle navicelle sui pianeti madre
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
		// se il pianeta su cui clicco è vuoto o ha una solo nava esco senza fare niente 
		if ($(this).find('span').text() === '00' || $(this).find('span').text() == 1) {
			return;
		}
		navToMove = parseInt($(this).find('span').text()) - 1;
		$(this).find('span').text('1');
		console.log(navToMove);
		
		if ($(this).hasClass('den')) {
			denNav = '1';
			classToMove = 'den-child';
		} else if ($(this).hasClass('rugge')) {
			ruggeNav = '1';
			classToMove = 'rugge-child';
		}
	// se ho navi da muovere le setto sul nuovo pianeta
	} else {
		// se ci sono navi sul pianeta sommo le vecchie alle nuove
		
		var oldNav = parseInt($(this).find('span').text());

		if (classToMove === 'den-child') {
			if ($(this).hasClass('den-child' || 'den')) {
				navToMove = navToMove + oldNav;
			} else {
				var diff = navToMove - oldNav;
				if (diff > 0) {
					navToMove = Math.abs(diff);
					$(this).addClass('den-child');
					$(this).removeClass('rugge-child').removeClass('rugge');
				} else if (diff < 0) {
					navToMove = Math.abs(diff);
					$(this).addClass('rugge-child');
					// se era il pianeta padre gli tolgo la classe padre
					$(this).removeClass('den-child');			
				} else {
					navToMove = '00';
					$(this).removeClass('den-child rugge-child');
				}
			}
		} else {
			if ($(this).hasClass('rugge-child || rugge') ) {
				navToMove = navToMove + oldNav;
			} else {
				var diff = navToMove - oldNav;
				if (diff > 0) {
					navToMove = Math.abs(diff);
					$(this).addClass('rugge-child');
					$(this).removeClass('den-child').removeClass('den');
				} else if (diff < 0) {
					navToMove = Math.abs(diff);
					$(this).addClass('den-child');
					// se era il pianeta padre gli tolgo la classe padre
					$(this).removeClass('rugge-child');				
				} else {
					navToMove = '00';
					$(this).removeClass('rugge-child den-child');
				}
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









//  Connessioni a Firebase

// variabili per mandar su i dati
var tGame = new Firebase('https://tgame.firebaseio.com/');
var ruggeNavToSend, unoNavToSend, dueNavToSend, treNavToSend, quattroNavToSend, cinqueNavToSend, seiNavToSend, setteNavToSend;

// mando su i dati ad ogni click 
$("*").click(function () {

// metto in variabili gli attuali valori delle navicelle sui rispettivi pianeti
  ruggeNavToSend = rugge.find('span').text();
  denNavToSend = den.find('span').text();
  unoNavToSend = uno.find('span').text();
  dueNavToSend = due.find('span').text();
  treNavToSend = tre.find('span').text();
  quattroNavToSend = quattro.find('span').text();
  cinqueNavToSend = cinque.find('span').text();
  seiNavToSend = sei.find('span').text();
  setteNavToSend = sette.find('span').text();

// mando su l'oggetto con SET , che sovrascrive quelli vecchi
  tGame.set( { navicellePianeti: { 
  		denNav: denNav,
  		ruggeNav: ruggeNav,
  		unoNav: unoNavToSend,
  		dueNav: dueNavToSend,
  		treNav: treNavToSend,
  		quattroNav: quattroNavToSend,
  		cinqueNav: cinqueNavToSend,
  		seiNav: seiNavToSend,
  		setteNav: setteNavToSend
  	}

  });

});



// fine document ready
});
