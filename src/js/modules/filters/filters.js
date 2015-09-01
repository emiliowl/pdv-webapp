/**
 * Created by murta on 27/08/15.
 */
(function () {
    'use strict';

    angular.module('naut').filter('yesNo', function () {
        return function (bool) {
            return bool ? 'sim' : 'não';
        }
    });

})();