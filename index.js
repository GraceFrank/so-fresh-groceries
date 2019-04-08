const express = require("express");
const mongoose = require("mongoose");

//conncet to database
mongoose
  .connect("mongodb://localhost/foodDb", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to database...");
  })
  .catch(err => {
    console.log(err.message);
  });

//defining port and listening on defined port
const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`listening on port ${port}`));
