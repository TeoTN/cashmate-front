(function () {
  "use strict";
  angular.module('cashmate')
    .controller("DashboardController", function ($scope, $window, $timeout, $state, UserService, CouponService) {
      var store = $window.localStorage;
      //$scope.points = store.getItem('points') || null;
      UserService.getPoints().then(function(response){
        $scope.points = response.data.points;
      });

      CouponService.listAll()
        .then(
          function(response) {
            $scope.coupons = response.data.coupons;
          },
          function(err) {console.error(err)}
        );

      $scope.watchAd = function() {
        $state.go('watchad');
      };

      $scope.showCoupon = function(cid) {
        $state.go('coupon', {cid: cid});
      }
    })
})();
