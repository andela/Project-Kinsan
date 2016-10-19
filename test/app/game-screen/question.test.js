describe('Component: question', function() {

  beforeEach(module('mean.directives'));


  beforeEach(module('/views/question.tpl.html'));

  var element;
  var scope;
  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    element = angular.element('<question></question>');
    scope.game = {
      curQuestion:{
      },
      players: [
        {
          username: 'Rotten tomato',
          points: '2',
          avatar: '/img/chosen/N05.png'
        },
        {
          username: 'Silver Potato',
          points: '2',
          avatar: '/img/chosen/N05.png'
        }
      ]
    };
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should load question text', function() {
    var quesionText = element[0].getElementsByClassName('text');
    expect(quesionText[0].innerHTML).toBeDefined();
    expect(quesionText[0].innerHTML).toBe('');
  });

  it('should have p tag with the right text', function(){
    var ptext = element[0].getElementsByClassName('ptext');
    expect(ptext).toBeDefined();
    expect(ptext[0].innerHTML).toBe(' Waiting for more players to join game ...');
    expect(ptext[1].innerHTML).toBe('with 2 players');
  });

});
