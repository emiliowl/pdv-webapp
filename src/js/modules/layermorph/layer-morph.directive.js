/**=========================================================
 * Module: LayerMorphDirective.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .directive('btnLayerMorph', btnLayerMorph)
        .directive('layerMorphOverlay', layerMorphOverlay)
        .directive('layerMorphClose', layerMorphClose);
    /* @ngInject */
    function btnLayerMorph(LayerMorph) {

      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var target = $(attrs.target);
          
          if(!target.length) {
            console.log('LayerMorph: Wrong target ' + attrs.target);
            return;
          }

          element.on('click', function() {
            LayerMorph.open( element, target );
          });

        }
      };
    }
    /* @ngInject */
    function layerMorphOverlay(LayerMorph) {

      return {
        restrict: 'C',
        link: function(scope, element, attrs) {
          $(function(){
            LayerMorph.init();
          });
        }
      };
    }

    /* @ngInject */
    function layerMorphClose(LayerMorph) {

      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.on('click', function(){
            LayerMorph.close();
          });
        }
      };
    }

})();
