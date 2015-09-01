/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('StorageEntryTypesCtrl', StorageEntryTypesCtrl);

    /* @ngInject */
    function StorageEntryTypesCtrl(SweetAlert, storageEntryTypesService, $scope) {
        var self = this;

        self.storageEntryTypes = storageEntryTypesService.storageEntryTypes;
        self.selectedStorageEntryType = null;
        self.status = {fullscreen: false};

        self.new = function() {
            self.selectedStorageEntryType = {plus_minus_marker: true, sell_marker: false};
        };

        self.cancel = function() {
            self.selectedStorageEntryType = null;
            storageEntryTypesService.loadAll();
        };

        self.save = function() {
            if(self.selectedStorageEntryType.id && self.selectedStorageEntryType.id !== '') {
                storageEntryTypesService.update(self.selectedStorageEntryType);
            } else {
                storageEntryTypesService.create(self.selectedStorageEntryType);
            }
            self.selectedStorageEntryType = null;
        };

        self.destroy = function(storageEntryType) {
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
                    if(storageEntryType.id && storageEntryType.id !== '') {
                        storageEntryTypesService.destroy(storageEntryType, function() {
                            SweetAlert.swal("Sucesso", "Seu registro foi removido", "success");
                            self.cancel();
                        });
                    }
                } else {
                    SweetAlert.swal("Cancelado", "Seu registro não foi removido", "warning");
                }
            });
        };

        self.edit = function(storageEntryType) {
            storageEntryTypesService.loadAll();
            self.selectedStorageEntryType = storageEntryType;
        };

        self.toggleFullScreen = function() {
            self.status.fullscreen = !self.status.fullscreen;
        };

        $scope.$watch(function() {
            if (!self.selectedStorageEntryType) {
                return false;
            }
            return self.selectedStorageEntryType.sell_marker;
        }, function() {
            if (!self.selectedStorageEntryType) return;
            self.selectedStorageEntryType.plus_minus_marker = !self.selectedStorageEntryType.sell_marker;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.$watch(function() {
            if (!self.selectedStorageEntryType) {
                return false;
            }
            return self.selectedStorageEntryType.plus_minus_marker;
        }, function() {
            if (!self.selectedStorageEntryType) return;
            if (self.selectedStorageEntryType.sell_marker && self.selectedStorageEntryType.plus_minus_marker) {
                self.selectedStorageEntryType.sell_marker = false;
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    }
})();
