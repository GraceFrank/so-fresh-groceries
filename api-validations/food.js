const Joi = require('joi');
 Joi.objectId = require('joi-objectid')(Joi)
function validate(food) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(10000),
    pricePerUnit: Joi.number()
      .required()
      .min(0)
      .max(10000),
    measurementUnit: Joi.string()
      .required()
      .min(1)
      .max(50),
    categoryId: Joi.objectId().required()
  };

  return Joi.validate(food, schema);
}

module.exports = validate;
