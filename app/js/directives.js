angular.module('app.directives', []).
  directive('autoFocus', function($timeout) {
      // focuses on element        
      return function(scope, element) {
              $timeout(function(){
                  element[0].focus();
              }, 1);
          }
    }).
  directive('enterKey', function() {
    return function(scope, element) {
      element.bind("keyup", function(event) {
        if (event.which == 13 ) {
          debugger
        }
      });
    };
  });
