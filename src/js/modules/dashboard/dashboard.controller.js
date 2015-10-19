/**=========================================================
 * Module: DashboardController.js
 =========================================================*/

(function() {
    'use strict';

    angular.module('naut').controller('DashboardController', DashboardController);
    /* @ngInject */
    function DashboardController(dashboardService, ngTableParams, $scope) {
        var self = this;
        self.title = 'MS PDV - Simplicidade e eficiência para seu ponto de vendas';
        self.text = '';
        self.status = {start_datepicker_opened: false, end_datepicker_opened: false};
        self.filter = dashboardService.filter;
        self.sales = dashboardService.sales;

        self.openDatepicker = function($event, datepicker_id) {
            $event.preventDefault();
            $event.stopPropagation();

            self.status[datepicker_id + '_datepicker_opened'] = true;
        };

        self.doGroupedSalesReport = dashboardService.doGroupedSalesReport;
    };

})();
