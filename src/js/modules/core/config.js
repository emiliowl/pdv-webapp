/**=========================================================
 * Module: CoreConfig
 =========================================================*/
(function () {
  'use strict';

  angular.module('naut')
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

    AuthProvider.registerPath(environmentBackend()  + '/users.json');
    AuthProvider.loginPath(environmentBackend()     + '/users/sign_in.json');
    AuthProvider.logoutPath(environmentBackend()    + '/users/sign_out.json');

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

  var environmentBackend = function(){
    return {
      'localhost' : 'http://localhost:5000',
      'mspdv-dev.herokuapp.com' : 'http://mspdv-dev-backend.herokuapp.com',
      'mspdv.herokuapp.com' : 'https://mspdv-backend.herokuapp.com'
    }[window.location.hostname];
  }

})();


