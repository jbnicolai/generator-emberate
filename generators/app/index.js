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
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    deps: function () {
      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
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
