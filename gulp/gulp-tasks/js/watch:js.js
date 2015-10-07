var gulp = require('gulp');
var config = require('../../gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});

var browserSync = require('browser-sync').create();

gulp.task('watch:js', ['bundle:js'], browserSync.reload);
