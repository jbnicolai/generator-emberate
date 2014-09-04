'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('jshint-stylish');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var noop = require('gulp-util').noop;
var cli = require('minimist')(process.argv.slice(2));

gulp.task('lint', function () {
  return gulp.src(['./client/**/*.js'])
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .pipe(cli.watch ? watch() : noop())
    .pipe(cli.watch ? livereload() : noop())
});
