var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var input = {
	js: './src/tailor.js'
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
  
 /*
  * This task is used to create the distributed version of Tailor.js.
  */
 gulp.task('deploy', function() {
	return gulp.src(input.js)
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
		.pipe(uglify())
	;
 });