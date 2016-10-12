angular.module('mean.system')
.controller('IndexController', ['$scope', '$http', 'Global', '$location', 'socket', 'game', 'AvatarService', function ($scope, $http, Global, $location, socket, game, AvatarService) {
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
    let user = {
      email: $scope.signin_email,
      password: $scope.signin_password
    };

    $http.post('/api/auth/login', user).then(function(data) {
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
      let newuser = {
        email: $scope.signup_email,
        password: $scope.signup_password,
        name: $scope.signup_name
      };

      $http.post('/api/auth/signup', newuser).then(function(data) {
        $scope.user_data = data;
        $scope.show_signup_error = false;
        // Clear the controls
        $scope.signup_email = '';
        $scope.signup_password = '';
        $scope.signup_password_again = '';
        $scope.signup_name = '';
        // Close the modal
        $scope.dismiss();
        // Hide login and Show history
        $scope.show_history = true;
      }, function(err) {
        $scope.error = err;
        $scope.show_signup_error = true;
      });
    }
  };
}]);