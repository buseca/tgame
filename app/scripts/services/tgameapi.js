'use strict';

/**
 * @ngdoc service
 * @name tGameApp.tGameApi
 * @description
 * # tGameApi
 * Service in the tGameApp.
 */
angular.module('tGameApp')
  .service('tGameApi', function ($firebase) {
    // AngularJS will instantiate a singleton by calling "new" on this function
 //    var ref = new Firebase("https://tgame.firebaseio.com/room1");
 //  	var sync = $firebase(ref);

  	// var ref = new Firebase("https://tgame.firebaseio.com/room1");
  	// var data = $firebase(ref);

  	// return (function () {

	  // 	ref.on("value", function(data) {
			// var allData = data.val();
		
			// // /// oggetto json con dati dei players:
			// var allDataPlayers = allData.gameData.players;
			// // oggetto json con dati generici dei pianeti:
			// obj.allDataPlanetsStage = allData.gameData.planetsOnStage;
			// // oggetto json con dati dei pianeti relativi al Round:
			// obj.allDataPlanetsRound = allData.roundData;

			// // array delle chiavi dell'oggetto allDataPlayers:
			// var arrPlayers = Object.keys(allDataPlayers);
			// // numero delle chiavi e quindi dei players:
			// obj.numberOfPlayers = arrPlayers.length;

			// // array delle chiavi dell'oggetto allDataPlanetsStage:
			// var arrPlanets = Object.keys(allDataPlanetsStage);
			// // numero delle chiavi e quindi dei pianeti:
			// obj.numberOfPlanets = arrPlanets.length;
		 //    console.log('numberOfPlanets:'+ numberOfPlanets);

			// // array delle chiavi dell'oggetto allDataPlanetsRound:
			// obj.arrPlanetsRound = Object.keys(allDataPlanetsRound);

			// // oggetto json con dati del round:
			// obj.allDataRound = allData.roundData;

			// // email dei giocatori:
			// obj.pl1 = allDataPlayers.pl1.email;
			// obj.pl2 = allDataPlayers.pl2.email;
		 //    obj.pl3 = allDataPlayers.pl3.email;
			// // colori dei player:
			// obj.colorPl1 = allDataPlayers.pl1.color;
			// obj.colorPl2 = allDataPlayers.pl2.color;
		 //    obj.colorPl3 = allDataPlayers.pl3.color;
		 //    obj.colorNeutro = 'white';

		 //    obj.thisPlanetKey;

		 //    console.log(obj);
		 //    return obj;

	  //   });
  	// })();
  });
