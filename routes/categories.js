const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const validate = require('../api-validations/category');
const authorize = require('../middleware/authorize');
const authAdmin = require('../middleware/auth-admin');

router.get('/', async (req, res) => {
  const categories = await Category.find();
  return res.send(categories);
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.find({ _id: req.params.id });
    if (!category) return res.status(400).send('no such food');
    res.send(category);
  } catch (exception) {
    return res.status(500).send(exception.message);
  }
});

router.post('/', [authorize, authAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.create(req.body);
  return res.send(category);
});

router.put('/:id', [authorize, authAdmin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!category) return res.status(404).send('invalid food category');
  return res.send(category);
});

router.delete('/:id', [authorize, authAdmin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send('no food with given id');
  res.send(category);
});

module.exports = router;
