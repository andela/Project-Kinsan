/* globals gapi, hello */

angular.module('mean.system')
.controller('IndexController', ['$scope', '$http', 'Global', '$location', 'socket', 'game', 'AvatarService', 'authFactory', function ($scope, $http, Global, $location, socket, game, AvatarService, authFactory) {
  $scope.global = Global;
  // variables for determining the visibility of certain UI elements
  $scope.show_signin_error = false;
  $scope.show_signup_error = false;
  $scope.show_history = false;
  
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

  $scope.signin = function() {
    var user = {
      email: $scope.signin_email,
      password: $scope.signin_password
    };

    authFactory.signIn(user).then(function(data) {
      $scope.user_data = data;
      $scope.show_signin_error = false;
      // Clear the controls
      $scope.signup_email = '';
      $scope.signup_password = '';
      // Hide login and Show history
      $scope.show_history = true;
      // Close the modal
      $scope.$broadcast('modalDismiss');
    }, function(err) {
      $scope.error = err;
      $scope.show_signin_error = true;
    });
  };

  $scope.signup = function() {
    if(!$scope.signup_name || !$scope.signup_email || !$scope.signup_password) {
      $scope.show_signup_error = true;
      $scope.error = {
        data: {
          message: 'Data incomplete.'
        }
      };
    } else if($scope.signup_password !== $scope.signup_password_again) {
      $scope.show_signup_error = true;
      $scope.error = {
        data: {
          message: 'Passwords do not match.'
        }
      };
    } else {
      var newuser = {
        email: $scope.signup_email,
        password: $scope.signup_password,
        name: $scope.signup_name
      };

      authFactory.signUp(newuser).then(function(data) {
        $scope.user_data = data;
        $scope.show_signup_error = false;
        // Clear the controls
        $scope.signup_email = '';
        $scope.signup_password = '';
        $scope.signup_password_again = '';
        $scope.signup_name = '';
        // Hide login and Show history
        $scope.show_history = true;
        // Close the modal
        $scope.$broadcast('modalDismiss');
      }, function(err) {
        $scope.error = err;
        $scope.show_signup_error = true;
      });
    }
  };

  $scope.signout = function() {
    if($scope.user_data.data.user.provider === 'google') {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        $scope.show_history = false;
      });
    } else {
      hello($scope.user_data.provider, false, function() {
        $scope.show_history = false;
        $scope.user_data = null;
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
          $scope.user_data = data;
          $scope.show_history = true;
          $scope.$broadcast('modalDismiss');
        });
      }, function(error) {
      $scope.error = error;
      $scope.show_signin_error = true;
    });
  };

  // $scope.googleSignIn = function() {
  //   const google = hello('google');
  //   google.login({response_type: 'code'}).then(
  //     function(data) {
  //       console.log(data);
  //     },
  //     function(err)
  //     {
  //       console.log(err);
  //     }
  //   );
  // };

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
          $scope.user_data = data;
          $scope.show_history = true;
          $scope.$broadcast('modalDismiss');
        });
      }, function(error) {
      $scope.error = error;
      $scope.show_signin_error = true;
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
      $scope.user_data = data;
      $scope.show_history = true;
      $scope.$broadcast('modalDismiss');
    });
  };

  $scope.googleSignInFailure = function(error) {
    $scope.error = error;
    $scope.show_signin_error = true;
  };

  $scope.start = function() {
    // Render the google sign in button
    gapi.signin2.render('signInButton',
      {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': false,
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
    }, {redirect_uri: 'http://localhost:3000'});
  };

  $scope.start();
}]);