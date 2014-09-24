'use strict';

/**
 * @ngdoc function
 * @name proxytestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proxytestApp
 */
angular.module('proxytestApp')
  .controller('OpportunityCtrl', function ($scope, $http) {
    console.log("we are here")
    $http.get('/api/call?action=searchOpportunities&query={"location":"san francisco, ca","opportunityTypes": ["public"],"fieldsToDisplay":["id","title","location"]}').success(function (data) {
      console.log("and here too");
      $scope.opportunities = data;
    });
    $http.get('/api/call?action=helloWorld&query={"name": "VolunteerMatch"}').success(function (data) {
        $scope.helloWorld = data;
    });

  });