const mongoose = require('mongoose');
const Category = require('./category');

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
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'categories',
    required: true
  }
});

//defining the food model
const Food = mongoose.model('foods', foodSchema);

module.exports = Food;
