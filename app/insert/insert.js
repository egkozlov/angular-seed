'use strict';

angular.module('myApp.insert', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/insert', {
            templateUrl: 'insert/insert.html',
            controller: 'InsertCtrl'
        });
    }])

    .controller('InsertCtrl', ['$scope','$kinvey','$location', function ($scope, $kinvey, $location) {

        $scope.insert = function(action, date, completed){
            var promise = $kinvey.DataStore.save('todo', {
                action  : action,
                duedate : date,
                completed: completed
            });
            promise.then(function(model) {
                $location.path('/todos');
            }, function(err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }
    }]);