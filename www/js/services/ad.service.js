(function() {
  'use strict';
  angular.module('cashmate')
    .factory('AdService', AdService);

  AdService.$inject = ['$http', '$q', '$window', 'config'];
  function AdService($http, $q, $window, config) {
    var base_url = config.API_URL;
    var store = $window.localStorage;

    return {
      retrieve: retrieve,
      answer: answer
    };

    function retrieve() {
      var token = store.getItem("token");
      var defer = $q.defer();
      var url = base_url + 'ad';
      $http.get(url + "?token="+token).then(function(r){
        defer.resolve(r.data);
      }, function(e) {
        defer.reject(e);
      });
      return defer.promise;
    }

    function answer(ad_id, q_id, ans_id) {
      var token = store.getItem("token");
      var defer = $q.defer();
      var url = base_url + 'ad/' + ad_id + '/answer';
      console.log("ANSWER ID: " + ans_id);
      $http
        .post(url + "?token="+token, { questionId: q_id, answerIds: [ans_id] })
        .then(function(r){
        defer.resolve(r.data);
      }, function(e) {
        defer.reject(e);
      });
      return defer.promise;
    }
  }
})();
