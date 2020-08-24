'use strict';

/**
 * Module dependencies.
 */

const path = require('path');

const development = require('./env/development');
const test = require('./env/test');

const defaults = {
  root: path.join(__dirname, '..'),
};

/**
 * Expose
 */

module.exports = {
  development: Object.assign({}, development, defaults),
  test: Object.assign({}, test, defaults),
}[process.env.NODE_ENV || 'development'];
