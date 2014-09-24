'use strict';

angular.module('proxytestApp')
  .controller('ReferralCtrl', function ($scope, $http, $routeParams, referrals) {
    $scope.referrals = referrals;
  });