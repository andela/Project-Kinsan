/**
 * Created by cyrielo on 10/11/16.
 */
'use strict';
angular.module('mean.gameChat')
  .controller('GameChatCtrl', function ($scope, GameChat) {

      var gameId = 'rkhu3yj4',
          users = [{name:'john_doe', avatar:'http://brandonmathis.com/projects/fancy-avatars/demo/images/avatar_male_dark_on_clear_200x200.png'}, {name:'jane_doe',avatar:'http://brandonmathis.com/projects/fancy-avatars/demo/images/avatar_female_dark_on_clear_200x200.png'}],
          currentUser = users[0];

      // var gameId = game.gameID,
      //   users = game.players;
      
    $scope.GameChat = GameChat;
    $scope.messages = {};

    $scope.newMessage = function(messages) {
      $scope.messages = messages;
      //$scope.$apply();
    };

    $scope.sendMessage = function() {
      $scope.GameChat.sendMessage($scope.message, gameId, currentUser);
    };

    //triggerIsTyping : function(gameId, typist){
    $scope.showIsTyping = function(){
      $scope.GameChat.triggerIsTyping(gameId, currentUser);
    };

    $scope.hideIsTyping = function(){
      var ele = document.getElementById('isTyping');
      ele.display = 'none';
    };

    $scope.typingListener = function(typist){
      var ele = document.getElementById('isTyping');
       // ele.innerHTML =  'someone is typing....';
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
        console.log($scope.messages);
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
      $scope.GameChat.listenForMessage(gameId, function(){
        $scope.newMessage(messages);
      });

      //Listen for user typing
      $scope.GameChat.listenForTyping(gameId, $scope.typingListener(function (typist) {
          $scope.typingListener(typist)
      }));
    })
  });

  /*Manipulate the DOM */
  $(document).ready( function () {
  var scrolled = 100000;

  $('#chat').click( function () {
    $('#word').slideToggle('slow');
    $('#box').slideToggle('slow');
    $('#chat').toggleClass('closeChat');
    $('#chat').toggleClass('chat');
    $('#chatMessages').animate({
      scrollTop: scrolled
    });
  });

  $('#top').click( function () {
    $('#word').slideToggle('slow');
    $('#box').slideToggle('slow');
    $('#chat').toggleClass('closeChat');
    $('#chat').toggleClass('chat');
  });

/*  $('#message').focusin( function () {
    $('#isTyping').text('I am typing....');
    $('#message').focusout( function () {
      $('#isTyping').text('');
    });
  });*/

  $('#send').click( function () {

    $('#message').val('');
    $('#chatMessages').animate({
      scrollTop: scrolled
    });
  });

  $('#message').keypress( function (e) {
    if(e.which == 13) {
      $('#message').val('');
      $('#chatMessages').animate({
        scrollTop: scrolled
      });
    }
  });
});
      
});