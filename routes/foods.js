const express = require("express");
const router = express.Router();
const { Food, validate } = require("../models/food");

router.get("/", async (req, res) => {
  const foods = await Food.find();
  return res.send(foods);
});

module.exports = router;
