(function(){
  'use strict';
  angular.module('cashmate').controller('AdController', AdController);
  AdController.$inject = ['$scope', '$state', 'AdService', '$ionicPopup'];
  function AdController($scope, $state, ads, $ionicPopup) {
    function init_ad() {
      $scope.ad_step = 0;
      $scope.current_answer = 0;
      ads.retrieve().then(function(ad) {
        $scope.ad = ad;
        ad.videoUrl = ad.videoUrl.replace("watch?v=", "embed/").replace("https", "http");
      }, function(e) {
        $ionicPopup.alert({
          title: 'All ads watched!',
          template: "You've watched all ads"
        });
        $state.go('dashboard');
        console.error(e);
      });
    }
    init_ad();

    $scope.nextStep = function() {
      $scope.ad_step++;
      if ($scope.ad_step == 2) {
        ads.answer($scope.ad.id, $scope.ad.question.id, $scope.current_answer)
          .then(function(r) {
            $state.go('win');
          },
          function(e) {
            $state.go('fail');
          });
        init_ad();
      }
    };
    $scope.skip = function() {
      $state.go('dashboard');
    }
  }
})();
