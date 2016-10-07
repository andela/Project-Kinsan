angular.module('mean.system')
.controller('IndexController', ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', function ($scope, Global, $location, socket, game, AvatarService) {
  $scope.global = Global;

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
  }}]);