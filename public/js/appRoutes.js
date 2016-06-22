// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // donator list page
        .when('/donators', {
            templateUrl: 'views/donators.html',
            controller: 'DoadorController'
        })

        // donations list page
        .when('/donations', {
            templateUrl: 'views/donations.html',
            controller: 'DoadorController'
        });

    $locationProvider.html5Mode(true);

}]);
