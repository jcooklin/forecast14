'use strict';

/**
 * @ngdoc function
 * @name proxytestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proxytestApp
 */
angular.module('proxytestApp')
  .controller('OrganizationCtrl', function ($scope, $http, $routeParams) {
    console.log($routeParams)
    console.log("we are in the OrganizationCtrl")
    $http.get('/api/call?action=searchMembers&query={"fieldsToDisplay":["email","firstName","lastName", "location"]}').success(function (data) {
      $scope.members = data;
    });
    $http.get('/api/call?action=searchOrganizations&query={"location": "san francisco", "fieldsToDisplay":["id","name", "location", "url"]}').success(function (data) {
      $scope.organizations = data;
    });
    $http.get('/api/call?action=getOrganizationReferrals&query={"organization": '+$routeParams["id"]+' }').success(function (data) {
      $scope.referrals = data;
      console.log(data)
    });

  });