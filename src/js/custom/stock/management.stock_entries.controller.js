/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('StockEntriesCtrl', StockEntriesCtrl);

    /* @ngInject */
    function StockEntriesCtrl(SweetAlert, stockEntriesService, productsService) {
        var self = this;

        self.stock_entries = stockEntriesService.stock_entries;
        self.products = productsService.products;
        self.selectedStockEntry = null;
        self.status = {fullscreen: false, datepicker_opened: false};
        self.reasons = ['Produto(s) vencido(s)', 'Compra de mercadorias'];

        self.openDatepicker = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            self.status.datepicker_opened = true;
        };

        self.new = function() {
            self.selectedStockEntry = {};
        };

        self.cancel = function() {
            self.selectedStockEntry = null;
            stockEntriesService.loadAll();
        };

        self.save = function() {
            if(self.selectedStockEntry.id && self.selectedStockEntry.id !== '') {
                stockEntriesService.update(self.selectedStockEntry);
            } else {
                stockEntriesService.create(self.selectedStockEntry);
            }
            self.selectedStockEntry = null;
        };

        self.destroy = function(stock_entry) {
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
                    if(stock_entry.id && stock_entry.id !== '') {
                        stockEntriesService.destroy(stock_entry, function() {
                            SweetAlert.swal("Sucesso", "Seu registro foi removido", "success");
                            self.cancel();
                        });
                    }
                } else {
                    SweetAlert.swal("Cancelado", "Seu registro não foi removido", "warning");
                }
            });
        };

        self.edit = function(stock_entry) {
            stockEntriesService.loadAll();
            self.selectedStockEntry = stock_entry;
        };

        self.toggleFullScreen = function() {
            self.status.fullscreen = !self.status.fullscreen;
        };
    }
})();
