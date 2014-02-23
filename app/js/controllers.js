'use strict';

/* Controllers */

angular.module('app.controllers', []).
  controller('appController', [ '$scope', function($scope) {
    $scope.emails = window.data;

    // tags is needed in the sidebar anf the main content, so setting up here
    $scope.createTags = function() {
        $scope.tags = []; //the tag object we care about and used in UI
        var tagCount = {}; //helper hash!

        // loop over all the emails
        angular.forEach($scope.emails, function(value, key) {

            //loop over each tag in an email
            angular.forEach( value.tags, function(value, key){
                if(!tagCount[value]) {
                    tagCount[value] = 0;
                    // - create the tag object
                    $scope.tags.push({
                        name: value,
                        selected : false
                    });
                }
                tagCount[value] += 1; // up the tags value
            });
        });

        // set the final count on all of the tags
        angular.forEach( $scope.tags , function(tag, i) {
            tag.count = tagCount[tag.name];
        });
    };
    $scope.createTags(); //invoke immediately


  }])
  .controller('sidebarController', [ '$scope', function($scope) {
    $scope.openPosition = 0;
    $scope.incrementPosition = function() {
      $scope.openPosition += 1;
    }

  }])
  .controller('filterController', [ '$scope', function($scope) {
        $scope.toggleTag = function(tag){
            tag.selected = !tag.selected;
        }

  }])
  .controller('emailShortController', [ '$scope', function($scope) {

   /* ------
    NOTE: "email" is being set in an "ng-repeat" in the dom
    TODO I think there's an easy way to write in the controller
    that we're expecting people to do that. like "require:" or something
    */

    $scope.openEmail = function() {
      if( $scope.email.open ) {
        return false;
      }
      $scope.email.open = true;
      $scope.email.position = $scope.openPosition;
      $scope.incrementPosition();
    }

    $scope.closeEmail = function() {
        $scope.email.open = false;
    }

    // this ends up being helpful to have
    $scope.toggleEmail = function(){
        if($scope.email.open) {
            $scope.closeEmail()
        } else {
            $scope.openEmail()
        }
    }

  }])
  .controller('contentController', [ '$scope', function($scope) {
  }])
  .controller('emailFullController', [ '$scope', function($scope) {
     // find way to not repeat this. I don't think angular is as into
     // inheritance, but need to look up
     $scope.closeEmail = function() {
       $scope.email.open = false;
     }

  }]);
