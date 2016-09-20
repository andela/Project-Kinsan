angular.module('test', []).controller('TestController',
  ['$scope', function($scope) {
    $scope.countDown = function() {
    if($scope.time) {
      $scope.time -= 10;
    }
  };
  $scope.time = 200;
}]);
