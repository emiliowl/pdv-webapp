/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('CashReportCtrl', CashReportCtrl);

    /* @ngInject */
    function CashReportCtrl(SweetAlert, cashReportService, financialAccountsService, $scope) {
        var self = this;

        self.cash_entries = cashReportService.cash_entries;
        self.financial_accounts = financialAccountsService.accounts;
        self.filter = cashReportService.filter;
        self.status = {fullscreen: false, start_datepicker_opened: false, end_datepicker_opened: false, total_value: 0};

        self.openDatepicker = function($event, datepicker_id) {
            $event.preventDefault();
            $event.stopPropagation();

            self.status[datepicker_id + '_datepicker_opened'] = true;
        };

        self.doReport = function() {
            if (!self.filter.start_date || !self.filter.end_date || !self.filter.financial_account) {
                SweetAlert.swal("Erro", "Obrigatório escolher datas de início, fim e conta financeira", "warning");
                return false;
            }
            cashReportService.doReport();
        };

        self.calculateTotalValue = function() {
            self.status.total_value = self.cash_entries.reduce(function(previousValue, current) {
                var previousValue = parseFloat(previousValue) + parseFloat(current.value);
                return previousValue;
            }, 0);
        };

        self.toggleFullScreen = function() {
            self.status.fullscreen = !self.status.fullscreen;
        };

        $scope.$watch(function(){return self.cash_entries.toString()}, function() {
            self.calculateTotalValue();
        });
    }
})();
