angular.module('myApp')

    .factory('AuthService', ['$q', '$http', '$window', 'envConfig',
        function ($q, $http, $window, envConfig) {
            var service = this;

            service.checkAuth = function () {
                //console.error('AuthService.checkAuth');
                var deferred = $q.defer();

                var url = envConfig.apiUrl + '/loggedin';
                $http.get(url, {
                    withCredentials: true
                }).success(function (user) {
                    // Authenticated
                    if (user) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject('Need to login');
                    }
                });

                return deferred.promise;
            };

            service.login = function () {
                $window.open(envConfig.apiUrl + '/login');
            };

            service.logout = function () {
                var d = $q.defer();
                $window.open(envConfig.apiUrl + '/logout');
                d.resolve();
                return d.promise;
            };

            return service;
        }
    ]);
