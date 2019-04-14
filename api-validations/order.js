const Joi = require('joi');

function validate(order) {
  const foodSchema = Joi.object().keys({
    foodId: Joi.string().required(),
    quantity: Joi.number()
      .min(1)
      .max(50)
      .required()
  });

  const schema = {
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
      .items(foodSchema)
      .required()
  };

  return Joi.validate(order, schema);
}

function validateStatus(update) {
  const schema = {
    status: Joi.any().valid(['processing', 'cancelled', 'onroute', 'delivered'])
  };
  return Joi.validate(update, schema);
}
exports.validateStatus = validateStatus;
exports.validate = validate;
