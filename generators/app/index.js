'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var clientFolders = require('./client-folders');
var gulpTasks = require('./gulp-tasks');

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
      this.src.copy('shims.js', 'shims.js');
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
        this.src.copy('gulp/utils/bundle-logger.js', 'gulp/utils/bundle-logger.js');

        gulpTasks.forEach(function (task) {
          var base = 'gulp/tasks/';
          var taskPath = base + task + '.js';

          this.src.copy(taskPath, taskPath);
        }, this);
      }
      else {
        // TODO: implement grunt/broccoli
        this.log('The \'' + this.buildTool +
          '\' build tool is coming soon, in the mean time use \'gulp\'.');
        process.exit(1);
      }
    },

    client: function () {
      this.dest.mkdir('client');

      clientFolders.forEach(function (folder) {
        this.dest.mkdir('client/' + folder);
      }, this);

      this.src.copy('client/app.js', 'client/app.js');
      this.src.copy('client/router.js', 'client/router.js');
    },

    statics: function () {
      this.dest.mkdir('statis');

      this.template('static/index.html', 'static/index.html');
    },

    helpers: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('jscsrc', '.jscsrc');
    }
  },

  end: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = EmberateGenerator;
