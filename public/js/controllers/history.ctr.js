(function() {
  'use strict';

  angular.module('services.History')
         .controller('HistoryController', [ 'HistoryFac', 'Global', function(HistoryFac, Global) {
           var vm = this;
           vm.authenticated = Global.authenticated;
           vm.userId = Global.user ? Global.user._id : null;

           if(vm.authenticated) {
             HistoryFac.getHistory(vm.userId).then(function(res) {
               vm.histories = res;
             });
           }
           
         }]);


})();