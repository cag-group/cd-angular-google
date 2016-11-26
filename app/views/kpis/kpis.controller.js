/**
 * Created by javierplacencio on 31/10/16.
 */
angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/kpis', {
        templateUrl: 'views/kpis/kpis.view.html'
    });
}])

.controller('KpisController', ['$scope', '$http', 'AuthService', 'envConfig',
    function ($scope, $http, AuthService, envConfig) {
        $scope.kpis = [];
        $scope.errorMsg;

        init();

        function init() {
            getKpis();
        }

        function getKpis() {
            var url = envConfig.apiUrl + '/kpis';

            AuthService.checkAuth().then(function () {
                console.log("fetching kpis...");
                $http.get(url, {withCredentials: true}).then(function(response) {
                    console.log("KpisController.getKpis - got response:");
                    console.log(response);
                    $scope.kpis = response.data;
                }, function(err) {
                    console.log("KpisController.getKpis - got error response:");
                    console.log(err);
                });
            }).catch(function (err) {
                $scope.errorMsg = err;
            });
        }
    }
]);
