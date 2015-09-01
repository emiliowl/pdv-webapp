/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('FinancialAccountsCtrl', FinancialAccountsCtrl);

    /* @ngInject */
    function FinancialAccountsCtrl(SweetAlert, financialAccountsService, $scope) {
        var self = this;

        self.accounts = financialAccountsService.accounts;
        self.selectedAccount = null;

        self.status = {fullscreen: false};

        self.new = function() {
            self.selectedAccount = {};
        };

        self.cancel = function() {
            self.selectedAccount = null;
            financialAccountsService.loadAll();
        };

        self.save = function() {
            if(self.selectedAccount.id && self.selectedAccount.id !== '') {
                financialAccountsService.update(self.selectedAccount);
            } else {
                financialAccountsService.create(self.selectedAccount);
            }
            self.selectedAccount = null;
        };

        self.destroy = function(account) {
            SweetAlert.swal({
                title: "Tem certeza?",
                text: "Seu registro será removido, sem possibilidade de retorno",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, remover registro",
                cancelButtonText: "Não, me tire daqui!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm){
                if (isConfirm) {
                    if(account.id && account.id !== '') {
                        financialAccountsService.destroy(account, function() {
                            SweetAlert.swal("Sucesso", "Seu registro foi removido", "success");
                            self.cancel();
                        });
                    }
                } else {
                    SweetAlert.swal("Cancelado", "Seu registro não foi removido", "warning");
                }
            });
        };

        self.edit = function(account) {
            financialAccountsService.loadAll();
            self.selectedAccount = account;
        };

        self.toggleFullScreen = function() {
            self.status.fullscreen = !self.status.fullscreen;
        };
    }
})();
