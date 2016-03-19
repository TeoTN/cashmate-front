(function() {
  'use strict';
  angular.module('cashmate')
    .factory('AdService', AdService);

  AdService.$inject = ['$http', '$q', '$cookies', 'config'];
  function AdService($http, $q, $cookies, config) {
    var base_url = config.API_URL + 'ad';
    return {
      retrieve: retrieve
    };

    function retrieve() {
      var defer = $q.defer();
      console.log("TOKEN", $cookies.get('token'));
      $http.get(base_url + "?token="+$cookies.get('token')).then(function(r){
        defer.resolve(r.data);
      }, function(e) {
        defer.reject(e);
      });
      return defer.promise;
    }
  }
})();
