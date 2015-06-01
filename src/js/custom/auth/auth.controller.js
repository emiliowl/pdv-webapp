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
                && self.user.password2 && self.user.password2 !== '') {
                authService.createUser(self.user);
            } else {
                toaster.error('Aviso', 'Obrigatorio preencher usuario e senha');
            }
        };
    }
})();
