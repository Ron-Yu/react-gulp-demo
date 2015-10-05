var gulp = require('gulp');
var config = require('./gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});
var eslint = require('gulp-eslint');

var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync').create();

// Sctipt Task
gulp.task('scriptLint', function(){
  return gulp
    .src(config.src.js)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.jscs())
    .pipe($.jscsStylish())
    .pipe($.notify("Scripts under ESlint and JSCS examination"));
});

gulp.task('scriptsBundle',['scriptLint'] ,function(){
  browserify({
        entries: ['./src/js/collection.js'],
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
    .pipe(gulp.dest(config.build.js))
    .pipe(browserSync.stream());
});

gulp.task('js-watch', ['scriptsBundle'], browserSync.reload);

gulp.task('serve',['scriptsBundle'] ,function() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch(config.src.js, ['js-watch']);
});

gulp.task('default', ['serve']);
