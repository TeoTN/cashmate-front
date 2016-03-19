(function () {
  "use strict";
  angular.module('cashmate')
    .controller("CouponController", CouponController);


  CouponController.$inject = ['$scope', '$location', 'CouponService'];
  function CouponController($scope, $location, CouponService) {
    var cid = $location.path().substring(1);
    CouponService.retrieve(cid)
      .then(function(response){
        $scope.coupon = response.data;
        console.log(response.data);
      }, function(err) {console.error(err);});

  }
})();
