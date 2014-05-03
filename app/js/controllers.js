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

    $scope.tags = ['Science',
        'Religion', 'Altruism','Nihilism', 'Family',
        'Drugs', 'There is No Answer', 'Recommended','Work', 'Other', 'All'
    ];

    $scope.selectedTag = 'Recommended';
    $scope.selectTag  = function(tag){
        $scope.selectedTag = tag;
    }

    $scope.isSelected  = function(tag){
        return( $scope.selectedTag.toLowerCase() == tag.toLowerCase());
    }

    $scope.emailsByTag = function(){
        if ($scope.selectedTag === 'All') { return $scope.emails }
        var taggedEmails = [];
        $scope.emails.forEach(function(email){
            if (email.tags.indexOf($scope.selectedTag) > -1) {
                taggedEmails.push(email)
            }
        });
        return taggedEmails
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
