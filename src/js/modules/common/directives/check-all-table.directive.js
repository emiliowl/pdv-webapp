/**=========================================================
 * Module: heckAllTableDirective
 * Allows to use a checkbox to check all the rest in the same
 * columns in a Bootstrap table
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('naut')
        .directive('checkAll', checkAll);
    function checkAll() {
      
      return {
        restrict: 'A',
        controller: controller
      };

      function controller($scope, $element){
        
        $element.on('change', function() {
          var $this = $(this),
              index= $this.index() + 1,
              checkbox = $this.find('input[type="checkbox"]'),
              table = $this.parents('table');
          // Make sure to affect only the correct checkbox column
          table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
            .prop('checked', checkbox[0].checked);

        });
      }
    }

})();
