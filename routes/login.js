//npm packages
const express = require('express');
const bcrypt = require('bcrypt');

//custom modules
const User = require('../models/user');
const validate = require('../api-validations/login.js');

const router = express.Router();

router.post('/', async (req, res) => {
  //validating user request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('invalid email or password');

  //checking if client sends a valid password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('invalid email or password');

  //generating jwt token
  const token = user.generateToken();
  res.header('x-auth-token', token).send('successfully logged in');
});

module.exports = router;
