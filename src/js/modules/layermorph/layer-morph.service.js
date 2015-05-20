/**=========================================================
 * Module: LayerMorphService.js
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('naut')
        .service('LayerMorph', LayerMorph);
    /* @ngInject */
    function LayerMorph($window, support) {
        var $win  = $($window),
            $body = $('body'),
            self  = this;
        
        /* jshint -W004*/
        self.init         = init;
        self.ready        = ready;
        self.open         = open;
        self.close        = close;
        self.isActive     = isActive;
        self.isReady      = isReady;
        self.placeLayer   = placeLayer;
        self.attachResize = attachResize;

        ////////////////
        
        function init(){
          // find main elements
          self.container = $('.layer-morph-container');
          self.inner     = $('.layer-morph-inner');
          // attach event to re-position when screen resolution changes
          self.attachResize();
        }

        function ready(callback) {
          if ( support.transition.end ) {
            self.inner.on(support.transition.end, runEndTransition);
          }
          else {
            runEndTransition();
          }

          function runEndTransition() {
            // activate layers container
            self.container.addClass('active');
            // detach event
            self.inner.off(support.transition.end);
            // run user callback
            if(callback) callback();
          }

        }

        function open(element, target) {

          self.currentElement = element;
          // activate current element
          self.currentElement.addClass('active');

          if ( ! self.isActive() ) {
            // place layer coordinate
            self.placeLayer();

            self.ready(function(){
              // activate target
              target.addClass('active');
              self.isReady(true);
            });

            self.isActive(true);
          }
        }

        function close() {
          $('.layer-morph.active').removeClass('active');
          self.container.removeClass('active');
          self.currentElement.removeClass('active');
          self.isReady(false);
          self.isActive(false);
        }

        function isActive(newState){
          // if no param return current state, else set new state
          $body[ (typeof newState === 'undefined') ? 'hasClass' :
            newState ? 'addClass' : 'removeClass']('layer-morph-active');
        }

        function isReady(newState){
          // if no param return current state, else set new state
          $body[ (typeof newState === 'undefined') ? 'hasClass' :
            newState ? 'addClass' : 'removeClass']('layer-morph-ready');
        }

        function placeLayer(){

          var element = self.currentElement;
          if(!element) return;

          var elposition = element.css('position'),
              elOffset = element.offset();
          var $winHeight = $win.height(),
              $winWidth  = $win.width(),
              diameter   = (Math.sqrt( Math.pow($winHeight, 2) + Math.pow($winWidth, 2) ) * 2);

          self.inner.css({
            height: diameter,
            width:  diameter
          });

          elOffset.top = elOffset.top + (element.outerHeight(true)/2) - $win.scrollTop();
          elOffset.left = elOffset.left + (element.outerWidth(true)/2) ;

          self.inner.css('top', (elOffset.top  - self.inner.height()/2) )
                 .css('left', (elOffset.left - self.inner.width()/2));
        }

        function attachResize(){

          $win.resize(function(){
            self.placeLayer();
          });
        }
    }

})();