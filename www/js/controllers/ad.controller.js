(function(){
  'use strict';
  angular.module('cashmate').controller('AdController', AdController);
  AdController.$inject = ['$scope', '$state', 'AdService'];
  function AdController($scope, $state, ads) {
    $scope.ad_step = 0;
    ads.retrieve().then(function(ad) {
      $scope.ad = ad;
      ad.videoUrl = ad.videoUrl.replace("watch?v=", "embed/").replace("https", "http");
    }, function(e) {
      console.error(JSON.stringify(e));
      console.error(JSON.stringify($cookies, 2));
    });
    $scope.nextStep = function() {
      $scope.ad_step++;
      if ($scope.ad_step == 2) {
        // SEND ANSWER from $scope.answer
      }
    };
    $scope.skip = function() {
      $state.go('dashboard');
    }
  }
})();
