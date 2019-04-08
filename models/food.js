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

exports.Food = Food;
