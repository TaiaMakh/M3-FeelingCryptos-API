const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '..' ,'public')));
}