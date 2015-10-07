var gulp = require('gulp');
var config = require('../gulp_config');
var $ = require('gulp-load-plugins')({lazy: true});

module.exports = function log(msg) {
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
