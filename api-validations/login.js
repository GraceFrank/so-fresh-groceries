const Joi = require('joi');

function validate(loginDetails) {
  const schema = {
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email(),
    password: Joi.string()
      .required()
      .max(255)
  };

  return Joi.validate(loginDetails, schema);
}

module.exports = validate;
