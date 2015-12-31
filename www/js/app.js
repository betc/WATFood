// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.services', {
      url: '/services',
      views: {
        'services-tab' : {
          templateUrl: 'templates/services.html',
          controller: 'ServiceController'
        }
      }
    })
    .state('tabs.week', {
      url: '/week',
      views: {
        'week-tab' : {
          templateUrl: 'templates/week.html',
          controller: 'WeekController'
        }
      }
    });

    $urlRouterProvider.otherwise('/tab/services');
})

.controller('ServiceController', ['$scope', '$http', '$state', function($scope, $http, $state){
  $http.get('https://api.uwaterloo.ca/v2/foodservices/locations.json?key=' + secret.key).success(function(data) {
    $scope.outlets = data.data;
  });

  // Utilities
  $scope.getName = function(str) {
    return str.split(' - ')[0];
  }

  $scope.getLocation = function(str) {
      return str.split(' - ')[1];
  }
}])

.controller('WeekController', ['$scope', '$http', '$state', function($scope, $http, $state){
  // Currently there are no open food services so I'm using a past menu for testing purposes.
  $http.get('https://api.uwaterloo.ca/v2/foodservices/2013/12/menu.json?key=' + secret.key).success(function(data) {
    $scope.weekOutlets = data.data.outlets;
  });

  $scope.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// According styling based on Ionic template: http://codepen.io/ionic/pen/uJkCz
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };

  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

}]);