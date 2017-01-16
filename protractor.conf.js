'use strict';

require('babel-register')({
  presets: [ 'es2015' ]
});

exports.config = {
  framework: 'jasmine',
  specs: ['./tests/acceptance/**/*.spec.js']
};