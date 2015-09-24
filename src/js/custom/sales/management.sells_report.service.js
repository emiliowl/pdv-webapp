/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('sellsReportService', sellsReportService);

    /* @ngInject */
    function sellsReportService($rootScope, toaster, $http) {
        var self = this;
        self.filter = {start_date: '01/01/2000', end_date: '01/01/2100'};
        self.sells = [];

        ///point_of_sales/1/sales/report.json?start_date=01/01/2000&end_date=01/01/2020
        self.doReport = function() {
            return $http.get($rootScope.app.env.backend
                + '/point_of_sales/'
                + $rootScope.pos.id
                + '/sells/report.json?start_date='
                + self.filter.start_date
                + '&end_date='
                + self.filter.end_date).success(function (data) {
                angular.copy(data, self.sells);
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
            toaster.error('Erro', message);
        };

        return self;
    }
})();