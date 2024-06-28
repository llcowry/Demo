'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let src = process.cwd() + '/src';
let dist = process.cwd() + '/dist';

// jshint
gulp.task('jshint', () => {
  let jshint = require('gulp-jshint');
  let stylish = require('jshint-stylish');
  return gulp.src(['!' + src + '/scripts/lib/**/*.js', src + '/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// clean dist
gulp.task('clean', ['jshint'], () => {
  let rimraf = require('gulp-rimraf');
  return gulp.src(dist, { read: true })
    .pipe(rimraf());
});

// webpack
gulp.task('webpack', ['clean'], (done) => {
  let webpack = require('webpack');
  let webpackConf = require('./config/webpack-default');
  webpack(webpackConf, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    done();
  });
});

// build css
gulp.task('build-css', function() {
  // let cssmin = require('gulp-minify-css');
  return gulp.src(src + '/styles/**/*.css')
    // .pipe(cssmin())
    .pipe(gulp.dest(dist + '/styles'));
});

// build html
gulp.task('build-html', function() {
  // let replace = require('gulp-replace');
  let htmlmin = require('gulp-htmlmin');
  return gulp.src(dist + '/*.html')
    .pipe(htmlmin({
      collapseWhitespace: false,
      removeComments: false,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest(dist));
});

// start
gulp.task('default', ['webpack', 'build-css', 'build-html']);

// deploy dist to remote server
gulp.task('deploy', () => {
  let sftp = require('gulp-sftp');
  return gulp.src(dist + '/**')
    .pipe(sftp({
      host: '[remote server ip]',
      remotePath: '/www/***/',
      user: '',
      pass: ''
    }));
});