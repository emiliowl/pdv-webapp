/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('productsService', productsService);

    /* @ngInject */
    function productsService($rootScope, toaster, $http) {
        var self = this;
        self.products = [];

        self.loadAll = function() {
            return $http.get($rootScope.app.env.backend + '/products.json').success(function (data) {
                angular.copy(data, self.products);
            }).error(function (data) {
                var message = "";
                if (data && data.errors) {
                    message = message + Object.keys(data.errors)[0];
                    message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                } else {
                    message = "Erro ao comunicar com servidor.";
                }

                toaster.error('Erro', message);
            });
        };

        self.create = function(product) {
            return $http.post($rootScope.app.env.backend + '/products.json', product).success(function (data) {
                toaster.success('Mensagem', 'Produto criado com sucesso!');
                self.loadAll();
            }).error(function (data) {
                var message = "";
                message = message + Object.keys(data.errors)[0];
                message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                toaster.error('Erro', message);
                self.loadAll();
            });
        };

        self.update = function(product) {
            return $http.put($rootScope.app.env.backend + '/products/' + product.id + '.json', product)
                .success(function (data) {
                    toaster.success('Mensagem', 'Produto atualizado com sucesso!');
                    self.loadAll();
                }).error(function (data) {
                    var message = "";
                    message = message + Object.keys(data.errors)[0];
                    message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                    toaster.error('Erro', message);
                    self.loadAll();
                });
        };

        self.destroy = function(product) {
            return $http.delete($rootScope.app.env.backend + '/products/' + product.id + '.json')
                .success(function (data) {
                    toaster.success('Mensagem', 'Produto removido com sucesso!');
                    self.loadAll();
                }).error(function (data) {
                    var message = "";
                    message = message + Object.keys(data.errors)[0];
                    message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                    toaster.error('Erro', message);
                    self.loadAll();
                });
        };

        self.destroyImage = function(imageId) {
            return $http.delete('/rest/image/?imageId='+ imageId)
                .success(function (data) {
                    toaster.success('Mensagem', 'Imagem removida com sucesso!');
                }).error(function (data) {
                    var message = "";
                    if(data.errors) {
                        message = message + Object.keys(data.errors)[0];
                        message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                    } else {
                        message = 'Erro ao comunicar com servidor de imagens.'
                    }
                    toaster.error('Erro', message);
                });
        };

        return self;
    }
})();