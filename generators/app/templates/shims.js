'use strict';

module.exports = {
  jquery: {
    exports: 'jQuery'
  },
  handlebars: {
    exports: 'Handlebars'
  },
  ember: {
    exports: 'Ember',
    depends: {
      jquery: 'jQuery',
      handlebars: 'Handlebars'
    }
  },
  'ember-data': {
    exports: 'DS',
    depends: {
      ember: 'Ember'
    }
  }
};
