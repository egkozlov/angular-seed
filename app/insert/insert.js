'use strict';

angular.module('myApp.insert', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/insert', {
            templateUrl: 'insert/insert.html',
            controller: 'InsertCtrl'
        });
    }])

    .controller('InsertCtrl', ['$scope','$kinvey','$location', function ($scope, $kinvey, $location) {

        var dataStore = $kinvey.DataStore.getInstance('todo',$kinvey.DataStoreType.Sync);
        $scope.todo = {
            action: "",
            duedate: "",
            completed:false
        };

        $scope.insert = function (todo) {
            var promise = dataStore.save(todo).then(function (entity) {
                alert("Todo was added with success");
                $scope.digest();
                $location.path('/todos');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }
    }]);