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

        var dataStore = $kinvey.DataStore.getInstance('todo');

        $scope.loadTodos = function () {
            dataStore.find().then(function (result) {
                $scope.todos = result.cache;
                return result.network;
            },function(err){
                console.log("err " + JSON.stringify(err));
            }).then(function (todos) {
                $scope.todos = todos;
                $scope.$digest();
            });
        };
        $scope.loadTodos();

    }]);