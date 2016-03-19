  angular
    .module('cashmate')
    .service('CodeService', CodeService);

  CodeService.$inject = ['$http', '$q', '$window', 'config'];

  function CodeService($http, $q, $window, config) {
    var base_url = config.API_URL + 'transaction/coupon/';
    var store = $window.localStorage;
    var token = store.getItem('token');
    return {
      retrieve:retrieve
    };

    function retrieve(cid) {
      return $http.post( base_url +cid + '?token=' + token);
    }
  }
