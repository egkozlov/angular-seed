'use strict';


var initialized = false;
// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    "kinvey",
    'ui.bootstrap',
    'myApp.login',
    'myApp.partners',
    'myApp.products',
    'myApp.todos',
    'myApp.insert',
    'myApp.collaterals'
]);

app.constant('kinveyConfig', {
    //apiHostName: 'myHostName',
    //micHostName: 'myMICHostName',
    appKey: 'kid_bJg1ypzual',
    appSecret: 'd5e16c9315274c93920dc14f6ee79f0b'
});

app.run(['$kinvey', '$rootScope', '$location', 'kinveyConfig', function($kinvey, $rootScope, $location, kinveyConfig) {
    $rootScope.$on('$locationChangeStart', function(event, newUrl) {
        if (!initialized) {
            event.preventDefault(); // Stop the location change
            // Initialize Kinvey
            $kinvey.init(kinveyConfig).then(function () {
                initialized = true;
                if($kinvey.getActiveUser()){
                    $location.path('/login');
                }
            }, function (err) {
            });
        }
    });
}]);


app.config(['$routeProvider' , function ($routeProvider) {
    //$stateProvider.state('/', {
    //    url: "",
    //    views: {
    //        "tab1": { templateUrl: "collaterals/collaterals.html" },
    //        "tab2": { templateUrl: "partners/partners.html" },
    //        "tab3": { templateUrl: "tab3.html" }
    //    }
    //});
    //$urlRouterProvider.otherwise('/');
    $routeProvider.otherwise({redirectTo: '/login'});
}]);