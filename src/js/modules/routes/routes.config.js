/**=========================================================
 * Module: RoutesConfig.js
 =========================================================*/

(function() {
    'use strict';

    angular.module('naut').config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'RouteProvider'];
    function routesConfig($stateProvider, $urlRouterProvider, Route) {

        // Default route
        $urlRouterProvider.otherwise('/app/pos');

        // Application Routes States
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: Route.base('app.html'),
            resolve: {
                _assets: Route.require('icons', 'toaster', 'animate', 'sparklines', 'slimscroll')
            },
            onEnter: ['$state', 'Auth', 'authService', '$rootScope', function($state, Auth, authService, $rootScope) {
                Auth.currentUser().then(function(user) {
                    if (!$rootScope.pos) {
                        $state.go('app.pos');
                    }
                }, function(error) {
                    $state.go('auth.login');
                });
            }],
            controller: 'AuthController as authCtrl'
        });

        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            templateUrl: Route.base('app.dashboard.html'),
            resolve: {
                assets: Route.require('ngTable', 'ngTableExport')
            }
        });

        $stateProvider.state('app.pos', {
            url: '/pos',
            templateUrl: Route.base('app.pos.html'),
            resolve: {
                assets: Route.require('ngTable', 'ngTableExport')
            },
            controller: 'POSController as ctrl',
            onEnter: ['posService', '$rootScope', function(posService,$rootScope) {
                posService.loadAll();
                $rootScope.pos = null;
            }]
        });

        $stateProvider.state('app.products', {
            url: '/products',
            templateUrl: Route.base('app.products.html'),
            controller: 'ProductsCtrl as ctrl',
            onEnter: ['productsService', function(posService) {
                posService.loadAll();
            }]
        });

        $stateProvider.state('app.sales', {
            url: '/sales',
            templateUrl: Route.base('app.sales.html'),
            resolve: {
                assets: Route.require('flot-chart', 'flot-chart-plugins', 'ui.knob', 'loadGoogleMapsJS', function() {
                    return loadGoogleMaps();
                }, 'ui.map')
            }
        });

        // Single Page Routes
        $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: Route.base('auth.html'),
            resolve: {
                assets: Route.require('icons', 'toaster', 'animate')
            },
            controller: 'AuthController as ctrl'
        });

        $stateProvider.state('auth.login', {
            url: '/login',
            templateUrl: Route.base('auth.login.html'),
        });

        $stateProvider.state('auth.register', {
            url: '/register',
            templateUrl: Route.base('auth.register.html')
        });
    }

})();

