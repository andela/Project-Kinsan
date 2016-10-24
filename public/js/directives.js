angular.module('mean.directives')
  // Ralph: Modify player directive
  .directive('player', function (){
    return{
      restrict: 'E',
      templateUrl: '/views/player.tpl.html',
      scope: {
        players: '=players'
      },
      bindToController: true,
      controller: function($scope) {
        var vm = this;
        vm.currentCzar = $scope.$parent.currentCzar;
        vm.isPlayer = $scope.$parent.isPlayer;
      },
      // eslint-disable-next-line
      controllerAs: 'vm'
    };
  })
  .directive('question', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/question.tpl.html',
      // eslint-disable-next-line
      controllerAs: 'vm',
      scope: true,
      controller: function(){
      }
    };
  })
  .directive('timer', function(){
    return{
      restrict: 'EA',
      templateUrl: '/views/timer.tpl.html'
    };
  }).directive('answer', function(){
    return {
      restrict: 'E',
      templateUrl: '/views/answers.tpl.html',
      // eslint-disable-next-line
      controllerAs: 'vm',
      controller: function(){
      }
    };
  }).directive('myModal', function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        scope.dismiss = function() {
          element.modal('hide');
        };
        scope.$on('modalDismiss',function() {
          element.modal('hide');
        });
      }
    };
  }).directive('chat', function(){
    return {
      restrict: 'E',
      templateUrl: '/views/chat.tpl.html',
      scope: {
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: chatController
    };
  }).directive('infoModal', function(){
    return {
      restrict: 'E',
      templateUrl: '/views/info-modal.tpl.html',
      // eslint-disable-next-line
      controllerAs: 'vm',
      controller: function(){
      }
    };
  });

function chatController ($scope, GameChat, game, Global) {
  $scope.currentUser = Global.user || game.players[game.playerIndex];
  $scope.gameId = game.gameID;
  $scope.users = game.players;

  $scope.GameChat = GameChat;
  $scope.messages = {};

  $scope.newMessage = function(messages) {
    $scope.messages = messages;
    $scope.$apply();
  };

  $scope.sendMessage = function() {
    return $scope.GameChat.sendMessage($scope.message, $scope.gameId, $scope.currentUser);
  };

  // triggerIsTyping : function($scope.gameId, typist){
  $scope.showIsTyping = function(){
    //we need to make the user unique for same user so the listener is triggered
    $scope.currentUser.rand = Math.ceil(Math.random() * 10000);
    var typist = {
      name: $scope.currentUser.username || $scope.currentUser.name,
      rand: $scope.currentUser.rand
    };
    $scope.GameChat.triggerIsTyping($scope.gameId, typist);
  };

  var firstCheck = false, waitTime = 2, timer;
  $scope.typingListener = function(typist){

    if (firstCheck) {
      waitTime = 2;
      clearInterval(timer);
      if ($scope.currentUser.name !== typist.name) {
        $('#isTyping').html(typist.name + ' is typing...');
      }

      timer = setInterval(function() {
        waitTime--;
        if(waitTime === 0){
          $('#isTyping').html('');
          clearInterval(timer);
        }
      }, 1000);

    }
    firstCheck = true;
  };

  /*
  *Checks if a game chat session already exists
  */
  $scope.GameChat.sessionExists($scope.gameId)
  .then(function() {
    // Loads message from that section
    $scope.GameChat.loadMessages($scope.gameId)
    .then(function(messages) {
      $scope.messages = messages;
      $scope.$apply();
      //Listen for new incoming message
      $scope.GameChat.listenForMessage($scope.gameId, function(messages){
        $scope.newMessage(messages);
      });

      //Listen for user typing
      $scope.GameChat.listenForTyping($scope.gameId, $scope.typingListener);
    });
  })
  .catch(function(){
    //No game chat session existed before
    $scope.GameChat.startSession($scope.gameId, $scope.users).then(function(){
      //now listen for messages
      $scope.GameChat.listenForMessage($scope.gameId, function(messages){
        $scope.newMessage(messages);
      });

      //Listen for user typing
      $scope.GameChat.listenForTyping($scope.gameId, $scope.typingListener);
    });
  });

  $(document).ready( function () {
    var scrolled = 100000, messageInput = $('#message');
    messageInput.keyup(function(){
      $scope.showIsTyping();
    });

    $('#send').click( function () {
      $('#message').val('');
      $('#chatMessages').animate({
        scrollTop: scrolled
      });
    });

    messageInput.keypress(function (e) {
      if(e.which === 13) {
        $scope.sendMessage();
        $('#message').val('');
        $('#chatMessages').animate({
          scrollTop: scrolled
        });
      }
    });

  });

}
