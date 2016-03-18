(function () {
  "use strict";
  angular.module('cashmate')
    .controller("LoginController",
      function ($scope, UserService, $ionicPopup, $state) {
        $scope.data = {};

        $scope.login = function () {
          console.log('noelo');
          UserService.login($scope.data.username, $scope.data.password)
            .then(function () {
              $state.go('dashboard');
            }).catch(function () {
            $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
            });
          });
        }
      })
})();
