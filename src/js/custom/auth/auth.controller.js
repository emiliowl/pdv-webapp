(function() {
    'use strict';

    angular.module('naut').controller('AuthController', AuthController);

    /* @ngInject */
    function AuthController(authService, toaster, $state) {
        var self = this;

        self.user = {};

        self.authenticate = function() {
            if (self.user
                && self.user.email && self.user.email !== ''
                && self.user.password && self.user.password !== '') {
                authService.authenticate(self.user, function() {
                    $state.go('app.dashboard');
                });
            } else {
                toaster.error('Aviso', 'Obrigatorio preencher usuario e senha');
            }
        };

        self.createUser = function() {
            if (self.user
                && self.user.email && self.user.email !== ''
                && self.user.password && self.user.password !== ''
                && self.user.password_confirmation && self.user.password_confirmation !== ''
                && self.user.agree && self.user.agree != '') {
                authService.createUser(self.user, function() {
                    $state.go('app.dashboard');
                });
            } else {
                toaster.error('Aviso', 'Obrigatorio preencher usuario, senha e aceitar os termos');
            }
        };
    }
})();
