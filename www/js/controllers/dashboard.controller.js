(function () {
  "use strict";
  angular.module('cashmate')
    .controller("DashboardController", function ($scope, $window, $timeout, $state) {
      var store = $window.localStorage;
      $scope.points = store.getItem('points') || null;

      $scope.watchAd = function() {
        $state.go('watchad');
      };
    })
})();
