const Joi = require('joi');

function validate(category) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
  };

  return Joi.validate(category, schema);
}

module.exports = validate;
