'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$kinvey', '$location', function ($scope, $kinvey, $location) {
        $kinvey.User.getActiveUser().then(function (user) {
            if (user) {
                $scope.showLogin = false;
            } else {
                $scope.showLogin = true;
            }
        });

        $scope.login = function (username, password) {
            var user = new $kinvey.User();
            var promise = user.login(username, password);
            promise.then(function (user) {
                $scope.showLogin = false;
                $scope.$digest();
            }, function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.micLogin = function () {
            var user = new $kinvey.User();
            var promise = user.loginWithMIC('http://localhost:8000/app/index.html');
            promise.then(function (user) {
                $scope.showLogin = false;
            }, function (err) {
                console.log("mic login error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.logout = function () {
            $kinvey.User.logout().then(function () {
                console.log("logout with success ");
                $scope.showLogin = true;
                $scope.$digest();
            }, function (err) {
                console.log("logout error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });

        }
    }]);