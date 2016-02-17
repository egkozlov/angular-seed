'use strict';

angular.module('myApp.insert', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/insert', {
            templateUrl: 'insert/insert.html',
            controller: 'InsertCtrl'
        });
    }])

    .controller('InsertCtrl', ['$scope','$kinvey','$location', function ($scope, $kinvey, $location) {

        var dataStore = $kinvey.DataStore.getInstance('todo');

        $scope.insert = function(action, date, completed){
            var promise = dataStore.save({
                action  : action,
                duedate : date,
                completed: completed
            }).then(function(entity) {
                $location.path('/todos');
            }, function(error) {
                console.log("error " + JSON.stringify(error));
                alert("Error: " + error.description);
            });
        }
    }]);