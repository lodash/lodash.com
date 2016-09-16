'use strict';

const globby = require('globby');
const gulp = require('gulp');
const pump = require('pump');
const toIco = require('to-ico');

const pify = require('pify');
const fs = pify(require('fs'));

const babel = require('gulp-babel');
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

gulp.task('build-css', ['minify-css']);

gulp.task('build-favicon', () =>
  globby('_site/icons/favicon-*.png')
    .then(files => Promise.all(files.map(file => fs.readFile(file))))
    .then(toIco)
    .then(buffer => fs.writeFile('_site/favicon.ico', buffer))
);

gulp.task('build-html', ['minify-html']);

gulp.task('build-images', sequence('build-app-icons', 'build-favicon', 'minify-images'));

gulp.task('build-js', ['minify-js', 'minify-sw']);

/*----------------------------------------------------------------------------*/

gulp.task('minify-css', () =>
  pump([
    gulp.src('_site/**/*.css', opts),
    purify(['_site/**/*.html', '_site/assets/**/*.js'], { 'rejected': true }),
    cssnano(),
    gulp.dest(base)
  ])
);

gulp.task('minify-html', () =>
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

gulp.task('minify-images', () =>
  pump([
    gulp.src('_site/**/*.{png,svg}', opts),
    imagemin([optipng, svgo]),
    gulp.dest(base)
  ], cb)
);

gulp.task('minify-js', () =>
  pump([
    gulp.src(['_site/**/*.js', '!_site/sw.js'], opts),
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

gulp.task('minify-sw', () =>
  pump([
    gulp.src('_site/sw.js', opts),
    babel({ 'comments': false, 'presets': ['babili'] }),
    gulp.dest(base)
  ], cb)
);

/*----------------------------------------------------------------------------*/

gulp.task('build', ['build-css', 'build-html', 'build-images', 'build-js']);
