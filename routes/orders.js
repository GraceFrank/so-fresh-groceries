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

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findById(req.body.user);
  if (!user) return res.status(404).send('no such user');

  let food = await Food.findById(req.body.foodItem.foodId);
  if (!food) return res.status(404).send('no such fooditem');
  if (req.body.foodItem.quantity > food.numberInStock)
    return res.status(406).send('cant purchase more than what is in stock');

  const foodItem = {
    _id: food._id,
    name: food.name,
    quantity: req.body.foodItem.quantity,
    measurmentUnit: food.measurmentUnit,
    shippingCost: food.shippingCost,
    pricePerUnit: food.pricePerUnit,
    totalCost: food.pricePerUnit * req.body.foodItem.quantity
  };

  const order = new Order({
    user: { _id: user.id, name: user.name },
    deliveryAddress: req.body.deliveryAddress,
    foodItem: foodItem
  });

  Fawn.Task()
    .save('orders', order)
    .update(
      'foods',
      { _id: food._id },
      { $inc: { numberInStock: -order.foodItem.quantity } }
    )
    .run();

  return res.send(order);
});

router.patch('/:id', async (req, res) => {
  const { error } = validateStatus(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!order) res.status(404).send('invalid order id');
  res.send(order);
});
module.exports = router;
