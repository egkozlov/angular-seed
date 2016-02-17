'use strict';

angular.module('myApp.products', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/products', {
            templateUrl: 'products/products.html',
            controller: 'ProductsCtrl'
        });
    }])

    .controller('ProductsCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.products = [];

        var dataStore = $kinvey.DataStore.getInstance('vProducts');

        $scope.loadProducts = function(query){
            dataStore.find(query).then(function (result) {
                $scope.products = result.cache;
                return result.network;
            },function(err){
                console.log("err " + JSON.stringify(err));
            }).then(function (products) {
                $scope.products = products;
                $scope.$digest();
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
            dataStore.removeById(product._id).then(function (res) {
                $scope.products.splice(index, 1);
                $scope.$digest();
            }, function (err) {
                console.log("delete with error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }
    }]);