/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('ProductsCtrl', ProductsCtrl);

    /* @ngInject */
    function ProductsCtrl(SweetAlert, imagesService, productsService, Upload, $scope) {
        var self = this;

        self.products = productsService.products;
        self.selectedProduct = null;
        self.images = null;
        self.status = {uploading: false, fullscreen: false};

        self.new = function() {
            self.selectedProduct = {images: []};
        };

        self.cancel = function() {
            self.selectedProduct = null;
            self.images = null;
            productsService.loadAll();
        };

        self.save = function() {
            if (self.status.uploading) {
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
                    if(product.id && product.id !== '') {
                        productsService.destroy(product, function() {
                            SweetAlert.swal("Sucesso", "Seu registro foi removido", "success");
                            self.cancel();
                        });
                    }
                } else {
                    SweetAlert.swal("Cancelado", "Seu registro não foi removido", "warning");
                }
            });
        };

        self.edit = function(product) {
            productsService.loadAll();
            self.selectedProduct = product;
        };

        self.toggleFullScreen = function() {
            self.status.fullscreen = !self.status.fullscreen;
        };

        self.destroyImage = function(image) {
            imagesService.destroy(image.id, function() {
                productsService.reload(self.selectedProduct);
            });
        };

        $scope.$watch(function(){return self.images}, function() {
            if (!self.images) return;
            self.status.uploading = true;
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
                    imagesService.create('Product', self.selectedProduct.id, data, self.selectedProduct.images, self.status);
                }).error(function (data) {
                    image.status = "Erro";
                    self.status.uploading = false;
                });
            });
        });
    }
})();
