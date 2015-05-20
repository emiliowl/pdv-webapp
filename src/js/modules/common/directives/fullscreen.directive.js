/**=========================================================
 * Module: FullscreenDirective
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .directive('toggleFullscreen', toggleFullscreen);
    
    function toggleFullscreen() {

      return {
        restrict: 'A',
        link: link
      };

      function link(scope, element, attrs) {

        if (screenfull.enabled) {

          element.on('click', function (e) {
            e.preventDefault();

            screenfull.toggle();

            // Switch icon indicator
            if(screenfull.isFullscreen)
              $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
            else
              $(this).children('em').removeClass('fa-compress').addClass('fa-expand');
          
          });

        } else {
          element.remove();
        }
      }
    }

})();
