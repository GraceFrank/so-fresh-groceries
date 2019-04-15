require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const categories = require('./routes/categories');
const foods = require('./routes/foods');
const users = require('./routes/users');
const orders = require('./routes/orders');
const login = require('./routes/login');

//check if jwt has been set in the environment variable, if not set exit app
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR, jwtPrivateKey not set');
  process.exit(1);
}

const app = express();

//
winston.add(winston.transports.File, { filename: 'error.log' });

app.use(express.json());
app.use('/api/categories', categories);
app.use('/api/foods', foods);
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/orders', orders);

app.use(error);

//connect to database
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
