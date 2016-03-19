(function () {
  "use strict";
  angular.module('cashmate')
    .controller("CodeController", CodeController);


 CodeController.$inject = ['$scope', '$location', 'CodeService', '$interval', 'config', '$http', '$state', '$window'];
  function CodeController($scope, $location, CodeService, $interval, config, $http, $state, $window) {
    var cid = $location.path().substring(1);
    var rcid = cid.split('/')[1];
    var token = $window.localStorage.getItem('token');
    function init() {
      CodeService.retrieve(rcid)
        .then(function (response) {
          $scope.transactionCode = response.data.code;
          $interval(function () {
            $http.get(config.API_URL + 'transaction/' + response.data.id + '?token=' + token).then(
              function (response) {
                console.log(response)
                if (response.data.acceptedByVendor === true) {
                  $http.get(config.API_URL + 'transaction/client/' + response.data.id + '?token=' + token);
                  //init();
                  $state.go('confirmed');
                }
              }, function (error) {
                console.error(error);
              }
            );
          }, 2000);
          console.log(response.data);
        }, function (err) {
          console.error(err);
        });
    }
    init();
  }
})();
