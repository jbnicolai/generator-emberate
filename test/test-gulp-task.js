/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var tempDir = path.join(os.tmpdir(), 'temp-test');
console.log(tempDir);

describe('emberate:gulp-task - new', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/gulp-task'))
      .inDir(tempDir)
      .withArguments('name', '--force')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'gulp/tasks/name.js'
    ]);
  });
});

describe('emberate:gulp-task - existing', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/gulp-task'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('less', '--force')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file(['gulp/tasks/less.js']);
    assert.fileContent('gulp/tasks/less.js', /gulp-less/);
  });
});
