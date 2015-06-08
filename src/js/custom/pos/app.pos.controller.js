/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';

    angular.module('naut').controller('POSController', POSController);

    /* @ngInject */
    function POSController(posService, $rootScope, $state) {
        var self = this;

        self.posList = posService.posList;
        self.selectedPOS = null;

        self.new = function() {
            self.selectedPOS = {};
        };

        self.cancel = function() {
            self.selectedPOS = null;
            posService.loadAll();
        };

        self.save = function() {
            if(self.selectedPOS.id && self.selectedPOS.id !== '') {
                posService.update(self.selectedPOS);
            } else {
                posService.create(self.selectedPOS);
            }
            self.selectedPOS = null;
        };

        self.destroy = function(pos) {
            if (window.confirm('Tem Certeza?')) {
                if(pos.id && pos.id !== '') {
                    posService.destroy(pos);
                }
            }
        };

        self.edit = function(pos) {
            posService.loadAll();
            self.selectedPOS = pos;
        };

        self.select = function(pos) {
            $rootScope.pos = pos;
            $state.go('app.dashboard');
        };
    };

})();
