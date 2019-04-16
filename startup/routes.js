//
const express = require('express');
const categories = require('../routes/categories');
const foods = require('../routes/foods');
const users = require('../routes/users');
const orders = require('../routes/orders');
const login = require('../routes/login');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());

  app.use('/api/categories', categories);
  app.use('/api/foods', foods);
  app.use('/api/users', users);
  app.use('/api/login', login);
  app.use('/api/orders', orders);

  app.use(error);
};
