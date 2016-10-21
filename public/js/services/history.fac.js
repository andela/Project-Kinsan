(function(){

  'use strict';

  angular.module('services.History')
    .factory('HistoryFac', function($http){
      return {
        getHistory: function(userId) {
          return $http.get('/api/users/'+userId+'/history')
                      .then(function(res) {
                        return res.data;
                      });
        }
      };
    });
})();