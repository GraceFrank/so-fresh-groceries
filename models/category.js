const mongoose = require('mongoose');

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
const Category = mongoose.model('categories', categoreySchema);

module.exports = Category;
