/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('storageEntryTypesService', storageEntryTypesService);

    /* @ngInject */
    function storageEntryTypesService($rootScope, toaster, $http) {
        var self = this;
        self.storageEntryTypes = [];

        self.loadAll = function() {
            return $http.get($rootScope.app.env.backend + '/storage_entry_types.json').success(function (data) {
                angular.copy(data, self.storageEntryTypes);
            }).error(self.handleError);
        };

        self.reload = function(storageEntryType) {
            return $http.get($rootScope.app.env.backend + '/storage_entry_types/' + storageEntryType.id + '.json').success(function (data) {
                angular.copy(data, storageEntryType);
            }).error(self.handleError);
        };

        self.create = function(storageEntryType) {
            return $http.post($rootScope.app.env.backend + '/storage_entry_types.json', storageEntryType).success(function (data) {
                toaster.success('Mensagem', 'Tipo de movimentação criado com sucesso!');
                self.loadAll();
            }).error(self.handleError);
        };

        self.update = function(storageEntryType) {
            return $http.put($rootScope.app.env.backend + '/storage_entry_types/' + storageEntryType.id + '.json', storageEntryType)
                .success(function (data) {
                    toaster.success('Mensagem', 'Tipo de movimentação atualizada com sucesso!');
                    self.loadAll();
                }).error(self.handleError);
        };

        self.destroy = function(storageEntryType, onAfterDestroy) {
            return $http.delete($rootScope.app.env.backend + '/storage_entry_types/' + storageEntryType.id + '.json')
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