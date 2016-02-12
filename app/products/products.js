'use strict';

angular.module('myApp.products', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/products', {
            templateUrl: 'products/products.html',
            controller: 'ProductsCtrl'
        });
    }])

    .controller('ProductsCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.partners = [];

        $scope.loadProducts = function(query){
            //TODO change find call
            var promise = $kinvey.DataStore.find('vProducts', query);
            promise.then(function(entities) {
                $scope.products = entities;
            }, function(err) {
                console.log("fetch partners error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadProducts();

        $scope.sortProducts = function(){
            var query = new $kinvey.Query();
            query.descending('productname');
            $scope.loadProducts(query)
        };

        $scope.limitProducts = function(){
            var query = new $kinvey.Query();
            query.limit(4);
            $scope.loadProducts(query)
        };

        $scope.skipProducts = function(){
            var query = new $kinvey.Query();
            query.skip(0);
            query.limit(1);
            $scope.loadProducts(query)
        };

        $scope.deleteProduct = function (product, index) {
            var promise = $kinvey.DataStore.destroy('vProducts', product._id);
            promise.then(function () {
                $scope.products = $scope.products.splice(index, 1);
                console.log("delete with success");
            }, function (err) {
                console.log("delete with error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }

    }]);