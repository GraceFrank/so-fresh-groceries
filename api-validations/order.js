const Joi = require('joi');

function validate(food) {
  const schema = {
    user: Joi.string()
      .required()
      .min(20)
      .max(26),
    deliveryAddress: Joi.object().keys({
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
    }),
    foodItems: Joi.array()
      .items(Joi.string())
      .required()
  };

  return Joi.validate(food, schema);
}

module.exports = validate;
