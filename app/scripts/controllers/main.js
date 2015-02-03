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
	var list = sync.$asArray();
    list.$loaded().then(function() {
      console.log("list has " + list.length + " item(s)");
      $scope.activePlayer = $getRecord(0);
    });
// place the list into $scope for use in the DOM




 //    // we can add it directly to $scope if we want to access this from the DOM
    $scope.data = list;


 // var obj = $firebase(new Firebase(url)).$asObject();

 //     // to take an action after the data loads, use the $loaded() promise
 //     obj.$loaded().then(function() {
 //        console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

 //       // To iterate the key/value pairs of the object, use `angular.forEach()`
 //       angular.forEach(obj, function(value, key) {
         

 // 		  console.log(value);

 //       });
 //     });

 //     // To make the data available in the DOM, assign it to $scope
 //     // $scope.data = allData.activePlayer;

 //     console.log(obj("activePlayer"));
     // For three-way data bindings, bind it to the scope instead
     //obj.$bindTo($scope, "data");

	  
  });
