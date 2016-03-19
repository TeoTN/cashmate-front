(function () {
  "use strict";
  angular.module('cashmate')
    .controller("LoginController",
      function ($scope, UserService, $ionicPopup, $state, $http) {
        $scope.data = {};
        $scope.login = function () {
          console.log('noelo');
          UserService.login($scope.data.username, $scope.data.password)
            .then(function (data) {
              console.log(data);
              $state.go('dashboard');
            }).catch(function (errorMsg) {
            $ionicPopup.alert({
              title: 'Login failed!',
              template: errorMsg + 'Please check your credentials!'
            });
          });
        }
      })
})();
