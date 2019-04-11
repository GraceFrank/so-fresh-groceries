const Joi = require('joi');

function validate(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(255),
    email: Joi.string()
      .required()
      .min(3)
      .max(255),
    phone: Joi.string()
      .min(10)
      .max(10)
      .regex(/[0-9]+$/),

    address: Joi.object().keys({
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

module.exports = validate;
