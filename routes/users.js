const express = require('express');
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
  let newUser = await User.create(req.body);
  res.send(newUser);
});

//endpoint to get a specific user
router.get('/:id', async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  if (!user) return res.status(400).send('user does not exisr');
  res.send(user);
});

//enpoint to update a user
module.exports = router;
