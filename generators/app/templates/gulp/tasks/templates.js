'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var handlebars = require('gulp-ember-handlebars');
var concat = require('gulp-concat');
var noop = require('gulp-util').noop;
var cli = require('minimist')(process.argv.slice(2));

gulp.task('templates', function(){
  return gulp.src(['client/templates/**/*.hbs'])
    .pipe(handlebars({
      outputType: 'browser'
    }))
    .pipe(concat('.templates.js'))
    .pipe(gulp.dest('./client'))
    .pipe(cli.watch ? watch() : noop())
    .pipe(cli.watch ? livereload() : noop());
});
