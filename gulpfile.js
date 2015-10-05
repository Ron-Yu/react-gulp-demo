//  gulp core modules
var gulp = require('gulp');
var config = require('./gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});
var eslint = require('gulp-eslint');

// browserify related modules
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//  browser-sync module
var browserSync = require('browser-sync').create();

// sctipt task
gulp.task('scriptLint', function(){
  log('ESlint and JSCS examination task');
  return gulp
    .src(config.src.js)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.jscs())
    .pipe($.jscsStylish())
    .pipe($.using({
      prefix: 'scriptLint',
      color: 'yellow'
    }));
});

gulp.task('scriptsBundle',['scriptLint'] ,function(){
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
      prefix: 'scriptsBundle',
      color: 'yellow'
    }))
    .pipe(gulp.dest(config.build.js))
    .pipe(browserSync.stream());
});

gulp.task('js-watch', ['scriptsBundle'], browserSync.reload);

//  browser sync task
gulp.task('serve',['scriptsBundle'] ,function() {

    log('browser-sync starts');

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch(config.src.js, ['js-watch']);
});

gulp.task('default', ['serve']);

///////////////////////////////
function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.bgYellow.white(msg[item]));
			}
		}
	}
	else {
		$.util.log($.util.colors.underline.bold.bgYellow(msg));
	}
}
