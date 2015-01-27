$(document).ready(function() {




// tutti i pianeti nelo stage:
var planet = $('.planet');
// pianeti generici:
var p1 = $('.p1');
var p2 = $('.p2');
var p3 = $('.p3');
var p4 = $('.p4');
var p5 = $('.p5');
var p6 = $('.p6');
var p7 = $('.p7');
var p8 = $('.p8');
var p9 = $('.p9');
var p10 = $('.p10');
var p11 = $('.p11');
var p12 = $('.p12');
var p13 = $('.p13');
var p14 = $('.p14');
var p15 = $('.p15');


// INIZIO SCRIPT DI BASE
// faccio il listening dello stato dell'utente
ref.onAuth(function(authData) {
  if (authData) {
    // user authenticated with Firebase

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
        console.log('numberOfPlanets:'+ numberOfPlanets);

    	// array delle chiavi dell'oggetto allDataPlanetsRound:
    	var arrPlanetsRound = Object.keys(allDataPlanetsRound);

    	// oggetto json con dati del round:
    	var allDataRound = allData.roundData;

    	// email dei giocatori:
    	var pl1 = allDataPlayers.pl1.email;
    	var pl2 = allDataPlayers.pl2.email;
        // PL3XXX
    	// var pl3 = allDataPlayers.pl3.email;
    	// colori dei player:
    	var colorPl1 = allDataPlayers.pl1.color;
    	var colorPl2 = allDataPlayers.pl2.color;
        // PL3XXX
    	// var colorPl3 = allDataPlayers.pl3.color;
        var colorNeutro = 'white';

        var thisPlanetKey;
    	// ciclo i pianeti dello stage scrivere il numero di navi, per capire di chi sono e colorarli di conseguenza
    	for (index = 0; index < numberOfPlanets; ++index) {

    		thisPlanetKey = arrPlanetsRound[index];
    	    var pNavs = allDataRound[thisPlanetKey].navs ;
    	    $('#' + thisPlanetKey).text(pNavs);
            console.log('navi del' + thisPlanetKey + ': ' + pNavs);
    	    
    	    if ( allDataRound[thisPlanetKey].owner === pl1 ) {
    	    	$('#' + thisPlanetKey).css('background',colorPl1);
    	    }
    	    if ( allDataRound[thisPlanetKey].owner === pl2 ) {
    	    	$('#' + thisPlanetKey).css('background',colorPl2);
    	    }
            // PL3XXX
    	    // if ( allDataRound[thisPlanetKey].owner === pl3 ) {
    	    // 	$('#' + thisPlanetKey).css('background',colorPl3);
    	    // }
    	}

    	
    	// ciclo l'oggetto dei players per fare il matching con la mail che ha fatto il login e capire chi è il player attuale
    	for (indexPl = 0; indexPl < numberOfPlayers; ++indexPl) {
    	    if ( allDataPlayers[arrPlayers[indexPl]].email === authData.password.email ) {
    			var currPlayer = allDataPlayers[arrPlayers[indexPl]].email;
    			var currMotherPlanet = allDataPlayers[arrPlayers[indexPl]].motherPlanet;
    			var currPlayerName = allDataPlayers[arrPlayers[indexPl]].name;
    			var currPlayerId = allDataPlayers[arrPlayers[indexPl]].id;
    			var currColorPlayer = allDataPlayers[arrPlayers[indexPl]].color;
    	    }
    	}



    	// imposto il controllo del turno prendendo l'ID del player attivo dai dati appena scaricati dal db
    	var activePlayerId = allData.activePlayerId ;
        if ( currPlayerId == activePlayerId ) {
            $('.player').html('è il tuo turno');
        } else {
            $('.player').html('è il turno dell\'avversario');
        }

	    // variabile per contare i click del player
        var currNavPrimo = null;
    	var ownerOrigine, idPianetaOrigine, resultColor ;

    	// al click sul pianeta verifico se è del current player
    	$(".planet").click(function () {
    		if ( currPlayerId == activePlayerId ) {
	    		var idPianetaCliccato = $(this).attr('id');
	    		var currOwner = allDataRound[idPianetaCliccato].owner;
                var arrCurrConnections = allDataPlanetsStage[idPianetaCliccato].connections;
	    		// se è il primo click:
	    		if ( currNavPrimo == null ) {
		    		if ( currOwner == currPlayer ) {
		    			currNavPrimo = allDataRound[idPianetaCliccato].navs -1;
		    			ownerOrigine = allDataRound[idPianetaCliccato].owner;
		    			idPianetaOrigine = idPianetaCliccato;
                        arrOrigineConnections = arrCurrConnections;
		    			$('#' + idPianetaCliccato).text('1');
                        console.log('ho cliccato un mio pianeta, il' + idPianetaOrigine);
		    		} else {
		    		}
		    	// se è il secondo click
    			} else if( idPianetaCliccato != idPianetaOrigine ) {

                    // imposto il controllo delle connessioni tra i 2 pianeti
                    var continuo = false;
                    // imposto il controllo per il mining (-1 se il player successivo ha perso un pianeta)
                    var controlloMining = false;

                    // ciclo le connections del primo pianeta per vedere se il secondo è tra queste
                    console.log('ciclo le connections del primo pianeta per vedere se il secondo è tra queste:');
                    console.log('l id del pianeta di origine è:' + idPianetaOrigine);
                    for (conn = 0; conn < arrCurrConnections.length ; ++conn) {
                        console.log('connessione del pianeta di destinazione:' + arrCurrConnections[conn]);
                        if ( arrOrigineConnections[conn] == idPianetaCliccato ) {
                            continuo = true;
                        }
                    }

                    if ( continuo == true ) {

    					var currNavSecondo = allDataRound[idPianetaCliccato].navs;
    					// se è lo stesso proprietario
        				if ( currOwner == currPlayer ) {
        					//faccio la somma e pubblico i dati 
        					var resultNav = currNavPrimo + currNavSecondo ;
                            console.log('è uno spostamento interno: ' + currNavPrimo + ' più ' + currNavSecondo + ' = ' + resultNav );
                            var refPianetaCliccato = new Firebase('https://tgame.firebaseio.com/roundData/' + idPianetaCliccato +'/');
                            refPianetaCliccato.update( {
                                navs : resultNav ,
                            });
                            console.log('upload dati pianeta destinazione se è lo stesso proprietario');
                            console.log('risultato calcolato:' + resultNav);

        				} else {
        					// se il proprietario è diverso
        					// faccio la differenza e pubblico i dati
        					var resultNavTemp = currNavPrimo - currNavSecondo ;
        					var resultNav = Math.abs(resultNavTemp) ;
                            console.log('è un attacco ad un pianeta avversario: ' + currNavPrimo + ' contro ' + currNavSecondo + ' rimane: ' + resultNav );
                            // se l'attacco è andato a buon fine cambio il proprietario del pianeta
                            if ( currNavPrimo > currNavSecondo ) {
                                resultColor = currColorPlayer ;
                                $(this).css('background',resultColor);
                                // aggiorno i dati del pianeta di destinazione sul db:
                                var refPianetaCliccato = new Firebase('https://tgame.firebaseio.com/roundData/' + idPianetaCliccato +'/');
                                refPianetaCliccato.update( {
                                    navs : resultNav ,
                                    owner : currPlayer ,
                                });
                                controlloMining = true;
                                console.log('upload dati pianeta destinazione se 1st > 2nd');
                                console.log('risultato dello scontro che metto a database: ' + resultNav);

                            } else if ( currNavPrimo == currNavSecondo ) {
                                $(this).css('background','white');
                                resultColor = colorNeutro ;
                                // aggiorno i dati del pianeta di destinazione sul db:
                                var refPianetaCliccato = new Firebase('https://tgame.firebaseio.com/roundData/' + idPianetaCliccato +'/');
                                refPianetaCliccato.update( {
                                    navs : resultNav ,
                                    owner : 'neutro' ,
                                });
                                controlloMining = true;
                                console.log('upload dati pianeta destinazione se 1st è = 2nd');
                                console.log('risultato dello scontro che metto a database: ' + resultNav);
                         
                            } else if ( currNavPrimo < currNavSecondo ) {
                                // aggiorno i dati del pianeta di destinazione sul db:
                                var refPianetaCliccato = new Firebase('https://tgame.firebaseio.com/roundData/' + idPianetaCliccato +'/');
                                refPianetaCliccato.update( {
                                    navs : resultNav ,
                                });
                                console.log('upload dati pianeta destinazione se 1st < 2nd');
                                console.log('risultato dello scontro che metto a database: ' + resultNav);
                            }
        				}
                        
    	    			// aggiorno i dati del pianeta di origine su db:
    	    			var refIdPianetaOrigine = new Firebase('https://tgame.firebaseio.com/roundData/' + idPianetaOrigine +'/');
    		    		refIdPianetaOrigine.update( {
    		    			navs : 1 ,
    		    		});
                        console.log('upload dati pianeta di origine');

                        // pubblico il risultato dello scontro sullo stage
                        $('#' + idPianetaCliccato).text(resultNav);
                        console.log('risultato pubblicato sullo stage' + resultNav);

                        // azzero i click 
                        currNavPrimo = null;
                        console.log('currNavPrimo :' + currNavPrimo);


                        // passo il turno al giocatore successivo
                        if ( currPlayerId == 1 ) {

                            activePlayerId = 2 ;
                            // aggiorno l'active player sul db
                            var refActivePlayerId = new Firebase('https://tgame.firebaseio.com/');
                            refActivePlayerId.update( {
                             activePlayerId : 2,
                            });



                            // conto i pianeti posseduti dal player successivo
                            var numberToMine = 0;
                            var thisPlanetKeyForMining;
                            for ( indexMining = 0; indexMining < numberOfPlanets; ++indexMining) {

                                thisPlanetKeyForMining = arrPlanetsRound[indexMining];
                                var theOwner = allDataRound[thisPlanetKeyForMining].owner ;
                                if ( allDataRound[thisPlanetKeyForMining].owner === pl2 ) {
                                    numberToMine = numberToMine + 1 ;
                                    console.log("numberToMine "+ thisPlanetKeyForMining + " : " + numberToMine);
                                }
                            }

                            // tolgo -1 al numberToMine se il player successivo ha appena perso un pianeta
                            if ( currOwner == pl2 && numberToMine != 0 && controlloMining == true ) {
                                numberToMine = numberToMine-1 ;
                            }

                            // rifaccio il loop dei pianeti del player e aggiorno le nav con il mining
                            var thisPlanetKeyForMining2;
                            var arrPlanetsToMine = []
                            var arrNumberToMine = []
                            for ( indexMining2 = 0; indexMining2 < numberOfPlanets; ++indexMining2) {

                                thisPlanetKeyForMining2 = arrPlanetsRound[indexMining2];
                                var theOwner = allDataRound[thisPlanetKeyForMining2].owner ;
                                var preMiningNavs = allDataRound[thisPlanetKeyForMining2].navs;
                                var minedNavs = preMiningNavs + numberToMine;
                                if ( allDataRound[thisPlanetKeyForMining2].owner === pl2) {
                                    arrPlanetsToMine.push(thisPlanetKeyForMining2); 
                                    arrNumberToMine.push(minedNavs);
                                }
                            }
                            console.log('fine secondo loop');
                            var numberOfPlanetsToMine = arrPlanetsToMine.length;

                            console.log('numberOfPlanetsToMine' + numberOfPlanetsToMine);
                            console.log('array dei pianeti da minare:' + arrPlanetsToMine);
                            console.log('array dei numeri per il mining:' + arrNumberToMine);

                            // uploado il mining
                             for ( indexForMining = 0; indexForMining < numberOfPlanetsToMine; ++indexForMining ) {
                                var refMining = new Firebase('https://tgame.firebaseio.com/roundData/' + arrPlanetsToMine[indexForMining] +'/');
                                refMining.update( {
                                navs : arrNumberToMine[indexForMining],
                                });
                             }




                        } else if ( currPlayerId == 2 ) {
                            
                            activePlayerId = 1 ;
                            // aggiorno l'active player sul db
                            var refActivePlayerId = new Firebase('https://tgame.firebaseio.com/');
                            refActivePlayerId.update( {
                             activePlayerId : 1,
                            });



                            // conto i pianeti posseduti dal player successivo
                            var numberToMine = 0;
                            var thisPlanetKeyForMining;
                            for ( indexMining = 0; indexMining < numberOfPlanets; ++indexMining) {

                                thisPlanetKeyForMining = arrPlanetsRound[indexMining];
                                var theOwner = allDataRound[thisPlanetKeyForMining].owner ;
                                if ( allDataRound[thisPlanetKeyForMining].owner === pl1 ) {
                                    numberToMine = numberToMine + 1 ;
                                    console.log("numberToMine "+ thisPlanetKeyForMining + " : " + numberToMine);
                                }
                            }

                            // tolgo -1 al numberToMine se il player successivo ha appena perso un pianeta
                            if ( currOwner == pl1 && numberToMine != 0 && controlloMining == true ) {
                                numberToMine = numberToMine-1 ;
                            }

                            // rifaccio il loop dei pianeti del player e aggiorno le nav con il mining
                            var thisPlanetKeyForMining2;
                            var arrPlanetsToMine = []
                            var arrNumberToMine = []
                            for ( indexMining2 = 0; indexMining2 < numberOfPlanets; ++indexMining2) {

                                thisPlanetKeyForMining2 = arrPlanetsRound[indexMining2];
                                var theOwner = allDataRound[thisPlanetKeyForMining2].owner ;
                                var preMiningNavs = allDataRound[thisPlanetKeyForMining2].navs;
                                var minedNavs = preMiningNavs + numberToMine;
                                if ( allDataRound[thisPlanetKeyForMining2].owner === pl1) {
                                    arrPlanetsToMine.push(thisPlanetKeyForMining2); 
                                    arrNumberToMine.push(minedNavs);
                                }
                            }
                            console.log('fine secondo loop');
                            var numberOfPlanetsToMine = arrPlanetsToMine.length;

                            console.log('numberOfPlanetsToMine' + numberOfPlanetsToMine);
                            console.log('array dei pianeti da minare:' + arrPlanetsToMine);
                            console.log('array dei numeri per il mining:' + arrNumberToMine);

                            // uploado il mining
                             for ( indexForMining = 0; indexForMining < numberOfPlanetsToMine; ++indexForMining ) {
                                var refMining = new Firebase('https://tgame.firebaseio.com/roundData/' + arrPlanetsToMine[indexForMining] +'/');
                                refMining.update( {
                                navs : arrNumberToMine[indexForMining],
                                });
                             }


                        } 
                        // PL3XXX
                        // else if ( currPlayerId == 3 ) {
                        //     activePlayerId = 1 ;
                        //     // aggiorno l'active player sul db
                        //     var refActivePlayerId = new Firebase('https://tgame.firebaseio.com/');
                        //     refActivePlayerId.update( {
                        //      activePlayerId : 1,
                        //     });



                        //     // conto i pianeti posseduti dal player successivo
                        //     var numberToMine = 0;
                        //     var thisPlanetKeyForMining;
                        //     for ( indexMining = 0; indexMining < numberOfPlanets; ++indexMining) {

                        //         thisPlanetKeyForMining = arrPlanetsRound[indexMining];
                        //         var theOwner = allDataRound[thisPlanetKeyForMining].owner ;
                        //         if ( allDataRound[thisPlanetKeyForMining].owner === pl1 ) {
                        //             numberToMine = numberToMine + 1 ;
                        //             console.log("numberToMine "+ thisPlanetKeyForMining + " : " + numberToMine);
                        //         }
                        //     }

                        //     // tolgo -1 al numberToMine se il player successivo ha appena perso un pianeta
                        //     if ( currOwner == pl1 && numberToMine != 0 && controlloMining == true ) {
                        //         numberToMine = numberToMine-1 ;
                        //     }

                        //     // rifaccio il loop dei pianeti del player e aggiorno le nav con il mining
                        //     var thisPlanetKeyForMining2;
                        //     var arrPlanetsToMine = []
                        //     var arrNumberToMine = []
                        //     for ( indexMining2 = 0; indexMining2 < numberOfPlanets; ++indexMining2) {

                        //         thisPlanetKeyForMining2 = arrPlanetsRound[indexMining2];
                        //         var theOwner = allDataRound[thisPlanetKeyForMining2].owner ;
                        //         var preMiningNavs = allDataRound[thisPlanetKeyForMining2].navs;
                        //         var minedNavs = preMiningNavs + numberToMine;
                        //         if ( allDataRound[thisPlanetKeyForMining2].owner === pl1) {
                        //             arrPlanetsToMine.push(thisPlanetKeyForMining2); 
                        //             arrNumberToMine.push(minedNavs);
                        //         }
                        //     }
                        //     console.log('fine secondo loop');
                        //     var numberOfPlanetsToMine = arrPlanetsToMine.length;

                        //     console.log('numberOfPlanetsToMine' + numberOfPlanetsToMine);
                        //     console.log('array dei pianeti da minare:' + arrPlanetsToMine);
                        //     console.log('array dei numeri per il mining:' + arrNumberToMine);

                        //      for ( indexForMining = 0; indexForMining < numberOfPlanetsToMine; ++indexForMining ) {
                        //         var refMining = new Firebase('https://tgame.firebaseio.com/roundData/' + arrPlanetsToMine[indexForMining] +'/');
                        //         refMining.update( {
                        //         navs : arrNumberToMine[indexForMining],
                        //         });
                        //      }



                        // }

                        // faccio il reload per riazzerare le variabili e aggiornare lo stage
                        // location.reload();
                       
                    } else {
                        alert('pianeta non attaccabile');
                    }


    			} else {
                    alert('scegli un pianeta diverso dal pianeta di origine')
                }

    		} //else {
    		// alert('non tocca te');
    		//}

    	});




    });



  } else {
    alert('devi fare login');
  }
});

















// var tGame = new Firebase('https://tgame.firebaseio.com/');


// // SET DEL JSON DEL DATABSE:

// tGame.set( { 
// 	// dati della partita
// 	gameData : {
// 		numberOfPlayers : 2 ,
// 		players : {
// 			pl1 : {
// 				email : 'ruggero.motta@gmail.com',
// 				name : 'rugge',
// 				motherPlanet : 'p11',
// 				id : 1,
// 				color : 'lightgreen',
// 			},
// 			pl2 : {
// 				email : 'daniele.bertella@gmail.com',
// 				name : 'den',
// 				motherPlanet : 'p13',
// 				id : 2,
// 				color : 'lightblue',
// 			},
// 			// pl3 : {
// 			// 	email : 'gigi@gigi.com',
// 			// 	name : 'gigi',
// 			// 	motherPlanet : 'p15',
// 			// 	id : 3,
// 			// 	color : 'orange',
// 			// }
// 		},
// 		numberOfPlanets : 15 ,
// 		planetsOnStage : {
// 			p1 : {
// 				type : 'mother',
// 				initNav : '10',
// 				level : '0',
// 				connections : ['p2','p3'],
// 				id : 1
// 			},


// 			p2 : {
// 				type : 'mother',
// 				initNav : '2',
// 				level : '0',
// 				connections : ['p1','p3','p4','p5'],
// 				id : 2
// 			},
// 			p3 : {
// 				type : 'mother',
// 				initNav : '3',
// 				level : '0',
// 				connections : ['p1','p2','p5','p6'],
// 				id : 3
// 			},


// 			p4 : {
// 				type :' normal',
// 				initNav : '4',
// 				level : '0',
// 				connections : ['p2','p5','p7','p8'],
// 				id : 4
// 			},
//             p5 : {
//                 type :' normal',
//                 initNav : '5',
//                 level : '0',
//                 connections : ['p2','p3','p4','p8','p9','p6'],
//                 id : 5
//             },
//             p6 : {
//                 type :' normal',
//                 initNav : '6',
//                 level : '0',
//                 connections : ['p3','p5','p9','p10'],
//                 id : 6
//             },


//             p7 : {
//                 type :' normal',
//                 initNav : '7',
//                 level : '0',
//                 connections : ['p4','p8','p12','p11'],
//                 id : 7
//             },
//             p8 : {
//                 type :' normal',
//                 initNav : '8',
//                 level : '0',
//                 connections : ['p4','p5','p9','p13','p12','p7'],
//                 id : 8
//             },
//             p9 : {
//                 type :' normal',
//                 initNav : '9',
//                 level : '0',
//                 connections : ['p5','p6','p10','p14','p13','p8'],
//                 id : 9
//             },
//             p10 : {
//                 type :' normal',
//                 initNav : '10',
//                 level : '0',
//                 connections : ['p6','p9','p14','p15'],
//                 id : 10
//             },


//             p11 : {
//                 type :' normal',
//                 initNav : '11',
//                 level : '0',
//                 connections : ['p7','p12',],
//                 id : 40
//             },
//             p12 : {
//                 type :' normal',
//                 initNav : '12',
//                 level : '0',
//                 connections : ['p11','p7','p8','p13'],
//                 id : 12
//             },
//             p13 : {
//                 type :' normal',
//                 initNav : '13',
//                 level : '0',
//                 connections : ['p12','p8','p9','p14'],
//                 id : 40
//             },
//             p14 : {
//                 type :' normal',
//                 initNav : '14',
//                 level : '0',
//                 connections : ['p13','p9','p10','p15'],
//                 id : 14
//             },
//             p15 : {
//                 type :' normal',
//                 initNav : '15',
//                 level : '0',
//                 connections : ['p14','p10'],
//                 id : 40
//             },
// 		}
// 	},
// 	// dati del turno
//     roundData : { 
// 		p1 : {
// 			navs : 20,
// 			owner : 'neutro',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},


// 		p2 : {
// 			navs : 15,
// 			owner : 'neutro',
// 			navInArrivo : {
// 				pl1 : 0,
// 				pl2 : 0,
// 				pl3 : 0 
// 			}
// 		},
// 		p3 : {
// 			navs : 15,
// 			owner : 'neutro',
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
// 		},
//         p5 : {
//             navs : 7,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p6 : {
//             navs : 5,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },


//         p7 : {
//             navs : 3,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p8 : {
//             navs : 4,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p9 : {
//             navs : 4,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p10 : {
//             navs : 3,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },


//         p11 : {
//             navs : 8,
//             owner : 'ruggero.motta@gmail.com',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p12 : {
//             navs : 3,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p13 : {
//             navs : 4,
//             owner : 'gigi@gigi.com',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p14 : {
//             navs : 3,
//             owner : 'neutro',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
//         p15 : {
//             navs : 8,
//             owner : 'daniele.bertella@gmail.com',
//             navInArrivo : {
//                 pl1 : 0,
//                 pl2 : 0,
//                 pl3 : 0 
//             }
//         },
// 	},
//     activePlayerId : 1,
// });









// fine document ready
});
