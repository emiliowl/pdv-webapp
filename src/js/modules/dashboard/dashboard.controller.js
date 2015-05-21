/**=========================================================
 * Module: DashboardController.js
 =========================================================*/

(function() {
    'use strict';

    angular.module('naut').controller('DashboardController', DashboardController);
    /* @ngInject */
    function DashboardController(dashboardService, ngTableParams) {
        var self = this;
        self.patients = dashboardService.patients;
        self.title = 'MS PDV - Simplicidade e eficiencia para seu ponto de vendas';
        self.text = 'This project is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.' +
            'The seed app doesnt do much, just shows how to wire some controllers and views together.';

        self.loadPatients = function() {
            dashboardService.getAll();
        };

        self.authenticate = function() {
            dashboardService.authenticate();
        };

        self.logout = function() {
            dashboardService.logout();
        };

        var data4 = [{name: 'Moroni', age: 50},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 34},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 34},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 34},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 34}];

        self.tableParams4 = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data4.length, // length of data4
            getData: function($defer, params) {
                $defer.resolve(data4.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

    };

})();
