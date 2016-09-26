describe('TestController', function() {
  var $rootScope,
    $scope,
    controller;

  beforeEach(function() {
    module('test');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $scope.controller = $injector.get('$controller')('TestController',
        {$scope: $scope});
      });
  });

  describe('Initial time', function() {
    it('has the value of 200', function() {
      expect($scope.time).toEqual(200);
    });
  });

  describe('Count Down function works', function() {
    it('reduces the time by ten', function() {
      $scope.countDown();
      expect($scope.time).toEqual(190);
    });
  });
});
