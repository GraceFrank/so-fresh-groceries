const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const validate = require('../api-validations/food');
const Category = require('../models/category');
const authorize = require('../middleware/authorize');
const authAdmin = require('../middleware/auth-admin');
const validateId = require('../middleware/validateId');

//endpoint to get all foods
router.get('/', async (req, res) => {
  await Food.find()
    .populate('category')
    .exec((err, food) => {
      if (err) console.log(err.message);
      return res.send(food);
    });
});

//endpoint to get a specific food
router.get('/:id', validateId, async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).send('no such food');
  return res.send(food);
});

//endpoint to create food, only admin can create food
router.post('/', [authorize, authAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('invalid category');

  let food = await Food.create({
    name: req.body.name,
    numberInStock: req.body.numberInStock,
    pricePerUnit: req.body.pricePerUnit,
    measurementUnit: req.body.measurementUnit,
    category: req.body.categoryId
  });

  return res.send(food);
});

//endpoint to modify/update food, only a logged in admin user can update food
router.put('/:id', [validateId, authorize, authAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send(' invalid food category');

  const food = await Food.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      numberInStock: req.body.numberInStock,
      pricePerUnit: req.body.pricePerUnit,
      measurementUnit: req.body.measurementUnit,
      category: { _id: category._id, name: category.name }
    },
    { new: true }
  );

  if (!food)
    return res.status(404).send('The food with the given ID was not found.');

  res.send(food);
});

//endpoint to delete a food
router.delete('/:id', [validateId, authorize, authAdmin], async (req, res) => {
  const food = await Food.findByIdAndRemove(req.params.id);

  if (!food) return res.status(404).send('no food with given id');

  res.send(food);
});

module.exports = router;
