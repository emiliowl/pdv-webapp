module.exports = function($) {

  // distribution folder
  var dist = 'app/'; 
  var source = 'src/'; // for abs path construction
  // main source folders
  var srcLESS = source + 'less/';
  var srcJADE = source + 'jade/';
  var srcJS   = source + 'js/';

  // Shared config object
  var config = {
    // ---
    // Paths
    // ---

    dist:    dist,
    distCSS: dist + 'css',
    distJS:  dist + 'js',
    source:  source,
    srcLESS: srcLESS,
    srcJADE: srcJADE,
    srcJS:   srcJS,
    jade: {
      index: [srcJADE + 'index.jade'],
      views: [srcJADE + '**/*.jade', '!'+srcJADE + 'index.jade' ],
      templates: [srcJADE + 'views/cached/*.jade'],
      all: [srcJADE + '**/*.jade']
    },
    less: {
      styles: [srcLESS + 'styles.less'],
      watch: [srcLESS + 'app/**/*.less']
    },
    bootstrap: [srcLESS + 'bootstrap/bootstrap.less'],
    js: [srcJS + 'app.module.js', srcJS + 'modules/**/*.js', srcJS + 'custom/**/*.js'],

    // ---
    // Plugins
    // --- 
    
    plato: {
      js: srcJS + '**/*.js'
    },
    report: './report/',
    tplcache: {
      file: 'templates.js',
      opts: {
        standalone: false,
        root: 'templates',
        module: 'naut'
      }
    },
    webserver: {
      webroot:          '.',
      host:             'localhost',
      port:             '3000',
      livereload:       true,
      directoryListing: false
    },
    prettify: {
      indent_char: ' ',
      indent_size: 3,
      unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
    },
    usemin: {
      path: '.',
      css: [$.minifyCss(), 'concat', $.rev()],
      // html: [$.minifyHtml({empty: true})],
      vendor: [$.uglify( {preserveComments:'some'} ), $.rev()],
      js: [$.ngAnnotate(), $.uglify( {preserveComments:'some'} ), $.rev()]
    }
  };

  // scripts to check with jshint
  config.lintJs =  [].concat(config.js, config.distJS);

  return config;

};

