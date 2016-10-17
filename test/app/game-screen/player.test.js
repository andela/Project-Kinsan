describe('Component: player', function() {

  // Ralph: load the module for the directive
  beforeEach(module('mean.directives'));

  // Ralph: load the template module for user directive
  beforeEach(module('public/views/player.tpl.html'));

  var element;
  var scope;

  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    element = angular.element('<player players=vm.players></player>');
    scope.vm = {
      players: [
        {
          username: 'Rotten tomato',
          points: '2',
          avatar: '/img/chosen/N05.png'
        }
      ]
    };
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should have a div.name with text "Rotten tomato"', function() {
    var div_username = element[0].getElementsByClassName('name');
    expect(div_username[0].innerHTML).toBeDefined();
    expect(div_username[0].innerHTML).toBe('Rotten tomato');
  });

  it('should have a div.score with text 2', function(){
    var div_points = element[0].getElementsByClassName('score');
    expect(div_points[0].innerHTML).toBeDefined();
    expect(div_points[0].innerHTML).toBe('2');
  });

  it('should have a img with ng-src /img/chosen/NO5.png', function(){
    var img_src = element.find('img').attr('ng-src');
    expect(img_src).toBeDefined();
    expect(img_src).toEqual('/img/chosen/N05.png');
  });
});