(function () {
  "use strict";
  angular.module('cashmate')
    .controller("CouponController", CouponController);


  CouponController.$inject = ['$scope', '$location', 'CouponService', '$state'];
  function CouponController($scope, $location, CouponService, $state) {
    var cid = $location.path().substring(1);
    CouponService.retrieve(cid)
      .then(function(response){
        $scope.coupon = response.data;
        console.log(response.data);
      }, function(err) {console.error(err);});
    $scope.useCode = function() {
      console.log('sss');
      var cid2 = cid.split("/")[1];
      console.log(cid2);
      $state.go('code', {cid: cid2});
    }
  }
})();
