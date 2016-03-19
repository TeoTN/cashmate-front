  angular
    .module('cashmate')
    .service('CouponService', CouponService);

  CouponService.$inject = ['$http', '$q', '$window', 'config'];

  function CouponService($http, $q, $window, config) {
    var base_url = config.API_URL + 'coupons';
    return {
      listAll: listAll
    };

    function listAll() {
      return $http.get(base_url);
    }

    return regDeferred.promise;
  }
