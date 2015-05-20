/**=========================================================
 * Module: RoutesConfig.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'RouteProvider'];
    function routesConfig($stateProvider, $urlRouterProvider, Route) {

      // Default route
      $urlRouterProvider.otherwise('/app/dashboard');

      // Application Routes States
      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: Route.base('app.html'),
          resolve: {
            _assets: Route.require('icons', 'toaster', 'animate')
          }
        })
        .state('app.dashboard', {
          url: '/dashboard',
          templateUrl: Route.base('dashboard.html'),
          resolve: {
            assets: Route.require('ngTable', 'ngTableExport')
          }
        })
      // Layout dock
      .state('app-dock', {
        url: '/dock',
        abstract: true,
        templateUrl: Route.base('app-dock.html'),
        resolve: {
          assets: Route.require('icons', 'toaster', 'animate')
        }
      })
        .state('app-dock.dashboard', {
          url: '/dashboard',
          templateUrl: Route.base('dashboard.html'),
          resolve: {
          }
        })
      // Layout full height
      .state('app-fh', {
        url: '/fh',
        abstract: true,
        templateUrl: Route.base('app-fh.html'),
        resolve: {
          assets: Route.require('icons', 'toaster', 'animate')
        }

      })
        .state('app-fh.columns', {
          url: '/columns',
          templateUrl: Route.base('layout.columns.html')
        });
    }

})();
