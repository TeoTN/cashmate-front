(function() {
  'use strict';
  angular.module('cashmate')
    .factory('AdService', AdService);

  AdService.$inject = ['$http', '$q', '$window', 'config'];
  function AdService($http, $q, $window, config) {
    var base_url = config.API_URL + 'ad';
    var store = $window.localStorage;

    return {
      retrieve: retrieve
    };

    function retrieve() {
      var token = store.getItem("token");
      var defer = $q.defer();
      $http.get(base_url + "?token="+token).then(function(r){
        defer.resolve(r.data);
      }, function(e) {
        defer.reject(e);
      });
      return defer.promise;
    }
  }
})();
