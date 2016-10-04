(function() {
  'use strict';

  angular.module('services.History')
         .controller('HistoryController', [ 'HistoryFac', 'Global', function(HistoryFac, Global) {
           const vm = this;
           vm.authenticated = Global.authenticated;
           vm.userId = Global.user._id;

           HistoryFac.getHistory(vm.userId).then(function(res) {
             vm.history = res;
           });
         }]);


})();