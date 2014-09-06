'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', function () {
  watch({ glob: './client/styles/*.less' }, ['less']);
});
