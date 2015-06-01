/**=========================================================
 * Module: RoutesConfig.js
 =========================================================*/

(function() {
    'use strict';

    angular.module('naut').config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'RouteProvider'];
    function routesConfig($stateProvider, $urlRouterProvider, Route) {

        // Default route
        $urlRouterProvider.otherwise('/app/dashboard');

        // Application Routes States
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: Route.base('app.html'),
            resolve: {
                _assets: Route.require('icons', 'toaster', 'animate', 'sparklines', 'slimscroll')
            },
            onEnter: ['$state', 'Auth', function($state, Auth) {
                if (!Auth.isAuthenticated()) {
                    $state.go('security.login');
                }
            }]
        });

        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            templateUrl: Route.base('dashboard.html'),
            resolve: {
                assets: Route.require('ngTable', 'ngTableExport')
            }
        });

        $stateProvider.state('app.sales', {
            url: '/sales',
            templateUrl: Route.base('sales.html'),
            resolve: {
                assets: Route.require('flot-chart', 'flot-chart-plugins', 'ui.knob', 'loadGoogleMapsJS', function() {
                    return loadGoogleMaps();
                }, 'ui.map')
            }
        });

        // Single Page Routes
        $stateProvider.state('security', {
            url: '/security',
            templateUrl: Route.base('security.html'),
            resolve: {
                assets: Route.require('icons', 'toaster', 'animate')
            }
        });

        $stateProvider.state('security.login', {
            url: '/login',
            templateUrl: Route.base('security.login.html'),
            controller: 'AuthController as ctrl'
        });

        $stateProvider.state('security.register', {
            url: '/register',
            templateUrl: Route.base('security.register.html'),
            controller: 'AuthController as ctrl'
        });
    }

})();

