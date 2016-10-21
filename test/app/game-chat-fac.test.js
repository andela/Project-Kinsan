'use strict';
describe('Game chat test', function(){

  beforeEach(
    angular.mock.module('mean.gameChat')
  );

  var  $factoryProvider, GameChat;

  beforeEach(function(){
    inject(function($injector){
      $factoryProvider = $injector;
    });
    GameChat = $factoryProvider.get('GameChat');
  });

  describe('Test GameChat factory', function(){
    //creating demo data
    var validGameId = 'qwertyuiop',
      users = [
        {name:'John Doe', avatar:'http://blahblah.com/avatar.png'},
        {name:'Jane Doe',avatar:'http://blahblah.com/gravatar.gif'}
      ];

    beforeEach(function(){
      /*
      * we try to change the key for saving data to firebase after
      * confirming they've been defined
      * */
      if (typeof GameChat.sessionStoreRef === 'string'
         && GameChat.sessionStoreRef.trim() !== '' ) {
        GameChat.sessionStoreRef = 'test-game-sessions';
      }

      if (typeof GameChat.membersRef === 'string'
        && GameChat.membersRef.trim() !== '') {
        GameChat.membersRef = 'test-members';
      }

      if (typeof GameChat.messagesRef === 'string'
        && GameChat.messagesRef.trim() !== '') {
        GameChat.messagesRef = 'test-messages';
      }

      if(typeof GameChat.isTypingRef === 'string' 
        && GameChat.isTypingRef.trim() !== '') {
        GameChat.isTypingRef = 'test-isTyping';
      }

    });

    describe('Check for properties', function () {
      it('should expect property "sessionStoreRef" to be defined',function () {
        expect(GameChat.sessionStoreRef).toBeDefined();
      });

      it('should expect property "messagesRef" to be defined', function(){
        expect(GameChat.messagesRef).toBeDefined();
      });

      it('should expect property "membersRef" to be defined', function(){
        expect(GameChat.membersRef).toBeDefined();
      });
    });

    describe('Game session', function(){
      it('should expect "startSession" to be a defined function', function(){
        expect(typeof GameChat.startSession).toEqual('function');
      });

      it('should expect "sessionExists" to be a defined function', function(){
        expect(typeof GameChat.sessionExists).toEqual('function');
      });

      it('should be able to create a game session', function(done){
        GameChat.startSession(validGameId, users).then(function(){
          GameChat.sessionExists(validGameId).then(function(data){
            expect(data).toBe(true);
            done();
          }).catch(function(){
            expect(false).toBe(true);
            done();
          });
        });
      });


      it('should assert that a game session with a gameId exist',function(done){
        var nonExistentGameId = 'asdf1234';
        GameChat.sessionExists(validGameId)
          .then(function(data){
            expect(data).toBe(true);
            done();
          })
          .catch(function(){
            expect(false).toBe(true);
            done();
          });

        GameChat.sessionExists(nonExistentGameId)
        .then(function(data){
          expect(data).toBe(false);
          done();
        })
        .catch(function(errorMsg){
          expect(errorMsg)
          .toEqual('Session "'+nonExistentGameId+'" does not exist');
          done();
        });
      });
    });

    describe('Messages', function(){

      it('should expect sendMessage to be a defined function', function(){
        expect(GameChat.sendMessage).toBeDefined();
        expect(typeof GameChat.sendMessage).toEqual('function');
      });

      it('should be able to send a message', function(done){
        GameChat.sendMessage('Hello world', validGameId, users[0])
          .then(function(data){
            expect(data).toBe(true);
            done();
          })
          .catch(function(){
            expect(false).toBe(true);
            done();
          });
      });

      it('should expect listenForMessage to be a defined function', function(){
        expect(GameChat.listenForMessage).toBeDefined();
        expect(typeof GameChat.listenForMessage).toEqual('function');
      });
      
      it('should detect new data changes to firebase', function(done){
        var listener = {
          listen : function () {
          }
        };
        spyOn(listener, 'listen');
        GameChat.listenForMessage(validGameId, listener.listen);
        GameChat.sendMessage('Hey', validGameId, users[1]).then(function () {
          expect(listener.listen).toHaveBeenCalled();
          done();
        }).catch(function () {
          expect(false).toBe(true);
          done();
        });
      });

      it('should expect loadMessages to be a defined function', function(){
        expect(GameChat.loadMessages).toBeDefined();
        expect(typeof GameChat.loadMessages).toEqual('function');
      });

      it('should expect loadMessages to retrieve all messages', function(done){
        var sentMessages = ['Hello world', 'Hey'];
        GameChat.loadMessages(validGameId).then(function(data){
          expect(Object.keys(data).length).toBe(sentMessages.length);
          for(var i in data){
            if (data.hasOwnProperty(i)) {
              expect(sentMessages.indexOf(data[i].message))
              .toBeGreaterThanOrEqual(0);
            }
          }
          done();
        }).catch(function(){
          expect(false).toBe(true);
          done();
        });
      });
    });
    describe('Typing watcher', function(){
      var listener = {
        isTyping : function(){
        }
      };
      it('should expect triggerIsTyping to be a defined function', function(){
        expect(typeof GameChat.triggerIsTyping).toEqual('function');
      });

      it('should expect listenForTyping to be a defined function', function(){
        expect(typeof GameChat.listenForTyping).toEqual('function');
      });

      it('should expect listener.isTyping to be called', function(done){
        spyOn(listener, 'isTyping');
        GameChat.listenForTyping(validGameId, listener.isTyping);
        GameChat.triggerIsTyping(validGameId, {name : users[0].name})
        .then(function(){
          expect(listener.isTyping).toHaveBeenCalled();
          done();
        }).catch(function(){
          expect(false).toBe(true);
          done();
        });

      });
      //
    });

  });

});