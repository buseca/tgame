$(document).ready(function() {


// mappo i pianeti e creo le loro varibili

// tutti i pianeti nelo stage
var planet = $('.planet');


// pianeti generici
var p1 = $('.p1');
var p2 = $('.p2');
var p3 = $('.p3');
var p4 = $('.p4');
var p5 = $('.p5');
var p6 = $('.p6');
var p7 = $('.p7');
var p8 = $('.p8');
var p9 = $('.p9');

// navicelle sui pianeti
var p1Nav = p1.find('span').text();
var p2Nav = p2.find('span').text();
var p3Nav = p3.find('span').text();
var p4Nav = p4.find('span').text();
var p5Nav = p5.find('span').text();
var p6Nav = p6.find('span').text();
var p7Nav = p7.find('span').text();
var p8Nav = p8.find('span').text();
var p9Nav = p9.find('span').text();




//faccio il mining delle navicelle sui pianeti madre 
setInterval(function() {
  ++ p1Nav;
  ++ p2Nav;
  ++ p3Nav;
  ++ p4Nav;
  ++ p5Nav;
  ++ p6Nav;
  ++ p7Nav;
  ++ p8Nav;
  ++ p9Nav;
  p1.find('span').text(p1Nav);
  p2.find('span').text(p2Nav);
  p3.find('span').text(p3Nav);
  p4.find('span').text(p4Nav);
  p5.find('span').text(p5Nav);
  p6.find('span').text(p6Nav);
  p7.find('span').text(p7Nav);
  p8.find('span').text(p8Nav);
  p9.find('span').text(p9Nav);
}, 2000);









//  Connessioni a Firebase

var connections = 'ciao';
// scarico le connections e le metto in var:
var tGameConnections = new Firebase('https://tgame.firebaseio.com/connections');
tGameConnections.on("value", function(snapshot) {
	connections = snapshot.val();
	console.log(connections.p1[0]);
});



// scarico i dati generali relativi alla partita
var tGameGameData = new Firebase('https://tgame.firebaseio.com/gameData');
tGameGameData.on("value", function(snapshot) {
	var gameData = snapshot.val();
});



// scarico i dati relativi lle navicelle dei pianeti sullo stage
var tGameNavicellePianeti = new Firebase('https://tgame.firebaseio.com/navicellePianeti');
tGameNavicellePianeti.on("value", function(snapshot) {
	var navicellePianeti = snapshot.val();

	// aggiorno le variabili 
	p1Nav = navicellePianeti.p1Nav;
	p2Nav = navicellePianeti.p2Nav;
	p3Nav = navicellePianeti.p3Nav;
	p4Nav = navicellePianeti.p4Nav;
	p5Nav = navicellePianeti.p5Nav;
	p6Nav = navicellePianeti.p6Nav;
	p7Nav = navicellePianeti.p7Nav;
	p8Nav = navicellePianeti.p8Nav;
	p9Nav = navicellePianeti.p9Nav;

	// inserisco ogni valore nel rispettivo pianeta dello stage
	p1.find('span').text(p1Nav);
	p2.find('span').text(p2Nav);
	p3.find('span').text(p3Nav);
	p4.find('span').text(p4Nav);
	p5.find('span').text(p5Nav);
	p6.find('span').text(p6Nav);
	p7.find('span').text(p7Nav);
	p8.find('span').text(p8Nav);
	p9.find('span').text(p9Nav);
});



// mando su i dati dei pianeti aggiornati ad ogni click 
$("*").click(function () {

	// accedo ai valori aggiornati delle navi dei pianeti e li metto in variabili per buttarli su
	/* 
	ERROR > non va bene appoggiarsi al dom per ricavare i dati delle variabili, perchè il dom è facilmente modificabile
	bisogna sempre basarsi sui dati in database, tenendoli sempre aggiornati e scaricandoli quando servono.
	*/
	p1Nav = p1.find('span').text();
	p2Nav = p2.find('span').text();
	p3Nav = p3.find('span').text();
	p4Nav = p4.find('span').text();
	p5Nav = p5.find('span').text();
	p6Nav = p6.find('span').text();
	p7Nav = p7.find('span').text();
	p8Nav = p8.find('span').text();
	p9Nav = p9.find('span').text();

	// mando su l'oggetto con UPDATE

	tGameNavicellePianeti.update( { 
		p1Nav : p1Nav,
		p2Nav : p2Nav,
		p3Nav : p3Nav,
		p4Nav : p4Nav,
		p5Nav : p5Nav,
		p6Nav : p6Nav,
		p7Nav : p7Nav,
		p8Nav : p8Nav,
		p9Nav : p9Nav
	});

});














var navToMove, classToMove;

//clicco su un pianeta
planet.on('click', function () {
	// se non ho navi da muovere le raccolgo
	if( !navToMove ) {
		// se il pianeta su cui clicco è vuoto o ha una solo nave esco senza fare niente 
		if (
			$(this).find('span').text() === '0' || 
			$(this).find('span').text() == 1
			) {
			return;
		}
		navToMove = parseInt($(this).find('span').text()) - 1;
		$(this).find('span').text('1');
		
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























// SET DEL JSON DEL DATABSE:

tGame.set( { 
			// dati della partita
			gameData : {
				players : {
					pl1 : {
						name : 'rugge',
						motherPlanet : 'p1',
						id : 1
					},
					pl2 : {
						name : 'den',
						motherPlanet : 'p5',
						id : 2
					},
					pl3 : {
						name : 'gigi',
						motherPlanet : 'p9',
						id : 3
					}
				},
				planetsOnStage : {
					p1 : {
						type : mother,
						initNav : '2',
						level : '0',
						connections : ['p2','p3'],
						id : '1'
					},
					p2 : {
						// ...
						// ...
						// ..
						// ..
						// ..e via così

					}
				}
			},
			// dati del turno
			navOnPlanets : { 
				p1 : {
					p1Nav : p1Nav,
					owner : 'owner'
				},
				p2 : {
					p2Nav : p2Nav,
					owner : 'owner'
				},
				p3 : {
					p3Nav : p3Nav,
					owner : 'owner'
				},
				p4 : {
					p4Nav : p4Nav,
					owner : 'owner'
				},
				p5 : {
					p5Nav : p5Nav,
					owner : 'owner'
				},
				p6 : {
					p6Nav : p6Nav,
					owner : 'owner'
				},
				p7 : {
					p7Nav : p7Nav,
					owner : 'owner'
				},
				p8 : {
					p8Nav : p8Nav,
					owner : 'owner'
				},
				p9 : {
					p9Nav : p9Nav,
					owner : 'owner'
				}
			},
			// le connection qui forse sono inutili perchè già presenti sopra
			connections : {
				p1 : [
					'p2',
					'p3'
				],
				p2 : [
					'p1',
					'p3',
					'p5',
					'p4'
				],
				p3 : [
					'p1',
					'p2',
					'p5',
					'p6'
				],
				p4 : [
					'p2',
					'p5',
					'p7'
				],
				p5 : [
					'p2',
					'p3',
					'p4',
					'p6',
					'p7',
					'p8'
				],
				p6 : [
					'p3',
					'p5',
					'p8'
				],
				p7 : [
					'p4',
					'p5',
					'p8',
					'p9'
				],
				p8 : [
					'p6',
					'p5',
					'p7',
					'p9'
				],
				p9 : [
					'p7',
					'p8'
				]
			}

	});





// fine document ready
});
