'use strict';

/**
 * @ngdoc function
 * @name tGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tGameApp
 */
angular.module('tGameApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
