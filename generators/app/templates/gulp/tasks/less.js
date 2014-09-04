'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var noop = require('gulp-util').noop;
var cli = require('minimist')(process.argv.slice(2));

gulp.task('less', function () {
  return gulp.src(['./client/styles/styles.less', './client/styles/libs.less'])
    .pipe(less({ sourceMap: !cli.production }))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(cli.watch ? watch() : noop())
    .pipe(cli.watch ? livereload() : noop());
});
