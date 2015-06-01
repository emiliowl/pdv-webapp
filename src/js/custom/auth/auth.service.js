/**
 * Created by murta on 05/05/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('authService', AuthService);

    /* @ngInject */
    function AuthService($rootScope, Auth, toaster, $http) {
        var self = this;

        self.authenticate = function(user, onAfterLogin) {
            Auth.login({email: user.email, password: user.password}).then(function() {
                toaster.success('Mensagem', 'Bem vindo!');
                if (onAfterLogin) {
                    onAfterLogin();
                }
            }, function() {
                toaster.error('Aviso', 'Erro ao autenticar');
            });
        };

        self.createUser = function(user) {
            return $http.post($rootScope.app.env.backend + '/users.json', {user: user}).success(function (data) {
                toaster.success('Mensagem', 'Usuário criado com sucesso!');
            }).error(function (data) {
                toaster.error('Aviso', 'Erro ao tentar criar usuário');
            });
        };

        self.logout = function(onAfterLogout) {
            Auth.logout().then(function() {
                toaster.success('Mensagem', 'Obrigado pela visita!');
                if(onAfterLogout) {
                    onAfterLogout();
                }
            }, function() {
                toaster.error('Erro', 'Erro ao sair');
            });
        };

        $rootScope.signedIn = Auth.isAuthenticated;
        $rootScope.logout = self.logout;

        Auth.currentUser().then(function (user) {
            $rootScope.user = user;
        });

        $rootScope.$on('devise:new-registration', function (e, user) {
            $rootScope.user = user;
        });
        $rootScope.$on('devise:login', function (e, user) {
            $rootScope.user = user;
        });
        $rootScope.$on('devise:logout', function (e, user) {
            $rootScope.user = {};
        });

        return self;
    }
})();