// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cashmate', ['ionic', 'ngCookies'])

  .run(function ($ionicPlatform, $rootScope, $state, UserService) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      $rootScope.$on("$stateChangeStart", function (event, toState) {
        if (toState.authenticate && !UserService.isAuthenticated()) {
          $state.transitionTo("login");
          event.preventDefault();
        }
      });
    });
  })
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*://www.youtube.com/**'
    ]);
  })
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        authenticate: false

      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterController',
        authenticate: false
      })
      .state('register_confirm', {
        url: '/register_confirm',
        templateUrl: 'views/register_confirm.html',
        controller: 'RegisterController',
        authenticate: false
      })
      .state('intro', {
        url: '/intro',
        templateUrl: 'views/intro/intro.html',
        controller: 'IntroController'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        authenticate: true
      })
      .state('coupon', {
        url: '/coupon',
        templateUrl: 'views/coupon.html',
        authenticate: true
      })
      .state('watchad', {
        url: '/ad',
        templateUrl: 'views/ad.html',
        authenticate: true,
        controller: 'AdController'
      })
      .state('win', {
        url: '/win',
        templateUrl: 'views/win.html',
        authenticate: true,
        controller: function($scope, $state) {
          $scope.nextStep = function() { $state.go('dashboard'); };
        }
      })
      .state('fail', {
        url: '/fail',
        templateUrl: 'views/fail.html',
        authenticate: true,
        controller: function($scope, $state) {
          $scope.nextStep = function() { $state.go('dashboard'); };
        }
      });

    $urlRouterProvider.otherwise('/login')
  });

