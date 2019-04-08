const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find();
  return res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.create(req.body);
  return res.send(category);
});
module.exports = router;
