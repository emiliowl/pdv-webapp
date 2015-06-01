/**
 * Created by murta on 05/05/15.
 */
(function() {
    'use strict';

    angular.module('naut').service('dashboardService', DashBoardService);

    /* @ngInject */
    function DashBoardService($rootScope, $http, Auth, toaster) {
        var self = this;
        self.patients = [];

        self.getAll = function() {
            return $http.get($rootScope.app.env.backend + '/welcome.json').success(function (data) {
                angular.copy(data, self.patients);
            }).error(function (data) {
                toaster.error('Aviso', 'Erro ao conectar com servidor');
            });
        };
    }
})();