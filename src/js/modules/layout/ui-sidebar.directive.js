/**=========================================================
 * Module: SidebarDirective
 * Wraps the sidebar. Handles collapsed state and slide
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .directive('uiSidebar', uiSidebar);

    uiSidebar.$inject = ['$rootScope', '$window', '$timeout', 'MEDIA_QUERY'];
    function uiSidebar ($rootScope, $window, $timeout, MEDIA_QUERY) {

      return {
        restrict : 'A',
        link : link
      };

      function link(scope, element) {
        var $win = $($window);
        
        element.on('click', 'a', function (event) {
          var element = $(this);
          element.parent().siblings('.active').toggleClass('active');
          if ( element.next().is('ul') ) {
            element.parent().toggleClass('active');
            event.preventDefault();
          }
        });

        // on mobiles, sidebar starts off-screen
        if ( onMobile() ) $timeout(function(){
          $rootScope.app.sidebar.isOffscreen = true;
        });
        // hide sidebar on route change
        $rootScope.$on('$stateChangeStart', function() {
            if ( onMobile() )
              $rootScope.app.sidebar.isOffscreen = true;
        });

        function onMobile() {
          return $win.width() < MEDIA_QUERY.tablet;
        }

      }
    }
})();

