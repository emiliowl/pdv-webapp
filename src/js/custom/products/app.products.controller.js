/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('ProductsCtrl', ProductsCtrl);

    /* @ngInject */
    function ProductsCtrl(imagesService, productsService, Upload, $scope) {
        var self = this;

        self.products = productsService.products;
        self.selectedProduct = null;
        self.images = null;
        self.uploading = {status: false};

        self.new = function() {
            self.selectedProduct = {images: []};
        };

        self.cancel = function() {
            self.selectedProduct = null;
            self.images = null;
            productsService.loadAll();
        };

        self.save = function() {
            if (self.uploading.status) {
                alert('upload em andamento, aguarde...');
                return false;
            }
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
            //product.price = parseFloat(product.price);
            self.selectedProduct = product;
        };

        self.destroyImage = function(imageId) {
            imagesService.destroy(imageId);
            productsService.loadAll();
        };

        $scope.$watch(function(){return self.images}, function() {
            self.uploading.status = true;
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
                    imagesService.create('Product', self.selectedProduct.id, data, self.selectedProduct.images, self.uploading);
                }).error(function (data) {
                    image.status = "Erro";
                    self.uploading.status = false;
                });
            });
        });
    }
})();
