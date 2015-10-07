var gulp = require('gulp');
var config = require('../../gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});
var log = require('../log');

var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync').create();

gulp.task('bundle:js',['lint:js'] ,function(){
  log('browserify js bundling task');
  browserify({
        entries: [config.src.collectionJs],
        transform: [babelify, reactify],
        extension: ['jsx', 'js'],
        debug: true
    })
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./maps'))
    .pipe($.using({
      prefix: 'bundle:js',
      color: 'yellow'
    }))
    .pipe(gulp.dest(config.build.js))
    .pipe(browserSync.stream());
});
