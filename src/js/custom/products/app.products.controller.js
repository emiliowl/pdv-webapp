/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('ProductsCtrl', ProductsCtrl);

    /* @ngInject */
    function ProductsCtrl(productsService, Upload, $scope) {
        var self = this;

        self.products = productsService.products;
        self.selectedProduct = null;
        self.images = null;

        self.new = function() {
            self.selectedProduct = {};
        };

        self.cancel = function() {
            self.selectedProduct = null;
            self.images = null;
            productsService.loadAll();
        };

        self.save = function() {
            if(self.selectedProduct.id && self.selectedProduct.id !== '') {
                productsService.update(self.selectedProduct);
            } else {
                productsService.create(self.selectedProduct);
            }
            self.selectedProduct = null;
            self.images = null;
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

        self.destroyImage = function(imageId) {
            productsService.destroyImage(imageId);
            self.selectedProduct.public_id = null;
            self.selectedProduct.image = null;
            self.images = null;
        };

        $scope.$watch(function(){return self.images}, function() {
            if (!self.images) return;
            self.images.forEach(function(image) {
                self.upload = Upload.upload({
                    url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
                    fields: {upload_preset: $.cloudinary.config().upload_preset},
                    file: image,
                    withCredentials: false
                }).progress(function(e) {
                    image.progress = Math.round((e.loaded * 100.0) / e.total);
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }
                }).success(function(data, status, headers, config) {
                    image.result = data;
                    if(self.selectedProduct.public_id) {
                        self.destroyImage(self.selectedProduct.public_id);
                    }
                    self.selectedProduct.public_id = data.public_id;
                    self.selectedProduct.image = data.secure_url;
                }).error(function (data) {
                    image.status = "Erro";
                });
            });
        });
    };
})();
