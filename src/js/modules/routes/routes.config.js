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
      $stateProvider.state('app', {
          url: '/app',
          abstract: true,
          templateUrl: Route.base('app.html'),
          resolve: {
            _assets: Route.require('icons', 'toaster', 'animate')
          }
      });
      $stateProvider.state('app.dashboard', {
          url: '/dashboard',
          templateUrl: Route.base('dashboard.html'),
          resolve: {
            assets: Route.require('ngTable', 'ngTableExport')
          }
      });
    }

})();

