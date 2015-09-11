/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('cashReportService', cashReportService);

    /* @ngInject */
    function cashReportService($rootScope, toaster, $http) {
        var self = this;
        self.filter = {start_date: '01/01/2000', end_date: '01/01/2100', financial_account: null};
        self.cash_entries = [];

        //financial_accounts/1/cash_report.json?start_date=01/09/2015&end_date=03/09/2015
        self.doReport = function() {
            return $http.get($rootScope.app.env.backend
                + '/financial_accounts/'
                + self.filter.financial_account.id
                + '/cash_report.json?start_date='
                + self.filter.start_date
                + '&end_date='
                + self.filter.end_date
                + '&point_of_sale_id='
                + $rootScope.pos.id).success(function (data) {
                angular.copy(data, self.cash_entries);
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