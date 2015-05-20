var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    gutil       = require('gulp-util'),
    gulpsync    = require('gulp-sync')(gulp),
    path        = require('path'),
    glob        = require('glob'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    config      = require('./gulp.config')($);

// production mode
var isProduction = false;

//---------------
// TASKS
//---------------

// APP LESS
gulp.task('styles', function() {
    log('Compiling styles from LESS to CSS..');
    return gulp.src(config.less.styles)
        .pipe( isProduction ? gutil.noop() : $.sourcemaps.init())
        .pipe($.less())
        .on("error", handleError)
        .pipe( isProduction ? $.minifyCss() : gutil.noop() )
        .pipe( isProduction ? gutil.noop() : $.sourcemaps.write("./"))
        .pipe(gulp.dest( config.distCSS ));
});

// BOOSTRAP
gulp.task('bootstrap', function() {
    log('Compiling Bootstrap..');
    return gulp.src(config.bootstrap)
        .pipe( isProduction ? gutil.noop() : $.sourcemaps.init())
        .pipe($.less())
        .on("error", handleError)
        .pipe( isProduction ? $.minifyCss() : gutil.noop() )
        .pipe( isProduction ? gutil.noop() : $.sourcemaps.write("./"))
        .pipe(gulp.dest( config.distCSS ));
});

// HTML
gulp.task('markup', ['index', 'views']);
  
gulp.task('views', buildMarkup(config.jade.views, config.dist) );
  
gulp.task('index', ['templatecache'], buildMarkup(config.jade.index, '.', false, true) );

gulp.task('templatecache', ['clean-scripts'], buildMarkup(config.jade.templates, config.dist + 'js', true) );


// SERVER
// ----------------------------------- 

gulp.task('webserver', function() {
  log('Starting web server.. ');
  return gulp.src( config.webserver.webroot )
    .pipe($.webserver( config.webserver ));

});

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
  log('Starting watch with live reload ...');

  $.livereload.listen();

  gulp.watch([config.less.watch, config.less.styles], ['styles']);
  gulp.watch(config.bootstrap, ['bootstrap']);
  gulp.watch(config.jade.all, ['markup']);
  gulp.watch(config.jade.templates, ['templatecache'])

  gulp
    .watch([].concat(config.less.watch, config.jade.views, config.jade.templates, config.js))
    .on('change', function(event) {
      setTimeout(function() {
        $.livereload.changed( event.path );
      }, 1400);
    });

});

/**
 * Clean
 */
gulp.task('clean', ['clean-scripts', 'clean-styles', 'clean-markup']);

gulp.task('clean-scripts', function(cb) {
    var js = config.distJS + '/*{js,map}';
    clean(js, cb);
});

gulp.task('clean-styles', function(cb) {
    var css = config.distCSS + '/*{css,map}';
    clean(css, cb);
});

gulp.task('clean-markup', function(cb) {
    var html = ['index.html', config.dist + 'views/'];
    clean(html, cb);
});


gulp.task('clean-build', function(cb){
  log('Removing development assets');
  var delFiles = [
        config.distJS + '/' + config.tplcache.file,
        config.distCSS + '/bootstrap.css',
        config.distCSS + '/styles.css'
    ];
  clean(delFiles, cb);
});


/**
 * vet the code and create coverage report
 */
gulp.task('lint', function() {
    log('Analyzing source with JSHint');

    return gulp
        .src(config.lintJs)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

//---------------
// Visualizer report
//---------------
gulp.task('plato', function(done) {
    log('Analyzing source with Plato');
    log('Browse to /report/plato/index.html to see Plato results');

    startPlatoVisualizer(done);
});

//---------------
// MAIN TASKS
//---------------

// build for production
gulp.task('build', [], function(cb){
  runSequence('clean', 'production', 'compile', 'clean-build', cb);
});

gulp.task('production', function() { isProduction = true; });

// default (no minify, sourcemaps and watch)
gulp.task('default', function(callback) {
  runSequence('clean', 'compile','watch', 'done', callback);
}).task('done', done);

// serve development by default
gulp.task('serve', function(cb){
  runSequence('default', 'webserver', cb);
});

// optional serve production
gulp.task('serve-build', function(cb){
  runSequence('build', 'webserver', cb);
});

// run tasks without watch
gulp.task('compile',[
          'bootstrap',
          'styles',
          'templatecache',
          'markup'
        ]);


/////////////////

/**
 * Error handler
 */
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

/**
 * Build html templates
 * @param  {string} src           source files folder
 * @param  {string} dst           target folder
 * @param  {boolean} useTplcache  Should generate angular template cache
 * @return {stream}
 */
function buildMarkup(src, dst, useTplcache, useMin) {

  return  function() {
    log('Compiling JADE into HTML...');
    if ( useTplcache ) log('Creating AngularJS templateCache..');

    return gulp.src( src )
        .pipe( isProduction ? gutil.noop() : $.changed(dst, { extension: '.html' }))
        .pipe( $.jade({
            locals: {
              scripts: glob.sync(config.source  + 'js/**/*.js')
            }
          }) )
        .on("error", handleError)
        .pipe($.htmlPrettify(config.prettify))
        // .pipe($.angularHtmlify())
        .pipe(isProduction && useMin ?
            $.usemin( config.usemin )
            : gutil.noop()
          )
        .pipe( useTplcache ? 
            $.angularTemplatecache( config.tplcache.file, config.tplcache.opts )
            : gutil.noop()
          )
        .pipe(gulp.dest( dst ))
        ;
  }
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer(done) {
    log('Running Plato');

    var files = glob.sync(config.plato.js);
    var excludeFiles = /.*\.spec\.js/;
    var plato = require('plato');

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = config.report + 'plato/';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        log(overview.summary);
        if (done) { done(); }
    }
}

/**
 * Just to be polite :)
 */
function done(){
  setTimeout(function(){ // it's more clear to show msg after all
    log('Done.. Watching code and reloading on changes..');
  }, 500);
};


/**
 * Standard log
 */

function log(msg) {
  var prefix = '*** ';
  gutil.log(prefix + msg);
}
