/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('stockEntriesService', stockEntriesService);

    /* @ngInject */
    function stockEntriesService($rootScope, toaster, $http) {
        var self = this;
        self.stock_entries = [];

        self.loadAll = function() {
            return $http.get($rootScope.app.env.backend
                + '/point_of_sales/'
                + $rootScope.pos.id
                + '/storage/entries.json').success(function (data) {
                angular.copy(data, self.stock_entries);
            }).error(self.handleError);
        };

        self.create = function(stockEntry) {
            var stock_entry_data = {};
            stock_entry_data.id = stockEntry.id;
            stock_entry_data.movement_date = stockEntry.movement_date;
            if(stockEntry.product) {
                stock_entry_data.product_id = stockEntry.product.id;
            }
            if(stockEntry.storageEntryType) {
                stock_entry_data.storage_entry_type_id = stockEntry.storageEntryType.id;
            }
            stock_entry_data.quantity = stockEntry.quantity;
            return $http.post($rootScope.app.env.backend + '/point_of_sales/' + $rootScope.pos.id + '/storage/entries.json', stock_entry_data).success(function (data) {
                toaster.success('Mensagem', 'Entrada de estoque criada com sucesso!');
                self.loadAll();
            }).error(self.handleError);
        };

        self.destroy = function(stock_entry, onAfterDestroy) {
            return $http.delete($rootScope.app.env.backend
                + '/point_of_sales/'
                + $rootScope.pos.id
                + '/storage/entries/'
                + stock_entry.id
                + '.json').success(function (data) {
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