'use strict';

/**
 * @ngdoc function
 * @name tGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tGameApp
 */
angular.module('tGameApp')
  .controller('MainCtrl', function ($scope, $firebase, tGameApi) {
  	var url = "https://tgame.firebaseio.com/room1";
  	var ref = new Firebase("https://tgame.firebaseio.com/room1");
  	var sync = $firebase(ref);
  	// oggetto json con tutti i dati scricati al loading della pagina:
  	// /// oggetto json con dati dei players:
  	// console.log(allData.)
  	var list = sync.$asObject();

    //console.log(list.gameData.planetOnStage);
    //console.log(list );

    list.$loaded().then(function() {
      


      _.forEach(list.roundData, function(planet, key) {
        $scope[key] = planet;
        console.log($scope[key]);

        //console.log(_.find(list.gameData.players, { list.gameData.players.email: planet.email }));
      });




    });
	  
  });
