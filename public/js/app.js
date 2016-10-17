angular.module('mean', ['ngRoute', 'ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.directives', 'services.History', 'mean.gameChat', 'services.Auth'])
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
          otherwise({
            redirectTo: '/'
          });
      }
  ])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.hashPrefix('!');
    }
  ])
    .run(['$rootScope', function($rootScope) {
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
    // Load the facebook SDK asynchronously
      (function(){
      // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) {return;}

      // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];

      // Create a new script element and set its id
        var facebookJS = document.createElement('script'); 
        facebookJS.id = 'facebook-jssdk';

      // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/all.js';

      // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
      }());
    }]).run(['DonationService', function (DonationService) {
      window.userDonationCb = function (donationObject) {
        DonationService.userDonated(donationObject);
      };
    }]);

angular.module('mean.system', []);
angular.module('mean.directives', []);
angular.module('services.History', ['mean.system']);
angular.module('mean.gameChat', ['mean.system']);
angular.module('services.Auth', ['mean.system']);