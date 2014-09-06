'use strict';

var gulp = require('gulp');
var cli = require('minimist')(process.argv.slice(2));

gulp.task('dist', ['lint', 'less', 'browserify']);
