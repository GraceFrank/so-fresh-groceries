const mongoose = require("mongoose");
const joi = require("joi");

//creating schema for movie genre
const categoreySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    lowercase: true
  }
});

//modeling genre
const Category = mongoose.model("genre", categoreySchema);

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
