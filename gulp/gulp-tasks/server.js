var gulp = require('gulp');
var config = require('../gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});
var log = require('./log');

var browserSync = require('browser-sync').create();

gulp.task('serve', ['bundle:js'], function() {

    log('browser-sync starts');

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch(config.src.js, ['watch:js']);
});
