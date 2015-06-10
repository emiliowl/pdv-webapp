/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('posService', posService);

    /* @ngInject */
    function posService($rootScope, toaster, $http) {
        var self = this;
        self.posList = [];

        self.loadAll = function() {
            return $http.get($rootScope.app.env.backend + '/point_of_sales.json').success(function (data) {
                angular.copy(data, self.posList);
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

        self.create = function(pos) {
            return $http.post($rootScope.app.env.backend + '/point_of_sales.json', pos).success(function (data) {
                toaster.success('Mensagem', 'Ponto de vendas criado com sucesso!');
                self.loadAll();
            }).error(function (data) {
                var message = "";
                message = message + Object.keys(data.errors)[0];
                message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                toaster.error('Erro', message);
                self.loadAll();
            });
        };

        self.update = function(pos) {
            pos.editing = true;
            return $http.put($rootScope.app.env.backend + '/point_of_sales/' + pos.id + '.json', pos)
                .success(function (data) {
                    pos.editing = false;
                    pos.saved = true;
                    toaster.success('Mensagem', 'Ponto de vendas criado com sucesso!');
                    self.loadAll();
                }).error(function (data) {
                    var message = "";
                    message = message + Object.keys(data.errors)[0];
                    message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                    toaster.error('Erro', message);
                    self.loadAll();
                });
        };

        self.destroy = function(pos) {
            return $http.delete($rootScope.app.env.backend + '/point_of_sales/' + pos.id + '.json')
                .success(function (data) {
                    toaster.success('Mensagem', 'Ponto de vendas removido com sucesso!');
                    self.loadAll();
                }).error(function (data) {
                    var message = "";
                    message = message + Object.keys(data.errors)[0];
                    message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
                    toaster.error('Erro', message);
                    self.loadAll();
                });
        };

        return self;
    }
})();