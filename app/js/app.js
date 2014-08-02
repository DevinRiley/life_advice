'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
  'ui.router',
  'ngAnimate',
  'app.services',
  'app.filters',
  'app.controllers',
  'app.directives'
]);
app.config(function($stateProvider, $urlRouterProvider) {
  //$locationProvider.html5Mode(true).hashPrefix('!');
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("");
  //
  // Now set up the states
  $stateProvider
    .state('enterName', {
      url: "",
      templateUrl: "partials/enter_name.html",
      controller: "slidesController"
    })
    .state('letter', {
      url: "/letter/",
      templateUrl: "partials/letter.html",
      controller: "slidesController"
    })
    .state('read', {
      url: '/read/',
      templateUrl: "partials/main.html",
      controller: function($scope) { 
        $scope.slides.done = true 
      }
    })
});
