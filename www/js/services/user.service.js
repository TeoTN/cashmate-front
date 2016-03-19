  angular
    .module('cashmate')
    .service('UserService', UserService);

  UserService.$inject = ['$http', '$q', '$window', 'config'];

  function UserService($http, $q, $window, config) {
    var base_url = config.API_URL + 'user/';
    var is_authenticated = false;
    var store = $window.localStorage;
    return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      getPoints: getPoints
    };

    function isAuthenticated () {
      is_authenticated = is_authenticated || store.getItem('token');
      return is_authenticated ;
    }

    function getPoints() {
      var token = store.getItem('token');
      var url =  base_url + 'status?token='+token;
      return $http.get(url);
    }

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
        data: data,
        withCredentials: true
      }).then(login_ok, login_fail);

      function login_ok(response) {
        store.setItem("token", response.data.token);
        is_authenticated = true;

        loginDeferred.resolve({
          id: response.data.id,
          points: response.data.points
        });
      }

      function login_fail(error) {
        var fail_msg = "UNABLE TO LOG IN";
        is_authenticated = false;
        console.error(fail_msg, error);
        loginDeferred.reject(fail_msg);
      }

      return loginDeferred.promise;
    }

    function logout() {
      is_authenticated = false;
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
          id: response.data.id,
          points: response.data.points
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
