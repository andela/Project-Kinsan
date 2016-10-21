describe('History functionality test', function() {
  var HistoryFac;
  var $httpBackend;
  var $q;

  var userId = '57ea45dd18be84c20f000001';
  var api = '/api/users/'+userId+'/history';
  jasmine.getJSONFixtures().fixturesPath='base/test/app';
  var response = getJSONFixture('response.json');

  // before each test load the angular module for history controller
  // and history factory
  beforeEach(
    angular.mock.module('services.History')
  );

  // load angular module for Global service
  beforeEach(
    angular.mock.module('mean.system')
  );

  describe('History factory', function() {

    // Load HistoryFac, $httpBackend(mocks $http service) and $q service
    beforeEach(inject(function(_HistoryFac_, _$httpBackend_, _$q_){
      HistoryFac = _HistoryFac_;
      $httpBackend = _$httpBackend_;
      $q = _$q_;
    }));

    // A simple test to verify the History service exists
    it('should exist', function() {
      expect(HistoryFac).toBeDefined();
    });

    it('should expect getHistory() to be defined', function() {
      expect(typeof HistoryFac.getHistory).toBe('function');
    });

    it('should expect getHistory() to make a get request to /api/users/:id/history', function() {
      spyOn(HistoryFac, 'getHistory').and.callThrough();

      // create a mock http get request and supply it with a sample response
      $httpBackend.whenGET(api).respond(200, $q.when(response));
      var result = {};

      expect(result).toEqual({});

      HistoryFac.getHistory(userId).then(function(res){
        result = res;
      });

      $httpBackend.flush();

      expect(HistoryFac.getHistory).toHaveBeenCalledWith(userId);
    });
  });

  describe('History Controller', function() {
    var GlobalMock = {
      user: {
        _id: '57ea45dd18be84c20f000001'
      },
      authenticated: true
    };
    var $controller;
    var HistoryCtr;

    beforeEach(inject(function(_$controller_, _HistoryFac_, _$httpBackend_, _$q_){
      $controller = _$controller_;
      HistoryFac = _HistoryFac_;
      HistoryCtr = $controller('HistoryController', {HistoryFac: HistoryFac, Global: GlobalMock});
      $httpBackend = _$httpBackend_;
      $q = _$q_;
    }));

    it('should be defined', function() {
      expect(HistoryCtr).toBeDefined();
    });

    it('call the getHistory() function of HistoryFac service', function() {
      spyOn(HistoryFac, 'getHistory').and.callThrough();
      HistoryCtr = $controller('HistoryController', {HistoryFac: HistoryFac, Global: GlobalMock});
      
      $httpBackend.whenGET(api).respond(200, $q.when(response));
      $httpBackend.flush();

      expect(HistoryFac.getHistory).toHaveBeenCalledWith(userId);
      expect(HistoryCtr.histories).toEqual(response);
    });
  });
});