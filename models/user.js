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
    type: new mongoose.Schema({
      street: { type: String, required: true, minlength: 3, maxlength: 255 },
      city: { type: String, required: true, minlength: 3, maxlength: 255 },
      State: { type: String, required: true, minlength: 3, maxlength: 255 }
    }),
    required: true
  }
});

//compiling user model
const User = mongoose.model("users", userSchema);

function validate(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(255),

    isAdmin: Joi.boolean(),

    phone: Joi.string()
      .min(10)
      .max(10)
      .regex(/[0-9]+$/),

    adress: Joi.keys({
      street: Joi.string()
        .required()
        .min(3)
        .max(255),
      city: Joi.string()
        .required()
        .min(3)
        .max(255),
      state: Joi.string()
        .required()
        .min(3)
        .max(255)
    })
  };

  return Joi.validate(user, schema);
}

exports.validate = validate;
exports.User = User;
