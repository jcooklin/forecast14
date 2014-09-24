'use strict';

angular.module('proxytestApp')
  .controller('OrganizationCtrl', function ($scope, $http, $routeParams, organizations) {
    $scope.organizations = organizations;
  });