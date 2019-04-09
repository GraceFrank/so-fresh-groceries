const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.find({ _id: req.params.id });
    if (!category) return res.status(400).send("no such food");
    res.send(category);
  } catch (exception) {
    return res.status(500).send(exception.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.create(req.body);
  return res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!category) return res.status(404).send("invalid food category");
  return res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("no food with given id");
  res.send(category);
});

module.exports = router;
