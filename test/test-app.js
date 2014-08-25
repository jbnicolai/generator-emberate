/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('emberate:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), 'temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'client',
      'client/initializers',
      'client/models',
      'client/routes',
      'client/views',
      'client/templates',
      'client/templates/components',
      'client/components',
      'client/transforms',
      'client/helpers',
      'client/adapters',
      'client/serializers'
    ]);
  });
});
