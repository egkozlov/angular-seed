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
            console.log("load click");
            var promise = $kinvey.DataStore.find('partners', query);
            promise.then(function(entities) {
                $scope.partners = entities;
            }, function(error) {
                console.log("fetch partners error " + JSON.stringify(error));
            });
        };

        $scope.loadPartners();

        $scope.sortPartners = function(){
            var query = new $kinvey.Query();
            query.descending('partner_name');
            $scope.loadPartners(query)
        };

        $scope.limitPartners = function(){
            var query = new $kinvey.Query();
            query.limit(4);
            $scope.loadPartners(query)
        };

        $scope.skipPartners = function(){
            var query = new $kinvey.Query();
            query.skip(0);
            query.limit(1);
            $scope.loadPartners(query)
        }

    }]);