angular.module('app.directives', []).
  directive('autoFocus', function($timeout) {
      // focuses on element        
      return function(scope, element) {
              $timeout(function(){
                  element[0].focus();
              }, 1);
          }
    });
