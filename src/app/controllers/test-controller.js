angular.module("test", []).controller("TestController",
  ["$scope", function($scope) {
      $scope.time = 200;
      $scope.countDown = function() {
          if($scope.time) {
              $scope.time -= 10;
          }
      };
  }]
);
