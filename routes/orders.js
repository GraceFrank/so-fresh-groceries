const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const Food = require('../models/food');
const User = require('../models/user');
const { validate } = require('../api-validations/order');
const { validateStatus } = require('../api-validations/order');
const Order = require('../models/order');
const mongoose = require('mongoose');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  return res.send(await Order.find().sort({ date: -1 }));
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) res.status(404).send('invalid order id');
  return res.send(order);
});

module.exports = router;
