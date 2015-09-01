/**
 * Created by murta on 06/08/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('SalesCtrl', SalesCtrl);

    /* @ngInject */
    function SalesCtrl(SweetAlert, salesService, posService, $filter) {
        var self = this;

        self.storage = posService.storageList;
        self.selectedItem = null;
        self.selectedSale = {items: []};
        self.search = {barcode: '', quantity: 1};

        self.new = function() {
            self.selectedSale = {items: []};
        };

        self.cancel = function() {
            self.selectedSale = {items: []};
            self.search.quantity = 1;
            self.search.barcode = '';
            self.selectedItem = null;
            $('input#barcode').focus();
        };

        self.finalizeSell = function() {
            if(self.selectedSale != null) {
                salesService.create(self.selectedSale);
            }
            self.cancel();
        };

        self.reverseSale = function(sale) {
            SweetAlert.swal({
                title: "Tem certeza?",
                text: "Esta venda sera estornada afetando estoque e caixa.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, remover registro",
                cancelButtonText: "Não, me tire daqui!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm){
                if (isConfirm) {
                    if(product.id && product.id !== '') {
                        salesService.reverse(sale.id, function() {
                            salesService.reload(self.selectedSale);
                            SweetAlert.swal("Sucesso", "Venda estornada com sucesso.", "success");
                        });
                    }
                } else {
                    SweetAlert.swal("Cancelado", "Sua venda nao foi estornada!", "warning");
                }
            });
        };

        self.sell = function() {
            if (!self.search.quantity || self.search.quantity === "" || parseInt(self.search.quantity) < 1 ) {
                self.search.quantity = 1;
            }
            if (!self.selectedItem || !self.selectedItem.product || self.selectedItem.product === "") {
                SweetAlert.swal("Erro", "Selecione um produto antes de adicionar a venda!", "warning");
                $('input#barcode').focus();
                return false;
            }

            if (parseInt(self.selectedItem.quantity) < parseInt(self.search.quantity)) {
                SweetAlert.swal("Erro", "Quantidade insuficiente para adicionar a venda.", "warning");
                $('input#barcode').focus();
                return false;
            }

            self.selectedSale.items.push({ quantity: self.search.quantity,
                                           product: self.selectedItem.product,
                                           product_id: self.selectedItem.product.id });
            self.search.quantity = 1;
            self.search.barcode = '';
            self.selectedItem = null;
            $('input#barcode').focus();
        };

        self.selectItem = function(item) {
            self.selectedItem = item;
            $('input#quantity').focus();
        };

        self.tryProductSelection = function(event) {
            if(event) {
                if(event.keyCode == 13) {
                    self.doInferProductSelection();
                } else {
                    self.cancelProductSelection();
                }
            } else {
                self.doInferProductSelection();
            }
        };

        self.doInferProductSelection = function() {
            if((!self.selectedItem || self.selectedItem === "")
                && self.search.barcode && self.search.barcode !== "") {
                var filteredItens = $filter('filter')(self.storage, self.search.barcode);
                if (filteredItens) {
                    self.selectItem(filteredItens[0]);
                } else {
                    SweetAlert.swal("Erro", "Selecione um produto!", "warning");
                    $('input#barcode').focus();
                }
            }
        };

        self.cancelProductSelection = function() {
            self.selectedItem = null;
            $('input#barcode').focus();
        };

        self.calculateSellValue = function() {
            return self.selectedSale.items.reduce(function(previousValue, current) {
                return previousValue += (current.product.price * current.quantity);
            }, 0);
        }
    }
})();
