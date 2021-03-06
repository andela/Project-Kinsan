/* globals document, window */
angular.module('mean', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.directives', 'services.History', 'mean.gameChat', 'services.Auth'])
  .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'views/index.html'
          }).
          when('/app', {
            templateUrl: '/views/app.html',
          }).
          when('/privacy', {
            templateUrl: '/views/privacy.html',
          }).
          when('/bottom', {
            templateUrl: '/views/bottom.html'
          }).
          when('/signin', {
            templateUrl: '/views/signin.html'
          }).
          when('/signup', {
            templateUrl: '/views/signup.html'
          }).
          when('/choose-avatar', {
            templateUrl: '/views/choose-avatar.html'
          }).
          when('/game', {
            templateUrl: '/views/game.tpl.html'
          }).
          when('/history', {
            templateUrl: '/views/history.tpl.html'
          }).
          when('/game', {
            templateUrl: '/views/game.tpl.html'
          }).
          otherwise({
            redirectTo: '/'
          });
      }

  ]).config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.hashPrefix('!');
    }
  ]).run(['$rootScope', function($rootScope) {
    $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase === '$apply' || phase === '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }]).run(['DonationService', function (DonationService) {
      window.userDonationCb = function (donationObject) {
        DonationService.userDonated(donationObject);
      };
  }]);

angular.module('mean.system', []);
angular.module('mean.directives', ['mean.system', 'mean.gameChat']);
angular.module('services.History', ['mean.system']);
angular.module('mean.gameChat', ['mean.system']);
angular.module('services.Auth', ['mean.system']);
