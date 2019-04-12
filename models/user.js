const mongoose = require('mongoose');

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
    maxlength: 255
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

//compiling user model
const User = mongoose.model('users', userSchema);

module.exports = User;
