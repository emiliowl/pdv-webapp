/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('salesService', salesService);

    /* @ngInject */
    function salesService($rootScope, toaster, $http, SweetAlert) {
        var self = this;
        self.products = [];

        self.loadAll = function() {
            return $http.get($rootScope.app.env.backend + '/products.json').success(function (data) {
                angular.copy(data, self.products);
            }).error(self.handleError);
        };

        self.reload = function(product) {
            return $http.get($rootScope.app.env.backend + '/products/' + product.id + '.json').success(function (data) {
                angular.copy(data, product);
            }).error(self.handleError);
        };

        self.create = function(sale) {
            return $http.post($rootScope.app.env.backend + '/point_of_sales/' + $rootScope.pos.id + '/sales.json', sale).success(function (data) {
                SweetAlert.swal("Sucesso", "Venda realizada com sucesso!", "success");
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
            SweetAlert.swal("Erro", message, "warning");
        };

        return self;
    }
})();