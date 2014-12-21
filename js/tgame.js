$(document).ready(function() {


// tutti i pianeti nelo stage:
var planet = $('.planet');
// pianeti generici:
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
    	// oggetto json con dati dei players:
    	var allDataPlayers = allData.gameData.players;
    	// oggetto json con dati generici dei pianeti:
    	var allDataPlanetsStage = allData.gameData.planetsOnStage;
    	// oggetto json con dati dei pianeti relativi al Round:
    	var allDataPlanetsRound = allData.roundData;

    	// array delle chiavi dell'oggetto allDataPlayers:
    	var arrPlayers = Object.keys(allDataPlayers);
    	// numero delle chiavi e quindi dei players:
    	var numberOfPlayers = arrPlayers.length;

    	// array delle chiavi dell'oggetto allDataPlanetsStage:
    	var arrPlanets = Object.keys(allDataPlanetsStage);
    	// numero delle chiavi e quindi dei pianeti:
    	var numberOfPlanets = arrPlanets.length;

    	// array delle chiavi dell'oggetto allDataPlanetsRound:
    	var arrPlanetsRound = Object.keys(allDataPlanetsRound);

    	// oggetto json con dati del round:
    	var allDataRound = allData.roundData;

    	// email dei giocatori:
    	var pl1 = allDataPlayers.pl1.email;
    	var pl2 = allDataPlayers.pl2.email;
    	var pl3 = allDataPlayers.pl3.email;
    	// colori dei player:
    	var colorPl1 = allDataPlayers.pl1.color;
    	var colorPl2 = allDataPlayers.pl2.color;
    	var colorPl3 = allDataPlayers.pl3.color;


    	// ciclo i pianeti dello stage scrivere il numero di navi, per capire di chi sono e colorarli di conseguenza
    	for (index = 0; index < numberOfPlanets; ++index) {

    		thisPlanetKey = arrPlanetsRound[index];
    	    var pNavs = allDataRound[thisPlanetKey].navs ;
    	    $('#' + thisPlanetKey).text(pNavs);
    	    
    	    if ( allDataRound[thisPlanetKey].owner === pl1 ) {
    	    	$('#' + thisPlanetKey).css('background',colorPl1);
    	    }
    	    if ( allDataRound[thisPlanetKey].owner === pl2 ) {
    	    	$('#' + thisPlanetKey).css('background',colorPl2);
    	    }
    	    if ( allDataRound[thisPlanetKey].owner === pl3 ) {
    	    	$('#' + thisPlanetKey).css('background',colorPl3);
    	    }
    	}

    	
    	// ciclo l'oggetto dei players per fare il matching con la mail che ha fatto il login e capire chi è il player attuale
    	for (index = 0; index < numberOfPlayers; ++index) {
    	    if ( allDataPlayers[arrPlayers[index]].email === authData.password.email ) {
    			var currPlayer = allDataPlayers[arrPlayers[index]].email;
    			var currMotherPlanet = allDataPlayers[arrPlayers[index]].motherPlanet;
    			var currPlayerName = allDataPlayers[arrPlayers[index]].name;
    			var currPlayerId = allDataPlayers[arrPlayers[index]].id;
    			var currColorPlayer = allDataPlayers[arrPlayers[index]].color;
    	    }
    	}


    	// imposto il controllo del turno
    	var activePlayerId = 1 ;
	    console.log(activePlayerId);

	    // variabile per contare i click del player
    	var currNavPrimo ;

    	// al click sul pianeta verifico se è del current player
    	$(".planet").click(function () {
    		if ( currPlayerId == activePlayerId ) {
	    		var idPianetaCliccato = $(this).attr('id');
	    		var currOwner = allDataRound[idPianetaCliccato].owner;
	    		// se è il primo click:
	    		if ( !currNavPrimo ) {
		    		if ( currOwner == currPlayer ) {
		    			$(this).text('clicked!');
		    			currNavPrimo = allDataRound[idPianetaCliccato].navs -1;
		    			var ownerOrigine = allDataRound[idPianetaCliccato].owner;
		    			var pianetaOrigine = idPianetaCliccato;
		    			$('#' + idPianetaCliccato).text('1');
		    		} else {
		    		}
		    	// se è il secondo click
    			} else {
					var currNavSecondo = allDataRound[idPianetaCliccato].navs;
					// se è lo stesso proprietario
    				if ( currOwner == currPlayer ) {
    					//faccio la somma e pubblico i dati
    					var resultNav = currNavPrimo + currNavSecondo ;
    					$('#' + idPianetaCliccato).text(resultNav);

    				} else {
    					// se il proprietario è diverso
    					// faccio la differenza e pubblico i dati
    					var resultNavTemp = currNavPrimo - currNavSecondo;
    					var resultNav = Math.abs(resultNavTemp);
    					$('#' + idPianetaCliccato).text(resultNav);
                        console.log('result: ' + resultNav);
    				}

		    		// passo il turno al giocatore successivo
		    		if ( currPlayerId == 1 ) {
		    			activePlayerId = 2 ;
		    		} else if ( currPlayerId == 2 ) {
		    			activePlayerId = 3 ;
		    		} else if ( currPlayerId == 3 ) {
		    			activePlayerId = 1 ;
		    		}

                    //
                    // DEVO SALVARE A DATABASE IL GIOCATORE ATTIVO
                    //



	    			// // aggiorno i dati del pianeta di origine su sb:
	    			// var refPianetaOrigine = new Firebase('https://tgame.firebaseio.com/roundData/' + pianetaOrigine +'/');
		    		// refPianetaOrigine.update( {
		    		// 	navs : 1 ,
		    		// });
		    		// // aggiorno i dati del pianeta di destinazione sul db:
		    		// var refPianetaCliccato = new Firebase('https://tgame.firebaseio.com/roundData/' + idPianetaCliccato +'/');
		    		// refPianetaCliccato.update( {
		    		// 	navs : resultNav ,
		    		// });



    			}
    		} else {
    			alert('tocca un altro');
    		}

    	});


    });









  } else {
    alert('utente non autenticato');
  }
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


// // SET DEL JSON DEL DATABSE:

// tGame.set( { 
// 	// dati della partita
// 	gameData : {
// 		numberOfPlayers : 3 ,
// 		players : {
// 			pl1 : {
// 				email : 'ruggero.motta@gmail.com',
// 				name : 'rugge',
// 				motherPlanet : 'p1',
// 				id : 1,
// 				color : 'lightgreen',
// 			},
// 			pl2 : {
// 				email : 'daniele.bertella@gmail.com',
// 				name : 'den',
// 				motherPlanet : 'p2',
// 				id : 2,
// 				color : 'lightblue',
// 			},
// 			pl3 : {
// 				email : 'gigi@gigi.com',
// 				name : 'gigi',
// 				motherPlanet : 'p3',
// 				id : 3,
// 				color : 'orange',
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
// 				initNav : '1',
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
// 			navs : 2,
// 			owner : 'ruggero.motta@gmail.com',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},
// 		p2 : {
// 			navs : 2,
// 			owner : 'daniele.bertella@gmail.com',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},
// 		p3 : {
// 			navs : 2,
// 			owner : 'gigi@gigi.com',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},
// 		p4 : {
// 			navs : 5,
// 			owner : 'neutro',
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
