'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', '$http', 'envConfig', function($scope, $http, envConfig) {

  $scope.getKpis = function() {
    console.log("GET /kpis called");
    try {
      $http.get(envConfig.apiUrl + "/kpis", function (req, res) {
        console.log("OK, response statusCode: " + res.statusCode);
        res.json({message: 'kpis is:' + res.body});
        $scope.statusCode = res.statusCode;
      });
    } catch (e) {
      console.log("Error, e: " + e);
      $scope.statusCode = undefined;
    }
  };

}]);