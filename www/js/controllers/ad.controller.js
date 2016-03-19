(function(){
  'use strict';
  angular.module('cashmate').controller('AdController', AdController);
  AdController.$inject = ['$scope', 'AdService'];
  function AdController($scope, ads) {
    ads.retrieve().then(function(ad) {
      $scope.ad = ad;
      ad.videoUrl = ad.videoUrl.replace("watch?v=", "embed/");
    }, function(e) {
      console.error(e);
    })
  }
})();
