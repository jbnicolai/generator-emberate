'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var EmberateGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.option('override', {
      type: 'Boolean'
    });
  },

  writing: function () {
    var override = this.options.override;
    var fileName = this.name + '.js';
    var destTasksPath = path.join('gulp', 'tasks');

    if (!this.dest.exists(destTasksPath)) {
      this.dest.mkdir(destTasksPath);
    }

    if (!override && this.src.exists(path.join('tasks', fileName))) {
      this.src.copy(path.join('tasks', fileName), path.join('gulp/tasks', fileName));
    }
    else {
      this.template('task-template.js', path.join('gulp/tasks/', fileName));
    }
  }
});

module.exports = EmberateGenerator;
