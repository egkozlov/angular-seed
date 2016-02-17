'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$kinvey', '$location', function ($scope, $kinvey, $location) {
        $kinvey.User.getActive().then(function(user){
            console.log(JSON.stringify(user));
            if(user){
                console.log("check");
                $scope.showLogin = false;
            }else{
                $scope.showLogin = true;
            }
        });
        //console.log("user " + JSON.stringify(user));

        $scope.login = function (username, password) {
            console.log("username " + username);
            var promise = $kinvey.User.login(username, password);
            promise.then(function (user) {
                if (user.statusCode && user.statusCode > 400) {
                    console.log("login error " + JSON.stringify(user))
                } else {
                    $scope.showLogin = false;
                    console.log("success " + JSON.stringify(user));
                }
                $scope.$digest();
            }, function (err) {
                console.log("err " + JSON.stringify(err));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
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
            $kinvey.User.getActive().then(function(user){
                if (null !== user) {
                    var promise = user.logout();
                    promise.then(function () {
                        console.log("logout with success ");
                        $scope.showLogin = true;
                        $scope.$digest();
                    }, function (err) {
                        console.log("logout error " + JSON.stringify(err));
                        alert("Error: " + err.description);
                    });
                }
            },function(err){
                console.log("logout error " + JSON.stringify(err));
            });
        }
    }]);