/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('financialAccountsService', financialAccountsService);

    /* @ngInject */
    function financialAccountsService($rootScope, toaster, $http) {
        var self = this;
        self.accounts = [];

        self.loadAll = function() {
            return $http.get($rootScope.app.env.backend + '/financial_accounts.json').success(function (data) {
                angular.copy(data, self.accounts);
            }).error(self.handleError);
        };

        self.reload = function(account) {
            return $http.get($rootScope.app.env.backend + '/financial_accounts/' + account.id + '.json').success(function (data) {
                angular.copy(data, account);
            }).error(self.handleError);
        };

        self.create = function(account) {
            return $http.post($rootScope.app.env.backend + '/financial_accounts.json', account).success(function (data) {
                toaster.success('Mensagem', 'Conta financeira criado com sucesso!');
                self.loadAll();
            }).error(self.handleError);
        };

        self.update = function(account) {
            return $http.put($rootScope.app.env.backend + '/financial_accounts/' + account.id + '.json', account)
                .success(function (data) {
                    toaster.success('Mensagem', 'Produto atualizado com sucesso!');
                    self.loadAll();
                }).error(self.handleError);
        };

        self.destroy = function(account, onAfterDestroy) {
            return $http.delete($rootScope.app.env.backend + '/financial_accounts/' + account.id + '.json')
                .success(function (data) {
                    onAfterDestroy();
                }).error(self.handleError);
        };

        self.handleError = function (data) {
            var message = "";
            if (data && data.errors) {
                message = message + Object.keys(data.errors)[0];
                message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
            } else {
                message = "Erro ao comunicar com servidor.";
            }
            toaster.error('Erro', message);
        };

        return self;
    }
})();