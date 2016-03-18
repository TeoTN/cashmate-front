(function(){
  angular
    .module('cashmate')
    .service('UserService', UserService);

  UserService.$inject = ['$scope', '$http', '$q', 'config'];

  function UserService($scope, $http, $q, config) {
    var base_url = config.API_URL + 'user/';
    return {
      login: login,
      logout: logout,
      register: register
    };

    function login(login, password) {
      var url = base_url + 'login',
        data = {
          login: login,
          password: password
        },
        loginDeferred = $q.defer();

      $http({
        url: url,
        method: 'POST',
        data: data
      }).then(login_ok, login_fail);

      function login_ok(response) {
        console.log("LOGGED IN");
        loginDeferred.resolve({
          id: response.id,
          points: response.points
        });
      }

      function login_fail(error) {
        var fail_msg = "UNABLE TO LOG IN";
        console.error(fail_msg, error);
        loginDeferred.reject(fail_msg);
      }

      return loginDeferred.promise;
    }

    function logout() {
      var url = base_url + 'logout';
      return $http.get(url);
    }

    function register(login, email, password, password2) {
      var regDeferred = $q.defer(),
        url = base_url + 'register',
        data = {
          login: login,
          password: password,
          email: email
        };

      if (!_validate_password(password, password2)) {
        regDeferred.reject("Passwords don't match");
        return regDeferred.promise;
      }

      $http({
        url: url,
        method: 'POST',
        data: data
      }).then(register_ok, register_fail);

      function register_ok(response) {
        console.log("SIGNED UP SUCCESSFULLY");
        regDeferred.resolve({
          id: response.id,
          points: response.points
        });
      }

      function register_fail(error) {
        var fail_msg = "FAILED TO SIGN UP";
        console.error(fail_msg, error);
        regDeferred.reject(fail_msg);
      }

      return regDeferred.promise;
    }

    function _validate_password(password1, password2) {
      return password1 === password2;
    }
  }
})();
