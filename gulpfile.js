//  *************************************
//
//  Gulpfile
//
//  *************************************
//
//  Available tasks:
//  'gulp'
//  'gulp list'
//  'gulp lint:js'
//  'gulp bundle:js'
//  'gulp watch:js'
//  'gulp serve'
//
//  *************************************



//  -------------------------------------
//  Modules
//  -------------------------------------
//
//  gulp                    :  The streaming build system
//  gulp-autoprefixer				:  Prefix CSS with Autoprefixer
//  gulp-load-plugins       :  Automatically load Gulp plugins
//  gulp-cached             :  A simple in-memory file cache for gulp
//  gulp-eslint             :  The pluggable linting utility for JavaScript and JSX
//  gulp-jade								:  Compile Jade templates
//  gulp-jscs               :  JS code style linter
//  gulp-jscs-stylish       :  A reporter for the JSCS
//  gulp-plumber            :  Prevent pipe breaking caused by errors from gulp plugins
//  gulp-rucksack						:  A little bag of CSS superpowers
//  gulp-sourcemaps         :  Source map support for Gulp.js
//  gulp-task-listing       :  Task listing for your gulpfile
//  gulp-using              :  Lists all files used
//  gulp-util               :  Utility functions for gulp plugins
//  gulp-sass								:  Something like this will compile your Sass files
//  react                   :  A JavaScript library for building user interfaces
//  reactify                :  Browserify transform for JSX
//  vinyl-buffer            :  Convert streaming vinyl files to use buffers
//  vinyl-source-stream     :  Use conventional text streams at the start
//  babel-eslint            :  Lint ALL valid Babel code with ESlint
//  babelify                :  Babel browserify transform
//  browser-sync            :  Live CSS Reload & Browser Syncing
//  browserify              :  Browser-side require() the node way
//  eslint-config-airbnb    :  Airbnb's ESLint config, following our styleguide
//  eslint-plugin-react     :  React specific linting rules for ESLint
//
// -------------------------------------



//  -------------------------------------
//  Require gulp module
//  -------------------------------------
//
//  gulp core modules
var gulp = require('gulp');
var config = require('./gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});
//
//  browserify related modules
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//
//  browser-sync module
var browserSync = require('browser-sync').create();
//
//  -------------------------------------



//  -------------------------------------
//  Utility function
//  -------------------------------------
//
function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.bgYellow.white(msg[item]));
			}
		}
	}
	else {
		$.util.log($.util.colors.underline.bold.bgBlue(msg));
	}
}
//
//  -------------------------------------


//  -------------------------------------
//  Task: list
//  -------------------------------------
//
gulp.task('list', function() {
  log('list all tasks registered');
  $.taskListing();
});
//
//  -------------------------------------



//  -------------------------------------
//  Task: build
//  -------------------------------------
//
gulp.task('build', ['bundle:js', 'compile:css', 'compile:html']);
//
//  -------------------------------------



//  -------------------------------------
//  Task: lint:js
//  -------------------------------------
//
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
//
//  -------------------------------------



//  -------------------------------------
//  Task: bundle:js
//  -------------------------------------
//
gulp.task('bundle:js',['lint:js'] ,function(){
  log('browserify js bundling task');
  browserify({
        entries: [config.src.collectionJs],
        transform: [babelify],
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
//
//  -------------------------------------



//  -------------------------------------
//  Task: watch:js
//  -------------------------------------
//
gulp.task('watch:js', ['bundle:js'], browserSync.reload);
//
//  -------------------------------------



//  -------------------------------------
//  Task: compile:css
//  -------------------------------------
//
gulp.task('compile:css', function () {
    log('Compiling Sass --> CSS');
    return gulp
        .src(config.src.sass)
				.pipe($.cached('compile:css'))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
				.pipe($.using({
		      prefix: 'compile:css',
		      color: 'yellow'
		    }))
        .pipe($.sass({
          indentedSyntax: true
        }))
				.pipe($.rucksack({
					autoprefixer: true
				}))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build.css))
        .pipe(browserSync.stream())
});
//
//  -------------------------------------



//  -------------------------------------
//  Task: watch:css
//  -------------------------------------
//
gulp.task('watch:css', ['compile:css'], browserSync.reload);
//
//  -------------------------------------



//  -------------------------------------
//  Task: compile:html
//  -------------------------------------
//
gulp.task('compile:html', function () {
  log('Compiling Jade --> HTML');
  return gulp
    .src(config.src.template)
		.pipe($.cached('compile:html'))
    .pipe($.plumber())
		.pipe($.using({
			prefix: 'compile:html',
			color: 'yellow'
		}))
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.build.html))
    .pipe(browserSync.stream())
});
//
//  -------------------------------------



//  -------------------------------------
//  Task: watch:html
//  -------------------------------------
//
gulp.task('watch:html', ['compile:html'], browserSync.reload);
//
//  -------------------------------------



//  -------------------------------------
//  Task: serve
//  -------------------------------------
//
gulp.task('serve',['build'] ,function() {

    log('browser-sync starts');

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch(config.src.js, ['watch:js']);
		gulp.watch(config.src.sass, ['watch:css']);
		gulp.watch(config.src.template, ['watch:html']);
});
//  -------------------------------------



//  -------------------------------------
//  Task: default
//  -------------------------------------
//
gulp.task('default', ['list', 'serve']);
//
//  -------------------------------------
