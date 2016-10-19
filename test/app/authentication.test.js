describe('Authentication functionality test', function() {
  var AuthFactory;
  var $httpBackend;
  var $q;

  jasmine.getJSONFixtures().fixturesPath = 'base/test/app';
  var signupResponse = getJSONFixture('token.json')[0];
  var signinResponse = getJSONFixture('token.json')[1];
  var socialResponse = getJSONFixture('token.json')[2];
  var signupUser = {
    name: 'Test User',
    email: 'test@test.com',
    password: 'hirgiuw4889jrjgekrgen6e'
  };
  var signinUser = {
    email: 'test@test.com',
    password: 'hirgiuw4889jrjgekrgen6e'
  };
  var socialUser = {
    clientId: 'riugquer438uiq',
    accessToken: 'hiufiut8945hudfg5jj'
  };

  beforeEach(module('services.Auth'));

  beforeEach(module('mean.system'));

  describe('Authentication Factory', function() {
    beforeEach(inject(function(_authFactory_, _$httpBackend_, _$q_) {
      AuthFactory = _authFactory_;
      $httpBackend = _$httpBackend_;
      $q = _$q_;
    }));

    it('should exist', function() {
      expect(AuthFactory).toBeDefined();
    });

    it('should expect all service functions to be defined', function() {
      expect(typeof AuthFactory.signIn).toBe('function');
      expect(typeof AuthFactory.signUp).toBe('function');
      expect(typeof AuthFactory.socialSignIn).toBe('function');
    });

    it('should expect signUp to make a post request to /api/auth/signup', function() {
      spyOn(AuthFactory, 'signUp').and.callThrough();
      const api = '/api/auth/signup';
      $httpBackend.whenPOST(api).respond(201, $q.when(signupResponse));
      var res = {};
      expect(res).toEqual({});
      AuthFactory.signUp(signupUser).then(function(result) {
        res = result;
      });
      $httpBackend.flush();
      expect(AuthFactory.signUp).toHaveBeenCalledWith(signupUser);
    });

    it('should expect signIn to make a post request to /api/auth/login', function() {
      spyOn(AuthFactory, 'signIn').and.callThrough();
      const api = '/api/auth/login';
      $httpBackend.whenPOST(api).respond(200, $q.when(signinResponse));
      var res = {};
      expect(res).toEqual({});
      AuthFactory.signIn(signinUser).then(function(result) {
        res = result;
      });
      $httpBackend.flush();
      expect(AuthFactory.signIn).toHaveBeenCalledWith(signinUser);
    });

    it('should expect socialSignIn to make a post request to /api/auth/social', function() {
      spyOn(AuthFactory, 'socialSignIn').and.callThrough();
      const api = '/api/auth/social';
      $httpBackend.whenPOST(api).respond(200, $q.when(socialResponse));
      var res = {};
      expect(res).toEqual({});
      AuthFactory.socialSignIn(socialUser).then(function(result) {
        res = result;
      });
      $httpBackend.flush();
      expect(AuthFactory.socialSignIn).toHaveBeenCalledWith(socialUser);
    });
  });

  describe('Index Controller (Authentication section)', function() {
    var $controller;
    var IndexController;
    var $location;
    var socketMock;
    var game;
    var AvatarService;


    beforeEach(inject(function(_$controller_, _authFactory_, _$httpBackend_, _$q_, _$location_, _game_, _AvatarService_){
      $controller = _$controller_;
      AuthFactory = _authFactory_;
      $location = _$location_;
      socketMock = {
        socket: {}
      };
      game = _game_;
      AvatarService = _AvatarService_;
      $httpBackend = _$httpBackend_;
      IndexController = $controller('IndexController', { authFactory: AuthFactory, socket: socketMock});
      $q = _$q_;
    }));

    it('should be defined', function() {
      expect(IndexController).toBeDefined();
    });

    it('call the socialSignIn function of AuthFactory service', function() {
      spyOn(AuthFactory, 'socialSignIn').and.callThrough();
      IndexController = $controller('IndexController', { authFactory: AuthFactory, socket: socketMock });
      
      const api = '/api/auth/social';

      $httpBackend.whenPOST(api).respond(200, $q.when(socialResponse));
      $httpBackend.flush();
      expect(AuthFactory.socialSignIn).toHaveBeenCalled();
      expect(IndexController.userData).toEqual(socialResponse);
    });
  });
});