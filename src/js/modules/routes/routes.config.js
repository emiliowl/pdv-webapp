/**=========================================================
 * Module: RoutesConfig.js
 =========================================================*/

(function() {
    'use strict';

    angular.module('naut').config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'RouteProvider'];
    function routesConfig($stateProvider, $urlRouterProvider, Route) {

        // Default route
        $urlRouterProvider.otherwise('/auth/login');

        // Application Routes States
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: Route.base('app.html'),
            resolve: {
                _assets: Route.require('icons', 'toaster', 'animate', 'sparklines', 'slimscroll', 'oitozero.ngSweetAlert')
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

        $stateProvider.state('app.financialAccounts', {
            url: '/pos',
            templateUrl: Route.base('app.financial_accounts.html'),
            controller: 'FinancialAccountsCtrl as ctrl',
            onEnter: ['financialAccountsService', '$rootScope', function(financialAccountsService,$rootScope) {
                financialAccountsService.loadAll();
                $rootScope.pos = null;
            }]
        });

        $stateProvider.state('app.products', {
            url: '/products',
            templateUrl: Route.base('app.products.html'),
            controller: 'ProductsCtrl as ctrl',
            onEnter: ['productsService', function(productsService) {
                productsService.loadAll();
            }]
        });

        $stateProvider.state('app.stock_entry_types', {
            url: '/stock_entry_types',
            templateUrl: Route.base('app.storage_entry_types.html'),
            controller: 'StorageEntryTypesCtrl as ctrl',
            onEnter: ['storageEntryTypesService', function(storageEntryTypesService) {
                storageEntryTypesService.loadAll();
            }]
        });

        $stateProvider.state('app.sales', {
            url: '/sales',
            templateUrl: Route.base('app.sales.html'),
            controller: 'SalesCtrl as ctrl',
            onEnter: ['posService', 'financialAccountsService', function(posService, financialAccountsService) {
                posService.storage();
                financialAccountsService.loadAll();
            }]
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

        // Application Management Routes States
        $stateProvider.state('management', {
            url: '/management',
            abstract: true,
            templateUrl: Route.base('app.html'),
            resolve: {
                _assets: Route.require('icons', 'toaster', 'animate', 'sparklines', 'slimscroll', 'oitozero.ngSweetAlert', 'moment')
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

        $stateProvider.state('management.stock', {
            url: '/stock',
            templateUrl: Route.base('management.stock.html'),
            controller: 'StockEntriesCtrl as ctrl',
            onEnter: ['stockEntriesService', 'productsService', 'storageEntryTypesService', function(stockEntriesService, productsService, storageEntryTypesService) {
                stockEntriesService.loadAll();
                productsService.loadAll();
                storageEntryTypesService.loadAll();
            }],
            resolve: {
                assets: Route.require('ngTable', 'ngTableExport')
            }
        });

        $stateProvider.state('management.cash', {
            url: '/cash',
            templateUrl: Route.base('management.cash.html'),
            controller: 'CashReportCtrl as ctrl',
            onEnter: ['financialAccountsService', function(financialAccountsService) {
                financialAccountsService.loadAll();
            }],
            resolve: {
                assets: Route.require('ngTable', 'ngTableExport')
            }
        });

    }

})();

