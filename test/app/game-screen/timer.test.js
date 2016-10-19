describe('Component: timer', function() {

  beforeEach(module('mean.directives'));
  beforeEach(module('/views/timer.tpl.html'));

  var element;
  var scope;

  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    element = angular.element('<timer></timer>');
    scope.game = {
      time: 20,
      state:'winner has been chosen'
    };
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('should have a div showing game time', function() {
    var time = element[0].getElementsByClassName('time');
    expect(time).toBeDefined();
    expect(time[0].innerHTML).toEqual('20');
  });

  it('should show different text at different game state', function(){
    var text = element[0].getElementsByClassName('intext');
    expect(text).toBeDefined();
    expect(text.length).toBe(3);
    expect(text[0].innerHTML).toBe(' Time Remaining');
    expect(text[1].innerHTML).toBe(' Next Round In');
    expect(text[2].innerHTML).toBe(' Czar Choosing');
  });

});
