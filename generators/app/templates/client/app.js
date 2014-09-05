'use strict';

var Ember = require('ember');

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
});

Ember.RSVP.configure('onerror', function (error) {
  Ember.Logger.assert(false, error);
});

module.exports = global.App = App;
