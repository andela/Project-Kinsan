/**
 * Created by cyrielo on 10/11/16.
 */
'use strict';
angular.module('mean.gameChat')
  .factory('GameChat', function () {
    const sessionStoreRef = 'game-sessions',
      membersRef = 'members',
      messagesRef = 'messages';

    var database = firebase.database();
    return {
      sessionExists : function(gameId){
        return new Promise(function(fufill, fail){
          database.ref(sessionStoreRef).once('value')
            .then(function(snapshot){
              if (snapshot.val() == null) {
                fail('Session "'+gameId+'" does not exist');
              }
              fufill(snapshot.val());
            });
        });
      },

      startSession: function (gameId, members) {
        return new Promise(function(fufill, fail){
          //save the gameId
          var session = {};
          session[gameId] = true;
          database.ref(sessionStoreRef).update(session)
          .then(function(){
            //save the members for the session
          database.ref(membersRef + '/' + gameId).set({})
            .then(function(){
              for (var member of members) {
                database.ref(membersRef + '/' + gameId).push(member);
              }
              database.ref(messagesRef + '/' + gameId).set({});
              fufill();
            });
           //
          });
        });
      },

      sendMessage: function (msg, gameId, sender) {
        var date = new Date();
        var timestamp =  date.getTime();
        database.ref(messagesRef + '/'+ gameId).push({
          'sender': sender.name,
          'avatar': sender.avatar,
          'message': msg,
          'timestamp': timestamp
        });
      },

      loadMessages: function(gameId) {
        return new Promise(function(fufill, fail){
          database.ref(messagesRef + '/' + gameId).once('value', function(messages){
            fufill(messages.val());
          });
        });
      },

      listenForMessage : function(gameId,listener){
        database.ref(messagesRef + '/' + gameId).on('value',function (new_message) {
          listener(new_message.val());
        });
      }
    };
  });
