'use strict';

const _ = require('lodash');
const path = require('path');

const gulp = require('gulp');
const babel = require('gulp-babel');
const pump = require('pump');

const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const purify = require('gulp-purifycss');
const responsive = require('gulp-responsive');
const sequence = require('gulp-sequence');
const uglify = require('gulp-uglify');

const base = './';
const cb = e => e && console.log(e.message);
const opts = { base };
const manifest = require('./manifest.json');

/*----------------------------------------------------------------------------*/

gulp.task('build-css', () =>
  pump([
    gulp.src('_site/**/*.css', opts),
    purify(['_site/**/*.html', '_site/assets/**/*.js'], { 'rejected': true }),
    cssnano(),
    gulp.dest(base)
  ])
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

gulp.task('build-icon', () =>
  pump([
    gulp.src('_site/assets/img/lodash.svg'),
    responsive({
      'lodash.svg': _(manifest.icons)
        .reject(['sizes', 'any'])
        .map(icon => {
          const sizes = icon.sizes.split('x');
          return {
            'flatten': true,
            'height': sizes[1],
            'rename': path.basename(icon.src),
            'width': sizes[0]
          };
        })
        .value()
    }),
    imagemin(),
    gulp.dest('_site/icon/')
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
    gulp.src('_site/**/*.svg', opts),
    imagemin(),
    gulp.dest(base)
  ], cb)
);

gulp.task('build', sequence(
  ['build-css', 'build-html', 'build-js', 'build-svg'],
  'build-icon'
));
