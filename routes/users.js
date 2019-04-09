const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

//endpoint to read all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let newUser = await User.create(req.body);
  res.send(newUser);
});

module.exports = router;
