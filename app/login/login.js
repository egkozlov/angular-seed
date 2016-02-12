'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$kinvey', '$location', function ($scope, $kinvey, $location) {

        $scope.showLogin = null == $kinvey.getActiveUser();

        $scope.login = function (username, password) {
            console.log("username " + username);
            var promise = $kinvey.User.login(username, password);
            promise.then(function (user) {
                $scope.showLogin = false;
            }, function (err) {
                console.log("login failed " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.micLogin = function () {
            var promise = $kinvey.User.MIC.loginWithAuthorizationCodeLoginPage('http://localhost:8000/app/index.html');
            promise.then(function(user) {
                $scope.showLogin = false;
            }, function(err) {
                console.log("mic login error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.logout = function () {
            var user = $kinvey.getActiveUser();
            if (null !== user) {
                var promise = $kinvey.User.logout();
                promise.then(function () {
                    console.log("logout with success ");
                    $scope.showLogin = true;
                }, function (err) {
                    console.log("logout error " + JSON.stringify(err));
                    alert("Error: " + err.description);
                });
            }
        }
    }]);