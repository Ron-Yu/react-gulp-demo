var gulp = require('gulp');
var config = require('../../gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});
var log = require('../log');

gulp.task('lint:js', function(){
  log('ESlint and JSCS examination task');
  return gulp
    .src(config.src.js)
    .pipe($.cached('linting'))
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.jscs())
    .pipe($.jscsStylish())
    .pipe($.using({
      prefix: 'lint:js',
      color: 'yellow'
    }));
});
