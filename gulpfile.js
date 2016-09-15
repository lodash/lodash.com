'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const pump = require('pump');
const toIco = require('to-ico');

const pify = require('pify');
const fs = pify(require('fs'));

const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const purify = require('gulp-purifycss');
const responsive = require('gulp-responsive');
const sequence = require('gulp-sequence');
const uglify = require('gulp-uglify');

const base = './';
const cb = e => e && console.log(e.message);
const icons = require('./icons');
const opts = { base };

const optipng = imagemin.optipng({
  'optimizationLevel': 7
});

const svgo = imagemin.svgo({
  'floatPrecision': 1,
  'plugins': [
    { 'removeDimensions': true },
    { 'removeTitle': true }
  ]
});

/*----------------------------------------------------------------------------*/

gulp.task('build-app-icons', () =>
  pump([
    gulp.src(['**/*.{png,svg}', '!node_modules/**/*', '!_site/**/*'], opts),
    responsive(icons, {
      'errorOnEnlargement': false,
      'errorOnUnusedImage': false,
      'silent': true,
      'stats': false,
      'withoutEnlargement': false
    }),
    gulp.dest('_site/icons/')
  ], cb)
);

gulp.task('build-css', () =>
  pump([
    gulp.src('_site/**/*.css', opts),
    purify(['_site/**/*.html', '_site/assets/**/*.js'], { 'rejected': true }),
    cssnano(),
    gulp.dest(base)
  ])
);

gulp.task('build-favicon', () =>
  Promise.all([
    fs.readFile('./icons/favicon-16x16.png'),
    fs.readFile('./_site/icons/favicon-32x32.png'),
    fs.readFile('./_site/icons/favicon-48x48.png')
  ])
  .then(toIco)
  .then(buffer => fs.writeFile('./_site/favicon.ico', buffer))
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

gulp.task('build-js', () =>
  pump([
    gulp.src('_site/**/*.js', opts),
    babel({ 'presets': ['es2015'] }),
    uglify({
      'compress': {
        'collapse_vars': true,
        'negate_iife': false,
        'pure_getters': true,
        'unsafe': true,
        'warnings': false
      }
    }),
    gulp.dest(base)
  ], cb)
);

gulp.task('minify-images', () =>
  pump([
    gulp.src('_site/**/*.{png,svg}', opts),
    imagemin([optipng, svgo]),
    gulp.dest(base)
  ], cb)
);

gulp.task('build', sequence(
  ['build-app-icons', 'build-css', 'build-html', 'build-js'],
  'build-favicon',
  'minify-images'
));
