/* globals hello */

angular.module('mean.system')
.controller('IndexController', ['$scope', 'Global', '$location', '$cookies', 'authFactory', function ($scope, Global, $location, $cookies, authFactory) {
  $scope.show_signin_error = false;
  $scope.show_signup_error = false;
  $scope.show_history = false;
  $scope.userData = {};  

  $scope.signInComplete = function signInComplete(data) {
    $scope.show_signin_error = false;
    $scope.show_signup_error = false;
    $scope.userData = data.data;
    $scope.$broadcast('modalDismiss');

    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    $cookies.putObject('_userData', $scope.userData, { expires: expiryDate }); 

    $scope.redirectToGame();   
  };

  $scope.redirectToGame = function redirectToGame() {
    Global.user = $scope.userData.user;
    Global.authenticated = $scope.userData.authenticated;
    $scope.show_history = true;
    $location.path('/game');
  };

  $scope.signOutComplete = function signOutComplete() {
    $scope.show_history = false;
    $scope.userData = null;
    Global.user = null;
    Global.authenticated = false;

    $cookies.remove('_userData');
    $location.path('/');
  };

  $scope.showSignInErrors = function showSignInErrors(error) {
    $scope.error = error;
    $scope.show_signin_error = true;
  };

  $scope.showSignUpErrors = function showSignUpErrors(error) {
    $scope.error = error;
    $scope.show_signup_error = true;
  };

  $scope.clearSignInControls = function clearSignInControls() {
    $scope.signin_email = '';
    $scope.signin_password = '';
  };

  $scope.clearSignUpControls = function clearSignUpControls() {
    $scope.signup_email = '';
    $scope.signup_password = '';
    $scope.signup_password_again = '';
    $scope.signup_name = '';
  };

  function checkAuthStatus() {
    const userData = $cookies.getObject('_userData');
    if (userData) {
      $scope.userData = userData;
      $scope.redirectToGame();
    }
  }

  $scope.signin = function() {
    var user = {
      email: $scope.signin_email,
      password: $scope.signin_password
    };

    authFactory.signIn(user).then(function(data) {
      $scope.clearSignInControls();
      $scope.signInComplete(data);
    }, function(err) {
      $scope.showSignInErrors(err);
    });
  };

  $scope.signup = function() {
    if(!$scope.signup_name || !$scope.signup_email || !$scope.signup_password) {
      const error = {
        data: { message: 'Data incomplete.' }
      };
      $scope.showSignUpErrors(error);
    } else if($scope.signup_password !== $scope.signup_password_again) {
      const error = {
        data: { message: 'Passwords do not match.' }
      };
      $scope.showSignUpErrors(error);
    } else {
      var newuser = {
        email: $scope.signup_email,
        password: $scope.signup_password,
        name: $scope.signup_name
      };

      authFactory.signUp(newuser).then(function(data) {
        $scope.clearSignUpControls();
        $scope.signInComplete(data);
      }, function(err) {
        $scope.showSignUpErrors(err);
      });
    }
  };

  $scope.signout = function() {
    hello($scope.userData.user.provider).logout().then(
      function() {
        $scope.signOutComplete();
      });
  };

  $scope.twitterSignIn = function() {
    const twitter = hello('twitter');
    twitter.login({ scope: 'email' }).then( 
      function() {
        hello('twitter').api('me').then(function(user) {    
          const userDetails = {
            name: user.name,
            email: user.id,
            provider: 'twitter'
          };
          authFactory.socialSignIn(userDetails).then(function(data) {
            $scope.signInComplete(data);
          });
        });
      }, function(error) {
      $scope.showSignInErrors(error);
    });
  };

  $scope.facebookSignIn = function() {
    const facebook = hello('facebook');
    facebook.login({ scope: 'email' }).then( 
      function() {
        hello('facebook').api('me').then(function(user) {
          const userDetails = {
            name: user.name,
            email: user.email,
            provider: 'facebook'
          };        
          authFactory.socialSignIn(userDetails).then(function(data) {
            $scope.signInComplete(data);
          });
        });
      }, function(error) {
      $scope.showSignInErrors(error);
    });
  };

  $scope.googleSignIn = function() {
    const facebook = hello('google');
    facebook.login({ redirect_uri: 'http://localhost:3000/', scope: 'email' }).then( 
      function() {
        hello('google').api('me').then(function(user) {
          const userDetails = {
            name: user.name,
            email: user.email,
            provider: 'google'
          };        
          authFactory.socialSignIn(userDetails).then(function(data) {
            $scope.signInComplete(data);
          });
        });
      }, function(error) {
      $scope.showSignInErrors(error);
    });
  };

  $scope.start = function() {
    hello.init({
      twitter: '0sJtZF1PpD66LtwNvTwY1C8XS',
      google: '1029392787108-9gdnkcp2qlfcakf5inoamjji6eqrr2cq.apps.googleusercontent.com',
      facebook: '1400661746618229'
    }, {});

    checkAuthStatus();
  };

  $scope.start();
}]);