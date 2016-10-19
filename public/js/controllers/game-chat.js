'use strict';
angular.module('mean.gameChat')
  .controller('GameChatCtrl', function ($scope, GameChat) {
    var gameId = 'rkhu3yj4',
      users = [{
        name:'John Doe', 
        avatar:'http://brandonmathis.com/projects/fancy-avatars/demo/images/avatar_male_dark_on_clear_200x200.png'
      },{
        name:'Jane Doe',
        avatar:'http://brandonmathis.com/projects/fancy-avatars/demo/images/avatar_female_dark_on_clear_200x200.png'
      }],
      currentUser = users[0];
      // var gameId = game.gameID,
      //   users = game.players;
      
    $scope.GameChat = GameChat;
    $scope.messages = {};

    $scope.newMessage = function(messages) {
      $scope.messages = messages;
      $scope.$apply();
    };

    $scope.sendMessage = function() {
      $scope.GameChat.sendMessage($scope.message, gameId, currentUser);
    };

    //triggerIsTyping : function(gameId, typist){
    $scope.showIsTyping = function(){
      $scope.GameChat.triggerIsTyping(gameId, currentUser);
    };

    $scope.hideIsTyping = function(){
      $('#isTyping').hide();
    };

    $scope.typingListener = function(){
      //typist = '';
      $('#isTyping').html('');
    };

    /*
    *Checks if a game chat session already exists
    */
    GameChat.sessionExists(gameId)
    .then(function() {
      // Loads message from that section
      $scope.GameChat.loadMessages(gameId)
      .then(function(messages) {
        $scope.messages = messages;
        $scope.$apply();
        //Listen for new incoming message
        $scope.GameChat.listenForMessage(gameId, function(messages){
          $scope.newMessage(messages);
        });

        //Listen for user typing
        $scope.GameChat.listenForTyping(gameId,function (typist) {
          $scope.typingListener(typist);
        });
      });
    })
    .catch(function(){
      //No game chat session existed before
      $scope.GameChat.startSession(gameId, users).then(function(){
        //now listen for messages
        $scope.GameChat.listenForMessage(gameId, function(messages){ 
          $scope.newMessage(messages);
        });

        //Listen for user typing
        $scope.GameChat.
        listenForTyping(gameId, $scope.typingListener(function (typist) {
          $scope.typingListener(typist);
        }));
      });
    });
  });