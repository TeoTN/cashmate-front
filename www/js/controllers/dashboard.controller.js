(function () {
  "use strict";
  angular.module('cashmate')
    .controller("DashboardController", function ($scope, $state) {
      $scope.watchAd = function() {
        $state.go('watchad');
      };
    })
})();
