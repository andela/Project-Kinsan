describe('Authentication controller test', function() {
  beforeEach(
    angular.mock.module('services.Auth')
  );
  beforeEach(
    angular.mock.module('mean.system')
  );

  describe('Index Controller', function() {
    var  createController, location, scope, AuthFactory, $q, Global;
    var $cookies = {
      _cookies: {},
      getObject: function(key) {
        return this._cookies[key];
      },
      putObject: function(key, data) {
        this._cookies[key] = data;
      },
      remove: function(key) {
        this._cookies[key] = undefined;
      }
    };


    beforeEach(inject(function($controller, _$q_, _$location_, $rootScope, _authFactory_) { 
      AuthFactory = _authFactory_;
      location = _$location_;
      scope = $rootScope.$new();
      $q = _$q_;
      Global = {};


      createController = function() {
        return $controller('IndexController', { 
          authFactory: AuthFactory,
          $scope: scope, 
          $location: location,
          $cookies: $cookies,
          $q : $q,
          Global: Global
        });
      };
    }));


    it('should be defined', function() {
      var IndexController = createController();
      expect(IndexController).toBeDefined();
    });

    it('should set the signin error when called', function() {
      const error = { message: 'Sample error' };
      // eslint-disable-next-line
      var IndexController = createController();
      expect(scope['showSignInErrors']).toBeDefined();
      scope.showSignInErrors(error);
      expect(scope.error).toEqual(error);
      expect(scope.show_signin_error).toEqual(true);
    });

    it('should set the signup error when called', function() {
      const error = { message: 'Sample error' };
      // eslint-disable-next-line
      var IndexController = createController();
      expect(scope['showSignUpErrors']).toBeDefined();
      scope.showSignUpErrors(error);
      expect(scope.error).toEqual(error);
      expect(scope.show_signup_error).toEqual(true);
    });

    it('should set the cookies on signin completion', function() {
      // eslint-disable-next-line
      var IndexController = createController();
      expect(scope['signInComplete']).toBeDefined();
      const sampleData = { data: {} };
      scope.signInComplete(sampleData);
      expect(scope.show_signin_error).toBe(false);
      expect(scope.show_signup_error).toBe(false);
      expect(scope.userData).toEqual(sampleData.data);
      expect(scope.userData).toEqual($cookies.getObject('_userData'));
    });

    it('should redirect the user to a game screen', function() {
      // eslint-disable-next-line
      var IndexController = createController();
      expect(scope['redirectToGame']).toBeDefined();
      scope.redirectToGame();
      expect(location.path()).toEqual('/game');
    });

    it('should set the cookies on signout completion', function() {
      // eslint-disable-next-line
      var IndexController = createController();
      expect(scope['signOutComplete']).toBeDefined();
      scope.signOutComplete();
      expect(scope.show_history).toBe(false);
      expect(scope.userData).toEqual(null);
      expect($cookies.getObject('_userData')).toEqual(undefined);
    });

    it('should clear signin models', function() {
      // eslint-disable-next-line
      var IndexController = createController();
      expect(scope['clearSignInControls']).toBeDefined();
      scope.clearSignInControls();
      expect(scope.signin_email).toEqual('');
      expect(scope.signin_password).toEqual('');
    });

    it('should clear signin models', function() {
      // eslint-disable-next-line
      var IndexController = createController();
      expect(scope['clearSignUpControls']).toBeDefined();
      scope.clearSignUpControls();
      expect(scope.signup_email).toEqual('');
      expect(scope.signup_password).toEqual('');
      expect(scope.signup_name).toEqual('');
      expect(scope.signup_password_again).toEqual('');
    });
  });
});