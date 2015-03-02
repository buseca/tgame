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
    $scope.players = [];

    list.$loaded().then(function() {
      
      _.forEach(list.gameData.players, function(player, key) {
        $scope.players.push(player);
        // console.log(_.find(list.gameData.players, { list.gameData.players.email: planet.email }));
      });


      _.forEach(list.roundData, function(planet, key) {
        // console.log(_.find($scope.players, { $scope.players.email: planet.email }));
        // console.log(_.find($scope.players, { $scope.players.email: planet.email }));

        var playerOwner = _.find($scope.players, function (player) {
          return player.email === planet.owner;
        });
        if (playerOwner) {
          planet.color = playerOwner.color;
        } else {
          planet.color = "white"
        }
        $scope[key] = planet;
        // $scope[key].push(playerOwner);
      });
      var movingShips = null,
          movingShipsOwner = null;
      $scope.moveShipFromPlanet = function (planet) {
        if (movingShips == null) {
          movingShips = planet.navs;
          movingShipsOwner = planet.owner;
          console.log(movingShips);
            
        } else {
          if (planet.owner != movingShipsOwner) {
            if ((movingShips - planet.navs) > 0) {
              planet.owner = movingShipsOwner;
            } else if ((movingShips - planet.navs) == 0) {
              planet.owner = "neutro";
            }
            planet.navs = Math.abs(movingShips - planet.navs);
          } else {
            planet.navs = movingShips + planet.navs;
          }
          movingShips = null;
          movingShipsOwner = null;
        }
        
      }



    });
	  
  });
