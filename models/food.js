const mongoose = require("mongoose");
const Joi = require("joi");
const { categoreySchema } = require("./category");

//defining schema for food
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  numberInStock: { type: Number, required: true, min: 0, max: 200 },
  price: { type: Number, required: true, min: 0, max: 200 },
  category: { type: categoreySchema, required: true }
});

//defining the food model
const Food = mongoose.model("foods", foodSchema);

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
    price: Joi.number()
      .required()
      .min(0)
      .max(200),
    categoryId: Joi.string().required()
  };

  return Joi.validate(food, schema);
}

exports.validate = validate;
exports.Food = Food;
