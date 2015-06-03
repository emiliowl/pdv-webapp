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
    configCORSToken(app, $httpProvider);
  }

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

  function configCORSToken(app, $httpProvider) {
    app.factory('XSRFInterceptor', function() {
      var XSRFInterceptor = {
        request: function(config) {
          var token = readCookie('XSRF-TOKEN');
          if (token) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
          }
          return config;
        }
      };
      return XSRFInterceptor;
    });
    $httpProvider.interceptors.push('XSRFInterceptor');
  }

  //CORS CONFIG FOR SENDING X-XSRF-TOKEN
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
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


