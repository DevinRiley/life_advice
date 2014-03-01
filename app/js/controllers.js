'use strict';

/* Controllers */

angular.module('app.controllers', []).
  controller('appController', [ '$scope', function($scope) {
    $scope.emails = window.data;

    // for calculating an intersection of arrays, makes easier to compage tags
    $scope.intersect = function (a, b) {
        var ai=0, bi=0;
        var result = new Array();
        while( ai < a.length && bi < b.length )
        {
            if      (a[ai] < b[bi] ){ ai++; }
            else if (a[ai] > b[bi] ){ bi++; }
            else /* they're equal */
            {
                result.push(a[ai]);
                ai++;
                bi++;
            }
        }
        return result;
    }

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

    // selectedTagNames an array of tag names, makes easier to work with email[0].tags
    // which are also an array of strings. $scope.tags is an array of objects
    $scope.selectedTagNames = [];
    $scope.toggleTag = function(tag){

        // this is kinda ugh, but wanna let people pass in a string or an object, so
        // easy to call from anywhere
        if ( typeof tag === 'string') {
            angular.forEach( $scope.tags , function(tagFromList, i) {
                if( tagFromList.name == tag ) {
                    tag = tagFromList;
                }
            });
        }

        var tagIndex = $scope.selectedTagNames.indexOf(tag.name)
        if( tagIndex == -1 ){
            $scope.selectedTagNames.push(tag.name)
        } else {
            $scope.selectedTagNames.splice(tagIndex, 1)
        }
        tag.selected = !tag.selected;
    }

    //used in sidebar and content
    $scope.tagFilter = function(email){
        if($scope.selectedTagNames.length == 0){
            return true
        } else {
            console.log($scope.intersect($scope.selectedTagNames,email.tags))
            return ( $scope.intersect($scope.selectedTagNames,email.tags).length > 0)
        }
    }

    $scope.inSelectedTagNames = function(tagname){
        return ( $scope.selectedTagNames.indexOf(tagname) > -1)
    }
}])
  .controller('sidebarController', [ '$scope', function($scope) {
    $scope.openPosition = 0;
    $scope.incrementPosition = function() {
      $scope.openPosition += 1;
    }

  }])
  .controller('filterController', [ '$scope', function($scope) {

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
  
     $scope.showPullQuote = function() {
       console.log("pullQuote");
       return $scope.email.pullQuote && $scope.email.length > 300;
     }

     $scope.closeEmail = function() {
       $scope.email.open = false;
     }

     $scope.emailMessage = function(email){
            return email.message
     }

  }]);
