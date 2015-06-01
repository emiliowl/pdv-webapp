/**=========================================================
 * Module: VendorAssetsConstant.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .constant('VENDOR_ASSETS', {
            // jQuery based and standalone scripts
            scripts: {
                'animate':            ['vendor/animate.css/animate.min.css'],
                'icons':              ['vendor/font-awesome/css/font-awesome.min.css',
                                       'vendor/weather-icons/css/weather-icons.min.css',
                                       'vendor/feather/webfont/feather-webfont/feather.css'],
                'sparklines':         ['app/plugins/sparklines/jquery.sparkline.min.js'],
                'slimscroll':         ['vendor/slimscroll/jquery.slimscroll.min.js'],
                'vectormap':          ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                                       'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
                'vectormap-maps':      ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                                        'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
                'loadGoogleMapsJS':   ['app/plugins/gmap/load-google-maps.js'],
                'flot-chart':         ['vendor/jquery-flot/jquery.flot.js'],
                'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                       'vendor/jquery-flot/jquery.flot.resize.js',
                                       'vendor/jquery-flot/jquery.flot.pie.js',
                                       'vendor/jquery-flot/jquery.flot.time.js',
                                       'vendor/jquery-flot/jquery.flot.categories.js',
                                       'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                'jquery-ui':          ['vendor/jquery-ui/jquery-ui.min.js',
                                       'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
                'moment' :            ['vendor/moment/min/moment-with-locales.min.js']
            },
            // Angular modules scripts (name is module name to be injected)
            modules: [
                {name: 'toaster',           files: ['vendor/angularjs-toaster/toaster.js',
                                                    'vendor/angularjs-toaster/toaster.css']},

                {name: 'ui.knob',           files: ['vendor/angular-knob/src/angular-knob.js',
                                                    'vendor/jquery-knob/dist/jquery.knob.min.js']},

                {name: 'ngTable',           files: ['vendor/ng-table/dist/ng-table.min.js',
                                                    'vendor/ng-table/dist/ng-table.min.css']},

                {name: 'ngTableExport',     files: ['vendor/ng-table-export/ng-table-export.js']},
                {name: 'ui.map',            files: ['vendor/angular-ui-map/ui-map.min.js']}
            ]

        });

})();

