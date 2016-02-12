'use strict';

angular.module('myApp.todos', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/todos', {
            templateUrl: 'todos/todos.html',
            controller: 'TodoCtrl'
        });
    }])

    .controller('TodoCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.todos = [];

        $scope.loadTodos = function () {
            //TODO change find call
            var promise = $kinvey.DataStore.find('todo');
            promise.then(function (entities) {
                $scope.todos = entities;
            }, function (err) {
                console.log("fetch todos error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };
        $scope.loadTodos();

    }]);