angular.module('mean.directives', [])
  // Ralph: Modify player directive 
  .directive('player', function (){
    return{
      restrict: 'E',
      templateUrl: '/views/player.tpl.html',
      scope: {
        players: '=players'
      },
      bindToController: true,
      controller: function() {
        var vm = this;
      },
      controllerAs: 'vm'
    };
  })
  .directive('question', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/question.html',
      link: function(scope, elem, attr) {}
    };
  })
  .directive('timer', function(){
    return{
      restrict: 'EA',
      templateUrl: '/views/timer.html',
      link: function(scope, elem, attr){}
    };
  }).directive('landing', function() {
    return {
      restrict: 'EA',
      link: function(scope, elem, attr) {
        scope.showOptions = true;

        if (scope.$$childHead.global.authenticated === true) {
          scope.showOptions = false;
        }
      }
    };
  });
