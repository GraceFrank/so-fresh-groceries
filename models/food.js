const mongoose = require("mongoose");
const Joi = require("joi");
const { categoreySchema } = require("./category");

//defining schema for food
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    lowercase: true
  },
  numberInStock: { type: Number, required: true, min: 0, max: 200 },
  pricePerUnit: { type: Number, required: true, min: 0, max: 200 },
  measurmentUnit: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    lowercase: true
  },
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
    pricePerUnit: Joi.number()
      .required()
      .min(0)
      .max(200),
    measurmentUnit: Joi.string()
      .required()
      .min(1)
      .max(50),
    categoryId: Joi.string().required()
  };

  return Joi.validate(food, schema);
}

exports.validate = validate;
exports.Food = Food;
