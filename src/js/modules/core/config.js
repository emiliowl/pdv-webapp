/**=========================================================
 * Module: CoreConfig
 =========================================================*/
(function () {
  'use strict';

  angular
    .module('naut')
    .config(commonConfig)
    .config(lazyLoadConfig);

  // Common object accessibility
  commonConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 'AuthProvider'];
  function commonConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, AuthProvider) {

    var app = angular.module('naut');
    app.controller = $controllerProvider.register;
    app.directive  = $compileProvider.directive;
    app.filter     = $filterProvider.register;
    app.factory    = $provide.factory;
    app.service    = $provide.service;
    app.constant   = $provide.constant;
    app.value      = $provide.value;

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    //AuthProvider.registerPath('https://careminder.herokuapp.com/users.json');
    //AuthProvider.loginPath('https://careminder.herokuapp.com/users/sign_in.json');
    //AuthProvider.logoutPath('https://careminder.herokuapp.com/users/sign_out.json');

    AuthProvider.registerPath('http://localhost:5000/users.json');
    AuthProvider.loginPath('http://localhost:5000/users/sign_in.json');
    AuthProvider.logoutPath('http://localhost:5000/users/sign_out.json');

    AuthProvider.registerMethod('POST');
    AuthProvider.loginMethod('POST');
    AuthProvider.logoutMethod('DELETE');
  }

  // Lazy load configuration
  lazyLoadConfig.$inject = ['$ocLazyLoadProvider', 'VENDOR_ASSETS'];
  function lazyLoadConfig($ocLazyLoadProvider, VENDOR_ASSETS) {

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: VENDOR_ASSETS.modules
    });

  }

})();


