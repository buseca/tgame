$(document).ready(function() {


// mappo i pianeti e creo le loro varibili

// tutti i pianeti nelo stage
var planet = $('.planet');


// pianeti generici
var p1 = $('.p1');
var p2 = $('.p2');
var p3 = $('.p3');
var p4 = $('.p4');


// INIZIO SCRIPT DI BASE
// faccio il listening dello stato dell'utente
ref.onAuth(function(authData) {
  if (authData) {
    // user authenticated with Firebase
    console.log("User ID: " + authData.uid + ", email: " + authData.password.email);

    var tGame = new Firebase('https://tgame.firebaseio.com');
    tGame.on("value", function(snapshot) {
    	// oggetto json con tutti i dati scricati al loading della pagina:
    	var allData = snapshot.val();
    	// oggetto json con dati dei playrs:
    	var allDataPlayers = allData.gameData.players;
    	// array delle chiavi dell'oggetto allDataPlayers:
    	var arrPlayers = Object.keys(allDataPlayers);
    	// numero delle chiavi e quindi dei players:
    	var numberOfPlayers = arrPlayers.length;

    	// ciclo l'oggetto dei players per fare il matching con la mail che ha fatto il login e capire chi è il player attuale
    	for (index = 0; index < numberOfPlayers; ++index) {
    	    if ( allDataPlayers[arrPlayers[index]].email === authData.password.email ) {
    			var currPlayer = allDataPlayers[arrPlayers[index]].email;
    			var currMotherPlanet = allDataPlayers[arrPlayers[index]].motherPlanet;
    			var currPlayerName = allDataPlayers[arrPlayers[index]].name;
    			var currPlayerId = allDataPlayers[arrPlayers[index]].id;
    	    }
    	}

    	// al click sul pianeta verifico se è il pianeta madre del player
    	$(".planet").click(function () {
    		if ( $(this).attr('id') === currMotherPlanet ) {
    			$(this).text('clicked!');
    		}
    	});


    });









  } else {
    alert('utente non autenticato');
  }
});









//  Connessioni a Firebase

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

	// inserisco ogni valore nel rispettivo pianeta dello stage
	p1.find('span').text(p1Nav);
	p2.find('span').text(p2Nav);
	p3.find('span').text(p3Nav);
	p4.find('span').text(p4Nav);
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

	// mando su l'oggetto con UPDATE

	tGameNavicellePianeti.update( { 
		p1Nav : p1Nav,
		p2Nav : p2Nav,
		p3Nav : p3Nav,
		p4Nav : p4Nav,
	});

});














// var navToMove, classToMove;

// //clicco su un pianeta
// planet.on('click', function () {
// 	// se non ho navi da muovere le raccolgo
// 	if( !navToMove ) {
// 		// se il pianeta su cui clicco è vuoto o ha una solo nave esco senza fare niente 
// 		if (
// 			$(this).find('span').text() === '0' || 
// 			$(this).find('span').text() == 1
// 			) {
// 			return;
// 		}
// 		navToMove = parseInt($(this).find('span').text()) - 1;
// 		$(this).find('span').text('1');
		
// 		if ($(this).hasClass('den')) {
// 			denNav = '1';
// 			classToMove = 'den-child';
// 		} else if ($(this).hasClass('rugge')) {
// 			ruggeNav = '1';
// 			classToMove = 'rugge-child';
// 		}
// 	// se ho navi da muovere le setto sul nuovo pianeta
// 	} else {
// 		// se ci sono navi sul pianeta sommo le vecchie alle nuove
		
// 		var oldNav = parseInt($(this).find('span').text());

// 		if (classToMove === 'den-child') {
// 			if ($(this).hasClass('den-child' || 'den')) {
// 				navToMove = navToMove + oldNav;
// 			} else {
// 				var diff = navToMove - oldNav;
// 				if (diff > 0) {
// 					navToMove = Math.abs(diff);
// 					$(this).addClass('den-child');
// 					$(this).removeClass('rugge-child').removeClass('rugge');
// 				} else if (diff < 0) {
// 					navToMove = Math.abs(diff);
// 					$(this).addClass('rugge-child');
// 					// se era il pianeta padre gli tolgo la classe padre
// 					$(this).removeClass('den-child');			
// 				} else {
// 					navToMove = '00';
// 					$(this).removeClass('den-child rugge-child');
// 				}
// 			}
// 		} else {
// 			if ($(this).hasClass('rugge-child || rugge') ) {
// 				navToMove = navToMove + oldNav;
// 			} else {
// 				var diff = navToMove - oldNav;
// 				if (diff > 0) {
// 					navToMove = Math.abs(diff);
// 					$(this).addClass('rugge-child');
// 					$(this).removeClass('den-child').removeClass('den');
// 				} else if (diff < 0) {
// 					navToMove = Math.abs(diff);
// 					$(this).addClass('den-child');
// 					// se era il pianeta padre gli tolgo la classe padre
// 					$(this).removeClass('rugge-child');				
// 				} else {
// 					navToMove = '00';
// 					$(this).removeClass('rugge-child den-child');
// 				}
// 			}
		
// 		}
// 		if ($(this).hasClass('den')) {
// 			denNav = navToMove;
// 		} else if ($(this).hasClass('rugge')) {
// 			ruggeNav = navToMove;
// 		}
// 		$(this).find('span').text(navToMove);
// 		navToMove = null;
		 
// 	}

// });























// var tGame = new Firebase('https://tgame.firebaseio.com/');


// // // SET DEL JSON DEL DATABSE:

// tGame.set( { 
// 	// dati della partita
// 	gameData : {
// 		numberOfPlayers : 3 ,
// 		players : {
// 			pl1 : {
// 				email : 'ruggero.motta@gmail.com',
// 				name : 'rugge',
// 				motherPlanet : 'p1',
// 				id : 1
// 			},
// 			pl2 : {
// 				email : 'daniele.bertella@gmail.com',
// 				name : 'den',
// 				motherPlanet : 'p2',
// 				id : 2
// 			},
// 			pl3 : {
// 				email : 'gigi@gigi.com',
// 				name : 'gigi',
// 				motherPlanet : 'p3',
// 				id : 3
// 			}
// 		},
// 		numberOfPlanets : 4 ,
// 		planetsOnStage : {
// 			p1 : {
// 				type : 'mother',
// 				initNav : '2',
// 				level : '0',
// 				connections : ['p2','p3'],
// 				id : '1'
// 			},
// 			p2 : {
// 				type : 'mother',
// 				initNav : '2',
// 				level : '0',
// 				connections : ['p1','p3','p4'],
// 				id : '2'
// 			},
// 			p3 : {
// 				type : 'mother',
// 				initNav : '2',
// 				level : '0',
// 				connections : ['p1','p2','p4'],
// 				id : '3'
// 			},
// 			p4 : {
// 				type :' normal',
// 				initNav : '2',
// 				level : '0',
// 				connections : ['p2','p3'],
// 				id : '1'
// 			}
// 		}
// 	},
// 	// dati del turno
// roundData : { 
// 		p1 : {
// 			navs : 'p1Nav',
// 			owner : 'owner',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},
// 		p2 : {
// 			nav : 'p1Nav',
// 			owner : 'owner',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},
// 		p3 : {
// 			nav : 'p3Nav',
// 			owner : 'owner',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},
// 		p4 : {
// 			nav : 'p4Nav',
// 			owner : 'owner',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		}
// 	}
			

// });









// fine document ready
});
