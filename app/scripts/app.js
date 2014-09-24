'use strict';

/**
 * @ngdoc overview
 * @name proxytestApp
 * @description
 * # proxytestApp
 *
 * Main module of the application.
 */
angular
  .module('proxytestApp', [
    //'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/opportunities', {
        templateUrl: 'views/opportunities.html',
        controller: 'OpportunityCtrl'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations.html',
        controller: 'OrganizationCtrl'
      })
      .when("/referrals/:id", {
        templateUrl: 'views/referrals.html',
        controller: 'OrganizationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
