/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('SellsReportCtrl', SellsReportCtrl);

    /* @ngInject */
    function SellsReportCtrl(SweetAlert, sellsReportService, $scope) {
        var self = this;

        self.sells = sellsReportService.sells;
        self.selectedSell = null;

        self.filter = sellsReportService.filter;
        self.status = {fullscreen: false, start_datepicker_opened: false, end_datepicker_opened: false, total_value: 0};

        self.selectSell = function(sell) {
            self.selectedSell = sell;
        };

        self.openDatepicker = function($event, datepicker_id) {
            $event.preventDefault();
            $event.stopPropagation();

            self.status[datepicker_id + '_datepicker_opened'] = true;
        };

        self.doReport = function() {
            self.selectedSell = null;
            if (!self.filter.start_date || !self.filter.end_date) {
                SweetAlert.swal("Erro", "Obrigatório escolher datas de início, fim", "warning");
                return false;
            }
            sellsReportService.doReport();
        };

        self.calculateTotalValue = function() {
            self.status.total_value = self.sells.reduce(function(previousValue, current) {
                var previousValue = parseFloat(previousValue) + parseFloat(current.value);
                return previousValue;
            }, 0);
        };

        self.toggleFullScreen = function() {
            self.status.fullscreen = !self.status.fullscreen;
        };

        $scope.$watch(function(){return self.sells.toString()}, function() {
            self.calculateTotalValue();
        });
    }
})();
