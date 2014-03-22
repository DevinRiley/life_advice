'use strict';

/* Services */ 

angular.module('app.services', [])
  .service('Emails', function() {
      this.emails = window.data;

      this.closeAll = function() {
        this.emails.forEach(function(email){
          email.open = false;
        })
      }

      this.unopened = function() {
        var unopened = [];
        this.emails.forEach(function(email){
          if(email.open === false) {
            unopened.push(email)
          }
        });
        return unopened;
      }

      // for getting a random email that isn't already open
      this.random = function() {
          var unopened = this.unopened();
          var max = unopened.length - 1;
          var min = 0;
          // scales and converts rand float
          var index = Math.floor(Math.random() * (max - min + 1)) + min;
          return unopened[index]
      }
  });
