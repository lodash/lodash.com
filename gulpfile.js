'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const pump = require('pump');

const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const svgmin = require('gulp-svgmin');
const uglify = require('gulp-uglify');

const cb = e => e && console.log(e);
const base = './';
const opts = { base };

gulp.task('build-css', () =>
  pump([
    gulp.src('_site/assets/css/*.css', opts),
    cssnano(),
    gulp.dest(base)
  ], cb)
);

gulp.task('build-js', () =>
  pump([
    gulp.src('_site/**/*.js', opts),
    babel({ 'presets': ['es2015'] }),
    uglify(),
    gulp.dest(base)
  ], cb)
);

gulp.task('build-svg', () =>
  pump([
    gulp.src('_site/assets/img/*.svg', opts),
    svgmin(),
    gulp.dest(base)
  ], cb)
);

gulp.task('build-html', () =>
  pump([
    gulp.src('_site/**/*.html', opts),
    htmlmin({
      'collapseBooleanAttributes': true,
      'collapseWhitespace': true,
      'removeAttributeQuotes': true,
      'removeComments': true,
      'removeEmptyAttributes': true,
      'removeOptionalTags': true,
      'removeRedundantAttributes': true
    }),
    gulp.dest(base)
  ], cb)
);

gulp.task('build', ['build-css', 'build-js', 'build-svg', 'build-html']);
