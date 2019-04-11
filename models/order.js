const mongoose = require('mongoose');

const deliveryAdressSchema = new mongoose.Schema({
  street: { type: String, required: true, minlength: 3, maxlength: 255 },
  city: { type: String, required: true, minlength: 3, maxlength: 255 },
  state: { type: String, required: true, minlength: 3, maxlength: 255 }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255
  }
});
const foodSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  measurmentUnit: String,
  pricePerUnit: Number,
  totalCost: Number
});

//defining order schema
const orderSchema = new mongoose.Schema({
  user: { type: userSchema },
  date: { type: Date, default: Date.now() },
  deliveryAddress: { type: deliveryAdressSchema, required: true },
  foodItem: { type: foodSchema, required: true },
  status: {
    type: String,
    enum: ['processing', 'cancelled', 'onroute', 'delivered'],
    default: 'processing'
  }
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
