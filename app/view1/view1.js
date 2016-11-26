'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', '$http', function($scope, $http) {

  $scope.getPrivateInfo = function() {
    console.log("getPrivateInfo called");
    try {
      $http.get("http://localhost:8080/privateinfo", function (req, res) {
        console.log("OK, response statusCode: " + res.statusCode);
        res.json({message: 'privateInfo is:' + res.body});
        $scope.statusCode = res.statusCode;
        $scope.privateInfo = res.body;
      });
    } catch (e) {
      console.log("Error, response statusCode: " + res.statusCode);
      $scope.statusCode = res.statusCode;
      $scope.privateInfo = undefined;
    }
  };

}]);