'use strict';

var fs = require('fs');
var path = require('path');
var onlyScripts = require('./utils/script-filter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
  require('./tasks/' + task);
});
