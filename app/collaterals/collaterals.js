'use strict';

angular.module('myApp.collaterals', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/collaterals', {
            templateUrl: 'collaterals/collaterals.html',
            controller: 'CollateralsCtrl'
        });
    }])

    .controller('CollateralsCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.collaterals = [];

        $scope.loadCollaterals = function(){
            var query = new $kinvey.Query();
            query.equalTo('mimeType','application/pdf');
            var files = new $kinvey.Files(),
                promise = files.find(query);
            promise.then(function(files) {
                $scope.collaterals = files;
                $scope.$digest();
            }).catch(function(err) {
                console.log("fetch collaterals error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadCollaterals();

    }]);