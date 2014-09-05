/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var tempDir = path.join(os.tmpdir(), 'temp-test');
console.log(tempDir);

describe('emberate:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(tempDir)
      .withOptions({ 'skip-install': true })
      .withPrompt({
        appName: 'App',
        buildTool: 'gulp'
      })
      .on('end', done);
  });

  it('creates core files', function () {
    assert.file([
      'bower.json',
      'package.json',
      'shims.js',
      '.editorconfig',
      '.jshintrc',
      '.jscsrc',
      'static',
      'static/index.html',
      'client',
      'client/app.js',
      'client/router.js',
      'client/initializers',
      'client/models',
      'client/routes',
      'client/views',
      'client/templates',
      'client/templates/application.hbs',
      'client/templates/components',
      'client/components',
      'client/transforms',
      'client/helpers',
      'client/adapters',
      'client/serializers',
      'client/styles/app.css'
    ]);
  });

  it('creates gulp files', function () {
    assert.file([
      'gulpfile.js',
      'gulp/index.js',
      'gulp/utils',
      'gulp/utils/script-filter.js',
      'gulp/utils/bundle-logger.js',
      'gulp/tasks',
      'gulp/tasks/default.js',
      'gulp/tasks/less.js',
      'gulp/tasks/lint.js',
      'gulp/tasks/browserify.js',
      'gulp/tasks/emberate.js',
      'gulp/tasks/dist.js',
      'gulp/tasks/watch.js'
    ]); 
  });

  it('appName set properly', function () {
    assert.fileContent('package.json', /App/);
    assert.fileContent('bower.json', /App/);
    assert.fileContent('static/index.html', /App/);
  });
});

describe('emberate:app - less', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(tempDir)
      .withOptions({ 'skip-install': true })
      .withPrompt({
        appName: 'App',
        buildTool: 'gulp',
        cssPreprocessor: 'Less'
      })
      .on('end', done);
  });

  it('creates less files', function () {
    assert.file([
      'client/styles/app.less',
      'client/styles/libs.less'
    ]);
  });
});
