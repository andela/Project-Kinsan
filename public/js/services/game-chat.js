/**
 * Created by cyrielo on 10/11/16.
 */
'use strict';
angular.module('mean.gameChat')
  .factory('GameChat', function () {
    var config = {
        apiKey: 'AIzaSyAO8Mno98d8V0V0ECnuTxCL4jGIYhHDKDc',
        authDomain: 'project-kinsan.firebaseapp.com',
        databaseURL: 'https://project-kinsan.firebaseio.com',
      },
      firebase = window.firebase;

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }

    var database = firebase.database();
    var gameChat =  {
  
      sessionStoreRef : 'game-sessions',
      membersRef : 'members',
      messagesRef: 'messages',
      isTypingRef : 'isTyping',
  
      sessionExists : function(gameId){
        var that = this;
        return new Promise(function(fufill, fail){
          database.ref(that.sessionStoreRef+'/'+gameId).once('value')
            .then(function(snapshot){
              if (snapshot.val() == null) {
                fail('Session "'+gameId+'" does not exist');
              }
              // var exists = (snapshot.val()[gameId] === true);
              fufill(true);
            });
        });
      },

      startSession: function (gameId, members) {
        var that = this;
        return new Promise(function (fufill, fail) {
          //save the gameId
          var session = {};
          session[gameId] = true;
          database.ref(that.sessionStoreRef).update(session).then(function () {
            //save the members for the session
            database.ref(that.membersRef + '/' + gameId).set({})
            .then(function () {
              var member;
              for (member in members) {
                if (members.hasOwnProperty(member)) {
                  database.ref(that.membersRef + '/' + gameId).push(member);
                }
              }
              database.ref(that.messagesRef + '/' + gameId).set({});
              fufill(true);
            }).catch(function(error){
              fail(error);
            });
          }).catch(function(error){
            fail(error);
          });
        });
      },

      sendMessage: function (msg, gameId, sender) {
        var that = this, timestamp =  Date.parse(new Date()) / 1000;
        return new Promise(function(fufill, fail){
          database.ref(that.messagesRef + '/'+ gameId).push({
            'sender': sender.username || sender.name,
            'avatar': (sender.avatar) ? sender.avatar : 'http://brandonmathis.com/projects/fancy-avatars/demo/images/avatar_male_dark_on_clear_200x200.png',
            'message': msg,
            'timestamp': timestamp
          }).then(function () {
            fufill(true);
          })
          .catch(function(error){
            fail(error);
          });
        });
      },

      loadMessages: function(gameId) {
        var that = this;
        return new Promise(function(fufill, fail){
          database.ref(that.messagesRef + '/' + gameId).once('value', 
            function(messages){
              fufill(messages.val());
            }).catch (function(error) {
              fail(error);
            });
        });
      },

      listenForMessage : function(gameId,listener){
        database.ref(this.messagesRef + '/' + gameId).on('value',
          function (new_message) {
            if (typeof listener === 'function') {
              listener(new_message.val());
            }
          }
        );
      },

      triggerIsTyping : function(gameId, typist){
        var that = this;
        return new Promise(function(fulfill, fail){
          database.ref(that.isTypingRef + '/' + gameId).set(typist)
          .then(function(){
            fulfill(true);
          }).catch(function(error){
            fail(error);
          });
        });
      },

      listenForTyping : function(gameId, listener) {
        database.ref(this.isTypingRef + '/' + gameId).on('value',
          function (typist) {
            listener(typist.val());
          });
      }
    };
    return gameChat;
  });