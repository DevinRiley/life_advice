'use strict';

/* Controllers */

angular.module('app.controllers', []).
  controller('appController', [ '$scope', 'Emails', function($scope, Emails) {
    $scope.emails = Emails.emails;
    $scope.slides = {};
    $scope.slides.done = false;

    // pass-through methods from Emails Service
    $scope.randomEmail = Emails.random;
    $scope.closeAll    = Emails.closeAll;
    $scope.interpolateName = function(name) {
      Emails.interpolateName(name);
    }

    
    // for calculating an intersection of arrays, makes easier to compage tags
    $scope.intersect = function (a, b) {
        var result = new Array();
        
        for(var ai = 0; ai < a.length; ai++) {
          for(var bi = 0; bi < b.length; bi++) {
            if (a[ai] === b[bi]) {
              result.push(a[ai]);
            }
          }
        }
        return result;
    }

    // tags is needed in the sidebar and the main content, so setting up here
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
    $scope.selectedTagName = null;
    $scope.toggleTag = function(tag){
        // this is kinda ugh, but wanna let people pass in a string or an object, so
        // easy to call from anywhere
        if ( typeof tag === 'string') {
            angular.forEach( $scope.tags , function(tagFromList, i) {
                if( tagFromList.name == tag ) {
                    tag = tagFromList;
                }
                if(tagFromList != tag) {
                  // reset any currently selected tags
                  tagFromList.selected = false;
                }
            });
        }

        if ($scope.selectedTagName === tag.name) {
          $scope.selectedTagName = null;
        } else {
          $scope.selectedTagName = tag.name;
        }
        tag.selected = !tag.selected;
    }

    $scope.inSelectedTagNames = function(tagname){
        return ( $scope.selectedTagName == tagname)
    }

    $scope.openAllWithTag = function(tag) {
      $scope.closeAll();
      $scope.toggleTag(tag);
      //open all with tag
      $scope.emails.forEach(function(email){
        if ($scope.intersect(email.tags, [$scope.selectedTagName]).length > 0) {
          email.open = true;
        }
      });
      $scope.emails.forEach(function(email) {
        if (email.open === true) {
          console.log(email); 
        }
      });
    }

    $scope.toggleRandomFromTag = function(tag) {
      $scope.toggleTag(tag);
      $scope.randomEmail().open = true;
      if ($scope.selectedTagName === (tag.name)) {
      }

    }
}])
  .controller('slidesController', [ '$scope', 'Emails', function($scope, Emails) {
    $scope.name = null;
    $scope.currentSlide = 1; // initialize current slide to first

    $scope.incrementSlide = function() {
      $scope.currentSlide++;
      if ($scope.currentSlide === 4) {
        $scope.slides.done = true;
      }
    }

    $scope.showSlide = function(slideNumber) {
      return slideNumber == $scope.currentSlide;
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
       return $scope.email.pullQuote && $scope.email.length > 300;
     }

     $scope.closeEmail = function() {
       $scope.email.open = false;
     }

     $scope.emailMessage = function(email){
            return email.message
     }

  }])

