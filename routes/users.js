const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validate = require('../api-validations/user');

const router = express.Router();

//endpoint to read all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//endpoint to create user
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let newUser = await new User(
    _.pick(req.body, ['name', 'email', 'password', 'address', 'phone'])
  );
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();

  res.send(_.pick(req.body, ['name', 'email', 'address', 'phone']));
});

//endpoint to get a specific user
router.get('/:id', async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  if (!user) return res.status(400).send('user does not exisr');
  res.send(user);
});

//enpoint to update a user
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!user) return res.status(404).send('no such user');
  return res.send(user);
});

//endpoint to delete a user
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send('user with given id dosent exist');
  res.send(user);
});

module.exports = router;
