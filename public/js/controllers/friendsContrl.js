angular.module('mean.system')
  .controller('FriendsController', ['$scope', '$window', 'friendsService', function ($scope, $window, friendsService) {

    $scope.displayStatus = false;
    $scope.friendsService = friendsService;


    $scope.getFriends = function () {
      $scope.friends = $scope.friendsService.getFriends();
    };

    $scope.addFriend = function (friendName) {
      if (!$window.user) {
        $scope.displayStatus = true;
        $scope.message = 'Register to add friends.';
        setTimeout(function () {
          $scope.displayStatus = false;
        }, 3000);
      } else if (friendName !== $window.user.name) {
        var message = $scope.friendsService.addFriend($window.user._id, friendName);
        message.then(function (res) {
          message = res.data;
          if (message.status) {
            $scope.displayStatus = true;
            $scope.message = message.message;
            setTimeout(function () {
              $scope.displayStatus = false;
            }, 3000);
          }
        });
      }
    };

  }]);