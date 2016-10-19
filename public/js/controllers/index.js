/* globals gapi, hello */

angular.module('mean.system')
.controller('IndexController', ['$scope', '$http', 'Global', '$location', '$cookies', 'socket', 'game', 'AvatarService', 'authFactory', function ($scope, $http, Global, $location, $cookies, socket, game, AvatarService, authFactory) {
  $scope.global = Global;
  // variables for determining the visibility of certain UI elements
  $scope.show_signin_error = false;
  $scope.show_signup_error = false;
  $scope.show_history = false;
  $scope.userData = {};
  
  $scope.playAsGuest = function() {
    game.joinGame();
    $location.path('/app');
  };

  $scope.showError = function() {
    if ($location.search().error) {
      return $location.search().error;
    } else {
      return false;
    }
  };

  $scope.avatars = [];
  AvatarService.getAvatars()
    .then(function(data) {
      $scope.avatars = data;
    });

  //Index slider
  var cards = jQuery('.cards').find('.real-card'),
    sliderLeft = jQuery('#slider-left'),
    sliderRight = jQuery('#slider-right'),
    currentIndex = 0;

  if(cards.length > 0){
    sliderLeft.click(function () {
      if (currentIndex > 0) {
        var currentCard = jQuery(cards[currentIndex]);

        currentCard.fadeOut(300);
        currentCard.removeClass('current');
        currentIndex--;
        currentCard = jQuery(cards[currentIndex]);
         
        currentCard.animate({left:130},300,'swing');
        currentCard.css('transform', 'rotate(0deg)');
        currentCard.addClass('current');

        if (currentIndex === 0) {
          jQuery('#slider-left').addClass('dead').removeClass('not-dead');
        }

        if (currentIndex === cards.length - 2) {
          jQuery('#slider-right').removeClass('dead').addClass('not-dead');
        }

      }
    });

    sliderRight.click(function () {
      if(currentIndex + 1 < cards.length) {
        var currentCard = jQuery(cards[currentIndex]);
          
        currentCard.css('transform', 'rotate(-6deg)');
        currentCard.animate({left:90},300,'swing');
        currentCard.removeClass('current');
        currentCard.show();
          
        currentIndex++;
        currentCard = jQuery(cards[currentIndex]);
        currentCard.fadeIn(300);
        currentCard.addClass('current');

        if (currentIndex === 1) {
          jQuery('#slider-left').removeClass('dead').addClass('not-dead');
        }

        if ((currentIndex + 1) === cards.length) {
          jQuery('#slider-right').removeClass('not-dead').addClass('dead');
        }
      }
    });
  }

  function signInComplete(data) {
    $scope.show_signup_error = false;
    $scope.userData = data;
    $scope.show_history = true;
    $scope.$broadcast('modalDismiss');

    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    $cookies.putObject('_userData', $scope.userData, { expires: expiryDate }); 

    redirectToGame();   
  }

  function redirectToGame() {
    $location.path('/game');
  }

  function signOutComplete() {
    $scope.show_history = false;
    $scope.userData = null;
  }

  function showSignInErrors(error) {
    $scope.error = error;
    $scope.show_signin_error = true;
  }

  function showSignUpErrors(error) {
    $scope.error = error;
    $scope.show_signup_error = true;
  }

  function clearSignInControls() {
    $scope.signup_email = '';
    $scope.signup_password = '';
  }

  function clearSignUpControls() {
    $scope.signup_email = '';
    $scope.signup_password = '';
    $scope.signup_password_again = '';
    $scope.signup_name = '';
  }

  function checkAuthStatus() {
    const userData = $cookies.getObject('_userData');
    if (userData) {
      $scope.userData = userData;
      redirectToGame();
    }
  }

  $scope.signin = function() {
    var user = {
      email: $scope.signin_email,
      password: $scope.signin_password
    };

    authFactory.signIn(user).then(function(data) {
      clearSignInControls();
      signInComplete(data);
    }, function(err) {
      showSignInErrors(err);
    });
  };

  $scope.signup = function() {
    if(!$scope.signup_name || !$scope.signup_email || !$scope.signup_password) {
      const error = {
        data: { message: 'Data incomplete.' }
      };
      showSignUpErrors(error);
    } else if($scope.signup_password !== $scope.signup_password_again) {
      const error = {
        data: { message: 'Passwords do not match.' }
      };
      showSignUpErrors(error);
    } else {
      var newuser = {
        email: $scope.signup_email,
        password: $scope.signup_password,
        name: $scope.signup_name
      };

      authFactory.signUp(newuser).then(function(data) {
        clearSignUpControls();
        signInComplete(data);
      }, function(err) {
        showSignUpErrors(err);
      });
    }
  };

  $scope.signout = function() {
    if($scope.userData.data.user.provider === 'google') {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        signOutComplete();
      });
    } else {
      hello($scope.userData.provider, false, function() {
        signOutComplete();
      });
    }
  };

  $scope.twitterSignIn = function() {
    const twitter = hello('twitter');
    twitter.login().then( 
      function(response) {
        const user = {
          clientId: response.authResponse.client_id,
          accessToken: response.authResponse.access_token,
          provider: 'twitter',
          userId: response.authResponse.user_id,
          name: response.authResponse.screen_name
        };
        authFactory.socialSignIn(user).then(function(data) {
          signInComplete(data);
        });
      }, function(error) {
      showSignInErrors(error);
    });
  };

  $scope.facebookSignIn = function() {
    const facebook = hello('facebook');
    facebook.login({ scope: 'email' }).then( 
      function(response) {
        const user = {
          clientId: response.authResponse.client_id,
          accessToken: response.authResponse.access_token,
          provider: 'facebook'
        };
        authFactory.socialSignIn(user).then(function(data) {
          signInComplete(data);
        });
      }, function(error) {
      showSignInErrors(error);
    });
  };

  $scope.googleSignInSuccess = function(googleUser) {
    const user = {
      email: googleUser['w3'].U3,
      name: googleUser['w3'].ig,
      accessToken: googleUser['Zi'].access_token,
      idToken: googleUser['Zi'].id_token,
      provider: 'google'
    };
    authFactory.socialSignIn(user).then(function(data) {
      signInComplete(data);
    });
  };

  $scope.googleSignInFailure = function(error) {
    showSignInErrors(error);
  };

  $scope.start = function() {
    // Render the google sign in button
    gapi.signin2.render('signInButton',
      {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': $scope.googleSignInSuccess,
        'onfailure': $scope.googleSignInFailure,
        'cookiepolicy': 'single_host_origin'
      }
    );

    //Initialize hello
    hello.init({
      twitter: '0sJtZF1PpD66LtwNvTwY1C8XS',
      google: '1029392787108-9gdnkcp2qlfcakf5inoamjji6eqrr2cq.apps.googleusercontent.com',
      facebook: '1400661746618229'
    }, {});

    checkAuthStatus();
  };

  $scope.start();
}]);