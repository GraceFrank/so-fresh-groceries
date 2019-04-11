const express = require('express');
const mongoose = require('mongoose');
const categories = require('./routes/categories');
const foods = require('./routes/foods');
const users = require('./routes/users');
const orders = require('./routes/orders');

const app = express();

app.use(express.json());
app.use('/api/categories', categories);
app.use('/api/foods', foods);
app.use('/api/users', users);
app.use('/api/orders', orders);

//conncet to database
mongoose
  .connect('mongodb://localhost/so-fresh-groceries', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to database...');
  })
  .catch(err => {
    console.log(err.message);
  });

//defining port and listening on defined port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
