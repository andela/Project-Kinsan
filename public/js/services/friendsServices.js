angular.module('mean.system')
  .service('friendsService', function ($http) {
    this.getFriends = function (userid) {
      return $http.get('/api/users/' + userid + '/friends');
    };

    this.getUsers = function (userid) {
      return $http.get('/api/users/' + userid);
    };

    this.addFriend = function (userid, friendName) {
      return $http.post('/api/users/' + userid + '/addFriend/' + friendName);
    };

    this.delFriend = function (userid, friendName) {
      $http.del('/api/users/' + userid + '/delFriend/' + friendName)
        .then(function (res) {
          return res.data;
        });
    };
  });