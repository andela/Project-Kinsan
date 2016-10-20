'use strict';
describe('Test for GameChatCtrl', function(){
  var $scope, $controller, GameChat;

  beforeEach(
    angular.mock.module('mean.gameChat')
  );

  beforeEach(function(){
    inject(function($injector, _$controller_){
      $controller = _$controller_;
      GameChat = $injector.get('GameChat');
    });
  });

  beforeEach(function(){
    $scope = {};
    $controller('GameChatCtrl', {$scope: $scope});

    $scope.gameId = 'qwertyuiop';
    $scope.users = [
      {name:'John Doe', avatar:'http://blahblah.com/avatar.png'},
      {name:'Jane Doe',avatar:'http://blahblah.com/gravatar.gif'}
    ];
    $scope.currentUser = $scope.users[0];
  });

  describe('Scope properties check', function(){
    it('should expect property "GameChat" to equal GameChat', function(){
      expect($scope.GameChat).toEqual(GameChat);
    });

    it('should expect property "messages" to be an empty object', function(){
      expect($scope.messages).toEqual({});
    });

    it('should expect newMessage to be a defined function', function(){
      expect(typeof $scope.newMessage).toEqual('function');
    });

    it('should expect sendMessage to be a defined function', function(){
      expect(typeof $scope.sendMessage).toEqual('function');
    });

    it('should expect showIsTyping to be a defined function', function(){
      expect(typeof $scope.showIsTyping).toEqual('function');
    });

    it('should expect typingListener to be a defined function', function(){
      expect(typeof $scope.typingListener).toEqual('function');
    });

  });
});