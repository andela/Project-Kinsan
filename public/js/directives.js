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
      controller: function($scope) {
        var vm = this;
        vm.currentCzar = $scope.$parent.currentCzar;
        vm.isPlayer = $scope.$parent.isPlayer;
      },
      // eslint-disable-next-line
      controllerAs: 'vm'
    };
  })
  .directive('question', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/question.tpl.html',
      // eslint-disable-next-line
      controllerAs: 'vm',
      scope: true,
      controller: function(){
      }
    };
  })
  .directive('timer', function(){
    return{
      restrict: 'EA',
      templateUrl: '/views/timer.tpl.html'
    };
  }).directive('answer', function(){
    return {
      restrict: 'E',
      templateUrl: '/views/answers.tpl.html',
      // eslint-disable-next-line
      controllerAs: 'vm',
      controller: function(){
      }
    };
  }).directive('myModal', function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        scope.dismiss = function() {
          element.modal('hide');
        };
        scope.$on('modalDismiss',function() {
          element.modal('hide');
        });
  }).directive('chat', function(){
    return {
      restrict: 'E',
      templateUrl: '/views/chat.tpl.html',
      // eslint-disable-next-line
      controllerAs: 'vm',
      controller: function(){
      }
    };
  }).directive('infoModal', function(){
    return {
      restrict: 'E',
      templateUrl: '/views/info-modal.tpl.html',
      // eslint-disable-next-line
      controllerAs: 'vm',
      controller: function(){
      }
    };
  });
