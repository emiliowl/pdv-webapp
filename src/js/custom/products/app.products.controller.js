/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('ProductsCtrl', ProductsCtrl);

    /* @ngInject */
    function ProductsCtrl(productsService) {
        var self = this;

        self.products = productsService.products;
        self.selectedProduct = null;

        self.new = function() {
            self.selectedProduct = {};
        };

        self.cancel = function() {
            self.selectedProduct = null;
            productsService.loadAll();
        };

        self.save = function() {
            if(self.selectedProduct.id && self.selectedProduct.id !== '') {
                productsService.update(self.selectedProduct);
            } else {
                productsService.create(self.selectedProduct);
            }
            self.selectedProduct = null;
        };

        self.destroy = function(product) {
            if (window.confirm('Tem Certeza?')) {
                if(product.id && product.id !== '') {
                    productsService.destroy(product);
                }
            }
        };

        self.edit = function(product) {
            productsService.loadAll();
            product.price = parseFloat(product.price);
            self.selectedProduct = product;
        };
    };

})();
