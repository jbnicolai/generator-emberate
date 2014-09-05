'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var noop = require('gulp-util').noop;
var cli = require('minimist')(process.argv.slice(2));

gulp.task('less', function () {
  return gulp.src(['./client/styles/app.less'])
    .pipe(less({ sourceMap: !cli.production }))
    .pipe(rename('application.css'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(cli.watch ? watch() : noop())
    .pipe(cli.watch ? livereload() : noop());
});
