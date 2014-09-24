'use strict';

angular.module('proxytestApp')
  .controller('OpportunityCtrl', function ($scope, $http, opportunities) {
    $scope.opportunities = opportunities;
  });