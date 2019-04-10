const Joi = require('joi');

function validate(food) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(200),
    pricePerUnit: Joi.number()
      .required()
      .min(0)
      .max(200),
    measurmentUnit: Joi.string()
      .required()
      .min(1)
      .max(50),
    category: Joi.string().required()
  };

  return Joi.validate(food, schema);
}

module.exports = validate;
