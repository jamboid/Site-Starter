//////////////////
// Dependencies //
//////////////////

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    //sass = require('gulp-ruby-sass'),
    sass = require('gulp-sass'),
    //sasslinter = require('gulp-scss-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    size = require('gulp-filesize'),
    plumber = require('gulp-plumber');

///////////
// Paths //
///////////

var paths = {

  buildRoot: 'build',

  buildDirs: [
    'build/css',
    'build/js',
    'build/img'
  ],
  // CSS Root
  cssRoot: 'build/css',
  // Sass files
  sassFiles: 'src/scss/**/*.scss',
  // 3rd party scripts
  libScripts : 'src/js/libs/*.js',
  // Standalone scripts
  standaloneScripts: 'src/js/libs/single/*.js',
  // Module scripts
  moduleScripts : 'src/js/modules/**/*.js',
  // All scripts (used for watch task)
  processScripts : 'src/js/**/*.js',
  // Root script for manging modules
  rootScript: 'src/js/Site.js',
  // Root directory for compiled JS file
  jsRoot : 'build/js/',
  // Inline images source
  inlineImagesSrc : 'src/img/inline/**/*',
  // Inline images destination
  inlineImagesBuild : 'build/img',
  // CSS images source
  cssImagesSrc: 'src/img/css/**/*',
  // CSS images destination
  cssImagesBuild: 'build/css/img',
  // Fonts source
  fontsSrc: 'src/fonts/**/*',
  // Fonts destination
  fontsBuild: 'build/fonts',
  // Pages source
  pageSource: 'src/pages/*.html'
};

///////////////
// Functions //
///////////////



////////////////
// Sass tasks //
////////////////

// Sass linter task
gulp.task('lint-sass', function() {
  gulp.src(paths.sassFiles)
    .pipe(sasslinter()); //you can set scss-lint parameters
});


// gulp-ruby-sass version
// - this version uses the installed ruby version of sass, so check this is up-to-date

/*
gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    // Plumbers handles errors so 'watch' task isn't stopped
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sass({
      style: 'compact',
      sourcemap: true
    }))
    .pipe(autoprefixer('last 2 versions','> 1%', 'ie 8', 'ie 9'))
    .pipe(gulp.dest(paths.cssRoot))
    .pipe(minifycss())
    .pipe(size())
    .pipe(gulp.dest(paths.cssRoot));
});
*/


// gulp-sass version
// - this uses the libsass implementation and so is missing the most cutting-edge features
gulp.task('styles', function() {
  return gulp.src(paths.sassFiles)
    .pipe(sass({
      style: 'expanded',
      includePaths : ['src/scss/'],
      errLogToConsole: true
    }))
    .pipe(autoprefixer('last 2 versions','> 1%', 'ie 8', 'ie 9'))
    .pipe(minifycss())
    .pipe(size())
    .pipe(gulp.dest(paths.cssRoot));
});


///////////////////////
// Maintenance tasks //
///////////////////////

gulp.task('clean', function () {
  return gulp.src(path.buildDirs, {read: false} )
    .pipe(clean());
});

//////////////////////
// JavaScript tasks //
//////////////////////

// Run JSLint on Module scripts
gulp.task('lintJS', function (callback) {
  return gulp.src([paths.moduleScripts, paths.rootScript])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
  callback(err);
});

// Process JS files with development settings
gulp.task('processJS-development',['lintJS'], function () {
  return gulp.src([paths.libScripts, paths.rootScript, paths.moduleScripts])
  .pipe(concat('Site.min.js'))
  .pipe(gulp.dest(paths.jsRoot))
  .pipe(size());
});

// Process JS files with production settings
gulp.task('processJS-production',['lintJS'], function () {
  return gulp.src([paths.libScripts, paths.rootScript, paths.moduleScripts])
  .pipe(uglify({
    mangle:true
  }))
  .pipe(concat('Site.min.js'))
  .pipe(gulp.dest(paths.jsRoot))
  .pipe(size());
});

// Minify standalone JS library files and copy them to the build/js folder
gulp.task('copyStandaloneScripts', function () {
  return gulp.src(paths.standaloneScripts)
    .pipe(uglify({
      mangle:true
    }))
    .pipe(gulp.dest(paths.jsRoot));
});


// Composite Tasks

// Scripts task for development workflow
gulp.task('scripts-development', ['lintJS','copyStandaloneScripts','processJS-development']);

// Scripts task for production workflow
gulp.task('scripts-production', ['lintJS','copyStandaloneScripts','processJS-production']);

////////////////
// Copy tasks //
////////////////

gulp.task('copyInlineImages', function () {
  return gulp.src(paths.inlineImagesSrc)
    .pipe(gulp.dest(paths.inlineImagesBuild));
});

gulp.task('copyCssImages', function () {
  return gulp.src(paths.cssImagesSrc)
    .pipe(gulp.dest(paths.cssImagesBuild));
});

gulp.task('copyFonts', function () {
  return gulp.src(paths.fontsSrc)
    .pipe(gulp.dest(paths.fontsBuild));
});

gulp.task('copyPages', function () {
  return gulp.src(paths.pageSource)
    .pipe(gulp.dest(paths.buildRoot));
});

// Composite Tasks
gulp.task('copy-files', ['copyInlineImages','copyCssImages','copyFonts', 'copyPages']);

/////////////////
// Clean tasks //
/////////////////

gulp.task('clean', function() {
  return gulp.src(paths.buildRoot, {read: false})
    .pipe(clean());
});

/////////////////
// Watch tasks //
/////////////////

gulp.task('watch', function() {
  gulp.watch(paths.processScripts, ['scripts-development']);
  gulp.watch(paths.sassFiles, ['styles']);
  gulp.watch(paths.pageSource,['copyPages']);
});

/////////////////////
// Top Level tasks //
/////////////////////

// Default gulp task - AKA the top-level Development workflow task
gulp.task('default', ['styles', 'scripts-development','copy-files', 'watch']);

// Production task - AKA the top-level workflow task for creating production-ready code
gulp.task('production', ['styles', 'scripts-production', 'copy-files']);
