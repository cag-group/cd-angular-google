'use strict';

angular.module('myApp')

    .controller('SignController', [ '$scope', '$http', '$q', 'AuthService',
        function ($scope, $http, $q, AuthService) {

            $scope.loggedInAs;

            var checkAuth = AuthService.checkAuth;

            init();

            function init() {
                checkAuth().then(function (user) {
                    $scope.loggedInAs = user;
                }).catch(function (err) {
                    $scope.loggedInAs = undefined;
                });
            }

            $scope.login = AuthService.login;

            $scope.signOut = function () {
                AuthService.logout().then(function (arg) {
                    console.log("logout resolved:");
                    console.log(arg);
                    init();
                    //$scope.loggedInAs = undefined;
                }, function (err) {
                    console.log("SignController.signOut - failed to logout: " + err);
                });
            }

        }]);