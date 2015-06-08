/**=========================================================
 * Module: DashboardController.js
 =========================================================*/

(function() {
    'use strict';

    angular.module('naut').controller('DashboardController', DashboardController);
    /* @ngInject */
    function DashboardController(dashboardService, ngTableParams, $rootScope, $state) {
        var self = this;
        self.patients = dashboardService.patients;
        self.title = 'MS PDV - Simplicidade e eficiência para seu ponto de vendas';
        self.text = '';

        var salesData = [{date: new Date(2015,5,2), value: 101},
                         {date: new Date(2015,5,3), value: 98},
                         {date: new Date(2015,5,4), value: 120},
                         {date: new Date(2015,5,5), value: 190},
                         {date: new Date(2015,5,6), value: 10},
                         {date: new Date(2015,5,7), value: 900},
                         {date: new Date(2015,5,8), value: 1010}];

        self.sales = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: salesData.length,
            getData: function($defer, params) {
                $defer.resolve(salesData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

    };

})();
