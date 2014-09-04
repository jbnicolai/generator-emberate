'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var emberate = require('emberate');

gulp.task('emberate', function () {
  return emberate('./client')
    .pipe(source('.index.js'))
    .pipe(gulp.dest('./client'));
});
