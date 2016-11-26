'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});

}]);

app.factory('envConfig', function () {
    var factory = {};

    function endsWith(s, suffix) {
        return s.indexOf(suffix, s.length - suffix.length) !== -1;
    }

    function init() {
        if (endsWith(window.location.host, 'mydomain.com')) {
            factory.apiUrl = 'https://node-uservice.mydomain.com';
            console.log("Environment: stage");
        } else {
            factory.apiUrl = 'http://localhost:9090';
            console.log("Environment: dev");
        }
    }

    init();

    return factory;
});
