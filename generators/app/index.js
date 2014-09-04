'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var clientFolders = require('./client-folders');

var EmberateGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
    this.option('skip-install', {
      type: 'Boolean'
    });
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-class Emberate generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What would you like to call your app?',
      default: this.appname
    }, {
      type: 'list',
      name: 'buildTool',
      message: 'Which build tool would you like to use?',
      default: 0,
      choices: [
        'gulp',
        'grunt',
        'broccoli'
      ]
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.buildTool = props.buildTool;

      done();
    }.bind(this));
  },

  writing: {
    deps: function () {
      this.template('_bower.json', 'bower.json');
    },

    buildTool: function () {
      if (this.buildTool === 'gulp') {
        this.template('gulp_package.json', 'package.json');
        this.template('gulpfile.js', 'gulpfile.js');

        // Make gulp dirs
        this.dest.mkdir('gulp');
        this.dest.mkdir('gulp/utils');
        this.dest.mkdir('gulp/tasks');

        // Copy gulp scripts/tasks
        this.src.copy('gulp/index.js', 'gulp/index.js');
        this.src.copy('gulp/utils/script-filter.js', 'gulp/utils/script-filter.js');
        this.src.copy('gulp/tasks/.gitkeep', 'gulp/tasks/.gitkeep');
      }
    },

    client: function () {
      this.dest.mkdir('client');

      clientFolders.forEach(function (folder) {
        this.dest.mkdir('client/' + folder);
      }, this);
    },

    helpers: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = EmberateGenerator;
