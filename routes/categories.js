const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

router.get("/", async (request, response) => {
  const categories = await Category.find();
  return response.send(categories);
});

module.exports = router;
