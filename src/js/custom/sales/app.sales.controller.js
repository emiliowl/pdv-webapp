/**
 * Created by murta on 06/08/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('SalesCtrl', SalesCtrl);
    angular.module('naut').controller('SellModalCtrl', SellModalCtrl);

    /* @ngInject */
    function SalesCtrl(SweetAlert, salesService, productsService, $modal) {
        var self = this;

        self.products = productsService.products;
        self.selectedSale = {items: []};
        self.search = {barcode: ''};

        self.new = function() {
            self.selectedSale = {items: []};
        };

        self.cancel = function() {
            self.selectedSale = {items: []};
        };

        self.create = function() {
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

        self.sell = function(product) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'sellDetails.html',
                controller: 'SellModalCtrl as control',
                size: 'md',
                resolve: {
                    items_list: function() {
                        return self.selectedSale.items;
                    },
                    product: function() {
                        return product;
                    }
                }
            });
        };

        self.calculateSellValue = function() {
            return self.selectedSale.items.reduce(function(previousValue, current) {
                return previousValue += (current.product.price * current.quantity);
            }, 0);
        }
    }

    /* @ngInject */
    function SellModalCtrl($modalInstance, items_list, product) {
        var self = this;
        self.quantity = 1;
        self.product = product;

        self.save = function() {
            items_list.push({quantity: self.quantity, product: self.product, product_id: self.product.id});
            $modalInstance.dismiss('cancel');
            $('input#barcode').focus();
        };

        self.close = function () {
            $modalInstance.dismiss('cancel');
            $('input#barcode').focus();
        };
    }
})();
