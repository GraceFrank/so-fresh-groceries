const mongoose = require("mongoose");
const joi = require("joi");

//creating schema for category of food
const categoreySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    lowercase: true
  }
});

//modeling food category
const Category = mongoose.model("categories", categoreySchema);

function validate(category) {
  const schema = {
    name: joi
      .string()
      .required()
      .min(3)
  };

  return joi.validate(category, schema);
}

exports.validate = validate;
exports.categoreySchema = categoreySchema;
exports.Category = Category;
