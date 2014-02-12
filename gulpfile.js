var gulp = require('gulp');

/* Using Gulp-Grunt To Access 'grunt-complexity' */
require('gulp-grunt')(gulp);

var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var plato = require('gulp-plato');

var paths = {
  scripts: ['./assets/javascript/**.js'],
  jade: './assets/jade/**.jade',
  stylus: './assets/stylus/**.stylus'
};

(function setupGulp() {

  'use strict';

  gulp.task('lint', function () {
    gulp.src('./assets/app/**.js', { read: false })
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  gulp.task('templates', function () {
    var YOUR_LOCALS = {};

    gulp.src('./assets/jade/*.jade')
      .pipe(jade({
        locals: YOUR_LOCALS
      }))
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('minify-css', function () {
    gulp.src('./assets/css/*.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint']);
  });

  gulp.task('default', ['lint', 'grunt-complexity']);

})();