/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('POSController', POSController);

    /* @ngInject */
    function POSController(SweetAlert, posService, $rootScope, $state) {
        var self = this;

        self.posList = posService.posList;
        self.selectedPOS = null;
        self.status = {fullscreen: false};

        self.toggleFullScreen = function() {
            self.status.fullscreen = !self.status.fullscreen;
        };

        self.new = function() {
            self.selectedPOS = {};
        };

        self.cancel = function() {
            self.selectedPOS = null;
            posService.loadAll();
        };

        self.save = function() {
            if(self.selectedPOS.id && self.selectedPOS.id !== '') {
                posService.update(self.selectedPOS);
            } else {
                posService.create(self.selectedPOS);
            }
            self.selectedPOS = null;
        };

        self.destroy = function(pos) {
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
                    if(pos.id && pos.id !== '') {
                        posService.destroy(pos, function() {
                            SweetAlert.swal("Sucesso", "Seu registro foi removido", "success");
                            self.cancel();
                        });
                    }
                } else {
                    SweetAlert.swal("Cancelado", "Seu registro não foi removido", "warning");
                }
            });
        };

        self.edit = function(pos) {
            posService.loadAll();
            self.selectedPOS = pos;
        };

        self.select = function(pos) {
            $rootScope.pos = pos;
            $state.go('app.dashboard');
        };
    };

})();
