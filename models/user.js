const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

//defining user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255
  },
  email: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 1024
  },
  isAdmin: { type: Boolean, default: false },
  phone: {
    type: 'string',
    minlength: 10,
    maxlength: 10,
    required: true,
    match: /[0-9]+$/
  },
  address: {
    type: new mongoose.Schema({
      street: { type: String, required: true, minlength: 3, maxlength: 255 },
      city: { type: String, required: true, minlength: 3, maxlength: 255 },
      state: { type: String, required: true, minlength: 3, maxlength: 255 }
    }),
    required: true
  }
});

//adding a method for generating jwt token to the userSchema
userSchema.methods.generateToken = function() {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
};

//compiling user model
const User = mongoose.model('users', userSchema);

module.exports = User;
