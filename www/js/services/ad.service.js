(function() {
  'use strict';
  angular.module('cashmate')
    .service('AdService', AdService);

  AdService.$inject = ['$http', '$q', 'config'];
  function AdService($http, $q, config) {
    var base_url = config.API_URL + 'ad';
    return {
      retrieve: retrieve
    };

    function retrieve() {
      var defer = $q.defer();
      $http.get(base_url).then(function(r){
        defer.resolve(r.data);
      }, function(e) {
        defer.reject(e);
      });
      return defer.promise;
    }
  }
})();
