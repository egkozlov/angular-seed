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
            var promise = $kinvey.DataStore.find('todos');
            promise.then(function (entities) {
                $scope.todos = entities;
            }, function (error) {
                console.log("fetch todos error " + JSON.stringify(error));
            });
        };

        $scope.loadTodos();

        $scope.deleteTodo = function (todo, index) {
            var promise = $kinvey.DataStore.destroy('todos', todo._id);
            promise.then(function () {
                $scope.todos = $scope.todos.splice(index, 1);
                console.log("delete with success");
            }, function (err) {
                console.log("delete with error " + JSON.stringify(err));
            });
        }

    }]);