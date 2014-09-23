'use strict';

/**
 * @ngdoc function
 * @name proxytestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proxytestApp
 */
angular.module('proxytestApp')
  .controller('AboutCtrl', function ($scope, $http) {
    console.log("we are here")
    $http.get('/api/call?action=helloWorld&query={"name": "VolunteerMatch"}').success(function (data) {
        $scope.helloWorld = data;
    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
