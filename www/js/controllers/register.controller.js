(function () {
  "use strict";
  angular.module('cashmate')
    .controller("RegisterController", function ($scope, $state, $ionicPopup, UserService) {
      $scope.data = {};

      $scope.go_to_login_page = function () {
        $state.go('login');
      };

      $scope.register = function () {
        UserService.register($scope.data.username, $scope.data.email, $scope.data.password, $scope.data.password1)
          .then(function (data) {
            console.log(data);
            $state.go('register_confirm');
          }).catch(function (errorMsg) {
          $ionicPopup.alert({
            title: 'Login failed!',
            template: errorMsg + '. Please check your credentials!'
          });
        });
      }
    });
})();

