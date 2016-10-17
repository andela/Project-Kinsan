/**
 * Created by cyrielo on 10/11/16.
 */
'use strict';
angular.module('mean.gameChat')
  .controller('GameChatCtrl', function ($scope, GameChat) {
    var gameId = 'rkhu3yj4';
    var users = [{name:'john_doe', avatar:'http://brandonmathis.com/projects/fancy-avatars/demo/images/avatar_male_dark_on_clear_200x200.png'}, {name:'jane_doe',avatar:'http://brandonmathis.com/projects/fancy-avatars/demo/images/avatar_female_dark_on_clear_200x200.png'}];

    $scope.hi = 'Hello';
    $scope.GameChat = GameChat;
    $scope.messages = {};

    var newMessage = function(messages) {
      $scope.messages = messages;
      $scope.$apply();
    };

    $scope.sendMessage = function(msg, sender){
      sender = users[1];
      GameChat.sendMessage(msg, gameId, sender);
    };

    GameChat.sessionExists(gameId)
    .then(function() {
      GameChat.loadMessages(gameId)
      .then(function(messages){
        $scope.messages = messages;
        $scope.$apply();
        GameChat.listenForMessage(gameId, newMessage);
      });
    })
    .catch(function(){
      GameChat.startSession(gameId, users).then(function(){
        //now listen for messages
        GameChat.listenForMessage(gameId, newMessage);
      });
    });

  });
