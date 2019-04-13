const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const Food = require('../models/food');
const User = require('../models/user');
const { validate } = require('../api-validations/order');
const { validateStatus } = require('../api-validations/order');
const Order = require('../models/order');
const mongoose = require('mongoose');
const authorize = require('../middleware/authorize');
const authAdmin = require('../middleware/auth-admin');

Fawn.init(mongoose);

//endpoint to get all orders, only admin can view all orders
router.get('/', [authorize, authAdmin], async (req, res) => {
  return res.send(await Order.find().sort({ date: -1 }));
});

//endpoint to get any order by id, only admin can view any order
router.get('/:id', [authorize, authAdmin], async (req, res) => {
  return res.send(await Order.findById(req.params.id));
});

router.get('/myorders', authorize, async (req, res) => {
  const order = await Order.find({ 'user._id': req.user._id });
  if (!order) res.status(404).send('invalid order id');
  return res.send(order);
});

router.post('/', authorize, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('no such user');

  let food = await Food.findById(req.body.foodItem.foodId);
  if (!food) return res.status(404).send('no such food item');
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
    user: { _id: user._id, name: user.name },
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

//endpoint to update order status, only admin can update order status
router.patch('/:id', [authorize, authAdmin], async (req, res) => {
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
