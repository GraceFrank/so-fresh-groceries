const mongoose = require("mongoose");
const Joi = require("joi");

//defining user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255
  },
  isAdmin: { type: Boolean, default: false },
  phone: {
    type: "string",
    minlength: 10,
    maxlength: 10,
    required: true,
    match: /[0-9]+$/
  },
  adress: {
    type: new mongooose.Schema({
      street: { type: String, required: true, minlength: 3, maxlength: 255 },
      city: { type: String, required: true, minlength: 3, maxlength: 255 },
      State: { type: String, required: true, minlength: 3, maxlength: 255 }
    }),
    required: true
  }
});
