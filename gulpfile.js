var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');

var input = {
	js: './src/tailor.js',
	tests: [
		'./test/**/*.unit.js'
	]
};

var output = {
	dir: './dist'	
};

gulp.task('default', ['build']);

/*
 * This task is used to build Tailor.js
 */
 gulp.task('build', function() {
	return gulp.src(input.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))		// Breaks the build in the event of a JSHint failure.	 
		.pipe(jshint.reporter('fail'))		
	;
 });
 
 gulp.task('test', function() {
	 return gulp.src(input.tests)
	 	.pipe(jasmine()); 
 });