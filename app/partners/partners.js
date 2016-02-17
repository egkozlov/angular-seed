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

        var dataStore = $kinvey.DataStore.getInstance('partner');

        $scope.loadPartners = function(query){
            dataStore.find().then(function (result) {
                $scope.partners = result.cache;
                return result.network;
            },function(err){
                console.log("err " + JSON.stringify(err));
            }).then(function (partners) {
                $scope.partners = partners;
                $scope.$digest();
            });
        };
        $scope.loadPartners();

    }]);