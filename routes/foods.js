const express = require("express");
const router = express.Router();
const { Food, validate } = require("../models/food");
const { Category } = require("../models/category");

//endpoint to get all foods
router.get("/", async (req, res) => {
  const foods = await Food.find();
  return res.send(foods);
});

//endpoint to get a specific food
router.get("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).send("no such food");
  return res.send(food);
});

//endpoint to create food
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("invalid category");

  let food = await Food.create({
    name: req.body.name,
    numberInStock: req.body.numberInStock,
    pricePerUnit: req.body.pricePerUnit,
    measurmentUnit: req.body.measurmentUnit,
    category: { _id: category._id, name: category.name }
  });

  return res.send(food);
});
module.exports = router;
