(function() {
  'use strict';

  angular.module('services.Auth')
    .factory('authFactory', ['$http', function($http) {
      return {
        signIn: function(user) {
          return $http.post('/api/auth/login', user);
        },

        signUp: function(user) {
          return $http.post('/api/auth/signup', user);
        },

        socialSignIn: function(user) {
          return $http.post('/api/auth/social', user);
        }
      };
    }]);
})();