'use strict';

/* Controllers */

angular.module('app.controllers', []).
  controller('appController', [ '$scope', function($scope) {
    $scope.emails = window.data;
    console.log($scope.emails);
  }])
  .controller('sidebarController', [ '$scope', function($scope) {
    $scope.openPosition = 0;

  }])
  .controller('filterController', [ '$scope', function($scope) {
    $scope.tags = {};

    $scope.setTags = function() {
        angular.forEach($scope.emails, function(value, key) {
        angular.forEach( value.tags, function(value, key){
          if(!$scope.tags[value]) {
            $scope.tags[value] = 0; 
          }
          $scope.tags[value] += 1;
        })
      });
    };

    $scope.setTags();

  }])
  .controller('emailShortController', [ '$scope', function($scope) {
    $scope.openEmail = function() {
      $scope.email.open = true;
      $scope.email.openPosition = $scope.openPosition;
      $scope.openPosition += 1;
      console.log($scope.openPosition);
    }


  }])
  .controller('contentController', [ '$scope', function($scope) {
  }])
  .controller('emailFullController', [ '$scope', function($scope) {
     $scope.closeEmail = function() {
       $scope.email.open = false;
     }

  }]);
