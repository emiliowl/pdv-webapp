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

    configDeviseAuthProvider($httpProvider,AuthProvider);
  }


  // functions for doing the configurations
  function configDeviseAuthProvider($httpProvider, AuthProvider) {
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

  // helper methods
  var environmentBackend = function(){
    return {
      '127.0.0.1' : 'http://localhost:5000',
      'lafavoritta-easypos-dev.herokuapp.com' : 'https://api-lafavoritta-easypos-dev.herokuapp.com',
      'lafavoritta-easypos.herokuapp.com' : 'https://api-lafavoritta-easypos.herokuapp.com'
    }[window.location.hostname];
  }

  //CORS CONFIG FOR SENDING X-XSRF-TOKEN
  function readCookie(name) {
    var cookieValue = null;
    document.cookie.split(';').some(function(cookieEntry) {
      var entry = cookieEntry.split('=');
      if(entry[0] === name) {
        cookieValue = decodeURIComponent(entry[1]);
        return false;
      }
      return true;
    });
    return cookieValue;
  }
})();


