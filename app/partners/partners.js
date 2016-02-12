'use strict';

angular.module('myApp.partners', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/partners', {
            templateUrl: 'partners/partners.html',
            controller: 'PartnersCtrl'
        });
    }])

    .controller('PartnersCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.partners = [];

        $scope.loadPartners = function(query){
            //TODO change find call
            var promise = $kinvey.DataStore.find('partner', query);
            promise.then(function(entities) {
                $scope.partners = entities;
            }, function(err) {
                alert("Error: " + err.description);
                console.log("fetch partners error " + JSON.stringify(err));
            });
        };

        $scope.loadPartners();

    }]);