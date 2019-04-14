const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const Food = require('../models/food');
const User = require('../models/user');
const { validate } = require('../api-validations/order');
const { validateStatus } = require('../api-validations/order');
const Order = require('../models/order');
const mongoose = require('mongoose');
const auth = require('../middleware/authorize');

const authAdmin = require('../middleware/auth-admin');

Fawn.init(mongoose);

//endpoint for admin to view any order by its id
router.get('/myorders/:id', auth, async (req, res) => {
  const orders = await Order.find({ 'user._id': req.user.id });
  if (!orders) return res.status(404).send('user has no orders');

  const order = orders.find(element => {
    return element._id == req.params.id;
  });
  if (!order) return res.status(404).send('invalid order id');

  return res.send(order);
});

//endpoint for a logged in user to view all his orders
router.get('/myorders', auth, async (req, res) => {
  const order = await Order.find({ ' user._id': req.user._id });
  if (!order) res.status(404).send('user has no orders');
  return res.send(order);
});

//endpoint to get all orders, only admin can view all orders
router.get('/', [auth, authAdmin], async (req, res) => {
  return res.send(await Order.find().sort({ date: -1 }));
});

//endpoint to get any order by id, only admin can view any order
router.get('/:id', [auth, authAdmin], async (req, res) => {
  console.log('hi');
  return res.send(await Order.findById(req.params.id));
});

//endpoint to make an order, only logged in users can create order
router.post('/', auth, async (req, res) => {
  if (req.user.isAdmin)
    return res.status(403).send('Admins not allowed to make order');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('no such user');

  const foodItems = [];

  for (const item of req.body.foodItems) {
    let food = await Food.findById(item.foodId);
    if (!food) return res.status(404).send('no such food item');
    if (item.quantity > food.numberInStock)
      return res.status(406).send('cant purchase more than what is in stock');
    foodItems.push({
      _id: food._id,
      name: food.name,
      quantity: item.quantity,
      measurementUnit: food.measurementUnit,
      pricePerUnit: food.pricePerUnit,
      totalCost: food.pricePerUnit * item.quantity
    });
  }

  const order = new Order({
    user: { _id: user._id, name: user.name },
    deliveryAddress: req.body.deliveryAddress,
    foodItems: foodItems
  });

  const task = Fawn.Task();

  for (const item of order.foodItems) {
    task.update(
      'foods',
      { _id: item._id },
      { $inc: { numberInStock: -item.quantity } }
    );
  }
  task.save('orders', order);
  task.run();

  return res.send(order);
});

//endpoint to update order status, only admin can update order status
router.patch('/:id', [auth, authAdmin], async (req, res) => {
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
