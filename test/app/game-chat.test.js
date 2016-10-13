'use strict';
describe('Game chat test', function(){
  beforeEach(
    angular.mock.module('mean.gameChat')
  );

  describe('Test for game chat service', function(){
    // Load HistoryFac, $httpBackend(mocks $http service) and $q service
    beforeEach(inject(function(_HistoryFac_, _$httpBackend_, _$q_){
      HistoryFac = _HistoryFac_;
      $httpBackend = _$httpBackend_;
      $q = _$q_;
    }));
    it('should expect GameChat to be defined', function(){

    })
  });
});


//assert if a game session is active
//test if gameId is defined and exists?
//test if users other than yourself exists in the game sessions
//test if message to send is not empty
//given some sent messages, those exact sent messages should be retrieved by another user as received messages
//messages should persist
//should assert if there are unread messages
