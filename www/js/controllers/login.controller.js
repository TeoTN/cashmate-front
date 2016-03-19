(function () {
  "use strict";
  angular.module('cashmate')
    .controller("LoginController",
      function ($scope, UserService, $ionicPopup, $state, $cookies) {
        $cookies.put('myFavorite', 'oatmeal');
        $scope.data = {};

        $scope.login = function () {
          UserService.login($scope.data.username, $scope.data.password)
            .then(function (data) {
              console.log(data);
              $state.go('dashboard');
            }).catch(function (errorMsg) {
            $ionicPopup.alert({
              title: 'Login failed!',
              template: errorMsg + '. Please check your credentials!'
            });
          });

          $scope.data = {};
        };

        $scope.go_to_register_page = function () {
          $state.go('register');
        }
      })
})();
