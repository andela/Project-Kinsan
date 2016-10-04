beforeEach(function() {
  var HistoryFac;
  var $httpBackend;
  var $q;
  var GlobalMock;
  userId = '57ea45dd18be84c20f000001';

  api = '/api/users/'+userId+'/history';
  response = [
    {
      '_id': '57f26306fc81500d5b000001',
      'gameId': 'qwerty123456',
      'completed': true,
      'winner': {
        '_id': '57ea515718be84c20f000002',
        'name': 'ralph'
      },
      '__v': 0,
      'players': [
        {
          '_id': '57ea515718be84c20f000002',
          'name': 'ralph'
        },
        {
          '_id': '57ea45dd18be84c20f000001',
          'name': 'ralph'
        },
        {
          '_id': '57f25ba5c216ad1622000001',
          'name': 'demilade'
        }
      ]
    },
    {
      '_id': '57f2631cfc81500d5b000002',
      'gameId': 'qwerty123457',
      'completed': true,
      'winner': {
        '_id': '57ea515718be84c20f000002',
        'name': 'ralph'
      },
      '__v': 0,
      'players': [
        {
          '_id': '57ea515718be84c20f000002',
          'name': 'ralph'
        },
        {
          '_id': '57ea45dd18be84c20f000001',
          'name': 'ralph'
        },
        {
          '_id': '57f25ba5c216ad1622000001',
          'name': 'demilade'
        }
      ]
    },
    {
      '_id': '57f2632efc81500d5b000003',
      'gameId': 'qwerty1234557',
      'completed': true,
      'winner': {
        '_id': '57ea515718be84c20f000002',
        'name': 'ralph'
      },
      '__v': 0,
      'players': [
        {
          '_id': '57ea515718be84c20f000002',
          'name': 'ralph'
        },
        {
          '_id': '57ea45dd18be84c20f000001',
          'name': 'ralph'
        },
        {
          '_id': '57f25ba5c216ad1622000001',
          'name': 'demilade'
        }
      ]
    },
    {
      '_id': '57f26353fc81500d5b000005',
      'gameId': 'qwerty12324',
      'completed': true,
      'winner': {
        '_id': '57ea45dd18be84c20f000001',
        'name': 'ralph'
      },
      '__v': 0,
      'players': [
        {
          '_id': '57ea45dd18be84c20f000001',
          'name': 'ralph'
        },
        {
          '_id': '57f25ba5c216ad1622000001',
          'name': 'demilade'
        }
      ]
    }
  ];
});

describe('History factory', function() {

  // before each test load the angular module for history controller
  // and history factory
  beforeEach(
    angular.mock.module('services.History')
  );

  // load angular module for Global service
  beforeEach(
    angular.mock.module('mean.system')
  );

  // Set our injected History service (_Users_) to our local History variable
  beforeEach(inject(function(_HistoryFac_){
    HistoryFac = _HistoryFac_;
  }));

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
    result = {};

    expect(result).toEqual({});

    HistoryFac.getHistory(userId).then(function(res){
      result = res;
    });

    $httpBackend.flush();

    expect(HistoryFac.getHistory).toHaveBeenCalledWith(userId);
  });
});

// mock uo the Global service provided by the mean.system module
beforeEach(function(){
  GlobalMock = {
    user: {
      _id: userId
    },
    authenticated: true
  };
});

describe('History Controller', function() {
  var $controller;
  var HistoryCtr;
  var Global;

  // load the angular module
  beforeEach(
    angular.mock.module('services.History')
  );

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