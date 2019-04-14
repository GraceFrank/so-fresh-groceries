const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validate, validateUpdate } = require('../api-validations/user');
const authorize = require('../middleware/authorize');
const authAdmin = require('../middleware/auth-admin');
const validateId = require('../middleware/validateId');

const router = express.Router();

//endpoint to read all users, only admin should be able to view all users
router.get('/', [authorize, authAdmin], async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//endpoint for user to view his account
router.get('/me', authorize, async (req, res) => {
  const me = await User.findById(req.user._id);
  res.send(_.pick(me, ['name', 'email', 'password', 'address', 'phone']));
});

//endpoint to create user
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if a user with provided email already exist
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('email already registered');

  let newUser = await new User(
    _.pick(req.body, ['name', 'email', 'password', 'address', 'phone'])
  );
  // hashing the password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await newUser.save();

  res.send(_.pick(req.body, ['name', 'email', 'address', 'phone']));
});

//endpoint to get a specific user, only an admin can view any user
router.get('/:id', [validateId, authorize, authAdmin], async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  if (!user) return res.status(400).send('user does not exist');
  res.send(user);
});

//endpoint to update a user,  a user can update only his account
router.put('/', authorize, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true
  });
  if (!user) return res.status(404).send('no such user');
  return res.send(user);
});

//endpoint to delete a user, only a user can delete his account
router.delete('/', authorize, async (req, res) => {
  const user = await User.findByIdAndRemove(req.users._id);
  if (!user) return res.status(404).send(`user with given id doesn't  exist`);
  res.send(user);
});

module.exports = router;
