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
      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl'
      // })
      .when('/opportunities', {
        templateUrl: 'views/opportunities.html',
        controller: 'OpportunityCtrl',
        resolve: {
          "opportunities": function($q, $http, $route) {
            var deferred = $q.defer();
            $http.get('/api/call?action=searchOpportunities&query={"location":"san francisco, ca","opportunityTypes": ["public"],"fieldsToDisplay":["id","title","location"]}').success(function (data) {
              deferred.resolve(data['opportunities'])
            });
            return deferred.promise;
          }
        }
      })
      .when('/organizations', {
        templateUrl: 'views/organizations.html',
        controller: 'OrganizationCtrl',
        resolve: {
          "organizations": function($q, $http) {
            var deferred = $q.defer();
            $http.get('/api/call?action=searchOrganizations&query={"location": "san francisco", "fieldsToDisplay":["id","name", "location", "url"]}').success(function (data) {
              deferred.resolve(data['organizations']);
            });
            return deferred.promise;
          }
        }
      })
      .when("/referrals/:id", {
        templateUrl: 'views/referrals.html',
        controller: 'ReferralCtrl',
        resolve: {
          "referrals": function($q, $http, $route) {
            var deferred = $q.defer();
            console.log("in the resolve " + $route.current.params.id)
            $http.get('/api/call?action=getOrganizationReferrals&query={"organization": '+$route.current.params.id+' }').success(function (data) {
              deferred.resolve(data['referrals']);
            });
            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
