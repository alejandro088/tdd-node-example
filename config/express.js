'use strict';

/**
 * Module dependencies.
 */

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./');


module.exports = function(app) {
 
  app.use(cors());

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
};
