var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var minifyHtml = require('gulp-minify-html');
var nib = require('nib');
var clean = require('gulp-clean');

var paths = {
  jade: './assets/jade/**/*.jade',
  htmlDir: './',
  html: './*.html',
  stylus: './assets/stylus/*.styl',
  stylesheetsDir: './stylesheets/',
  stylesheets: './stylesheets/*.css'
};

gulp.task('clean', function () {
  return gulp.src([paths.html], {read: false})
    .pipe(clean());
});

gulp.task('compile-html', ['clean'], function () {
  var LOCALS = {};

  return gulp.src(paths.jade)
    .pipe(jade({
      locals: LOCALS
    }))
    .pipe(gulp.dest(paths.htmlDir));
});

gulp.task('minify-html', ['compile-html'], function() {
  var opts = {comments: false, spare: false};

  gulp.src(paths.html)
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest(paths.htmlDir));
});

gulp.task('compile-css', function () {
  return gulp.src(paths.stylus)
    .pipe(stylus({errors: true, use: [nib()]}))
    .pipe(gulp.dest(paths.stylesheetsDir));
});

// Watch Our Files
gulp.task('watch', function() {
  gulp.watch([paths.jade, paths.stylus], ['compile-html', 'minify-html', 'compile-css']);
});

// Default
gulp.task('default', ['compile-html', 'minify-html', 'compile-css', 'watch']);