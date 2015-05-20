/**
 * Created by murta on 05/05/15.
 */
(function() {
    'use strict';

    angular.module('naut').service('dashboardService', DashBoardService);

    /* @ngInject */
    function DashBoardService($rootScope, $http, Auth, toaster) {
        var self = this;
        self.patients = [];

        self.getAll = function() {
            return $http.get('http://localhost:5000/patients.json').success(function (data) {
                angular.copy(data, self.patients);
            }).error(function (data) {
                toaster.error('Aviso', 'Erro ao conectar com servidor');
            });
        };

        self.authenticate = function() {
            Auth.login({email: 'emilio.murta@msitbrasil.com', password: 'wl0912!!'}).then(function(){
                toaster.success('Mensagem', 'Loguei!');
            }, function(){
                toaster.error('Aviso', 'Erro ao autenticar');
            });
        };

        self.logout = function() {
            Auth.logout().then(function(){
                toaster.success('Mensagem', 'Obrigado pela visita!');
            }, function(){
                toaster.error('Erro', 'Erro ao sair');
            });
        };

        $rootScope.signedIn = Auth.isAuthenticated;
        $rootScope.logout = Auth.logout;
        Auth.currentUser().then(function (user){
            $rootScope.user = user;
        });
        $rootScope.$on('devise:new-registration', function (e, user){
            $rootScope.user = user;
        });
        $rootScope.$on('devise:login', function (e, user){
            $rootScope.user = user;
        });

        $rootScope.$on('devise:logout', function (e, user){
            $rootScope.user = {};
        });
    }
})();