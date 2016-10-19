describe('Authentication functionality test', function() {
  // and history factory
  beforeEach(
    angular.mock.module('services.Auth')
  );

  // load angular module for Global service
  beforeEach(
    angular.mock.module('mean.system')
  );

  describe('Index Controller (Authentication section)', function() {
    var controller;
    var IndexController;
    var location;
    var scope;
    var cookies;
    var httpBackend;
    var AuthFactory;
    var q;
    var $cookies = {
      getObject: function(cookieName) {
        return {
          data: {
            user: {
              id: 'Bleh'
            }
          }
        };
      }
    };  

    jasmine.getJSONFixtures().fixturesPath = 'base/test/app';
    var signupResponse = getJSONFixture('token.json')[0];
    var signinResponse = getJSONFixture('token.json')[1];
    var socialResponse = getJSONFixture('token.json')[2];

    beforeEach(inject(function(_$controller_, _$q_, _$location_, _$rootScope_, _$httpBackend_, _authFactory_, _$q_){
      httpBackend = _$httpBackend_;
      controller = _$controller_;
      AuthFactory = _authFactory_;
      location = _$location_;
      scope = _$rootScope_.$new();
      q = _$q_;
      //cookies = _$cookies_;

      IndexController = controller('IndexController', { 
        authFactory: AuthFactory,
        $scope: scope, 
        $location: location,
        $cookies: $cookies,
        $q : q
      });
    }));

    it('should be defined', function() {
      expect(IndexController).toBeDefined();
    });

    it('call the social function of AuthFactory service', function() {
      spyOn(AuthFactory, 'socialSignIn').and.callThrough();
      IndexController = controller('IndexController', { 
        authFactory: AuthFactory,
        $scope: scope, 
        $location: location,
        $cookies: $cookies,
        $q : q
      });
      
      const api = '/api/auth/social';

      httpBackend.whenPOST(api).respond(200, q.when(socialResponse));
      IndexController.$scope.socialSignIn();
      expect(AuthFactory.social).toHaveBeenCalled();
      expect(IndexController.$scope.userData).toEqual(socialResponse);
    });
  });
});