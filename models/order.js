const mongoose = require("mongoose");
const Joi = require("joi");

const deliveryAdressSchema = new mongoose.Schema({
  street: { type: String, required: true, minlength: 3, maxlength: 255 },
  city: { type: String, required: true, minlength: 3, maxlength: 255 },
  state: { type: String, required: true, minlength: 3, maxlength: 255 }
    }),

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255
  },
  phone: {
    type: 'string',
    minlength: 10,
    maxlength: 10,
    required: true,
    match: /[0-9]+$/
  }

})
const foodSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  measurmentUnit: String,
  unitPrice: Number,
  totalCost:Number

})

//defining order schema
const orderSchema = new mongoose.Schema({
  user: {type: userSchema}, 
  date: {type:Date, default: Date.now()},
  deliveryAddress: {type: deliveryAdressSchema,  required: true},
  foodItems: {type: [foodSchema], required: true},
  status: {type: String, enum:['processing', 'cancelled', 'onroute','delivered'], default: 'processing'},
  costOfItems: {type: Number, required: true},
  shippingFee: {type: Number, required: true},
  totalPaid: {type: Number, required: true}
  })


