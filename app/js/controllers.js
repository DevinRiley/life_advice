'use strict';

/* Controllers */

angular.module('app.controllers', []).
  controller('appController', [ '$scope', function($scope) {
    $scope.emails = window.data;
    console.log($scope.emails);
  }])
  .controller('sidebarController', [ '$scope', function($scope) {
    $scope.openPosition = 0;
    $scope.incrementPosition = function() {
      $scope.openPosition += 1;
    }

  }])
  .controller('filterController', [ '$scope', function($scope) {

    $scope.setTags = function() {
        $scope.tags = {};
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
      if( $scope.email.open ) {
        return false;
      }
      $scope.email.open = true;
      $scope.email.position = $scope.openPosition;
      $scope.incrementPosition();
      console.log($scope.email.position);
    }


  }])
  .controller('contentController', [ '$scope', function($scope) {
  }])
  .controller('emailFullController', [ '$scope', function($scope) {
     $scope.closeEmail = function() {
       $scope.email.open = false;
     }

  }]);
