'use strict';

/* Controllers */

angular.module('app.controllers', []).
  controller('appController', [ '$scope', function($scope) {
    $scope.emails = window.data;
    $scope.slides = {};
    $scope.slides.done = false;

    // Ugh, should replace this with an array of opened emails
    // and we just update it when we open/close stuff
    $scope.unopenedEmails = function() {
      var unopened = [];
      $scope.emails.forEach(function(email){
        if(email.open === false) {
          unopened.push(email)
        }
      });
      return unopened;
    }

    // for getting a random email
    // TODO: Update so you only pick from unopened emails
    $scope.randomEmail = function() {
        var unopened = $scope.unopenedEmails();
        var max = unopened.length - 1;
        var min = 0;
        // scales and converts float
        var index = Math.floor(Math.random() * (max - min + 1)) + min;
        return unopened[index]
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
            return $scope.intersect(email.tags, $scope.selectedTagNames).length > 0 
        }
    }

    $scope.inSelectedTagNames = function(tagname){
        return ( $scope.selectedTagNames.indexOf(tagname) > -1)
    }


    $scope.toggleRandomFromTag = function(tag) {
      $scope.toggleTag(tag);
      $scope.randomEmail().open = true;
      if ($scope.inSelectedTagNames(tag.name)) {
      }

    }
}])
  .controller('slidesController', [ '$scope', function($scope) {
    $scope.currentSlide = 1; // initialize current slide to first

    $scope.incrementSlide = function() {
      $scope.currentSlide++;
      if ($scope.currentSlide == 4) {
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

