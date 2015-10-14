var gulpConfig = function() {
  var src = './src/';
  var build = './build/';
  var assets = build + 'assets';

  var config = {
    /**
    *   native files
    */
    src: {
        // customed files
        js: src + 'js/**/*.js',
        template: src + '**/*.jade',
        sass: src + 'sass/application.sass',

        // bundle js file
        collectionJs: src + 'js/collection.js',

        //third party library or framework for sass
        vendor: src + 'sass/vendor'
    },
    /**
    *   build folders
    */
    build: {
        // customed files
        js: build + 'js/',
        css:  build + 'css/',
        html: build,

        //third party
        assets : {
            //library
            lib: assets + 'lib',
            // font
            font: assets + 'font',
            //iamges
            img: assets + 'img',
            //video
            video: assets + 'video'
        }
    }// end build
  };// end config

  return config;
};

module.exports = gulpConfig();
