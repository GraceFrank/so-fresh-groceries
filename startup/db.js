const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  //connect to database
  mongoose
    .connect('mongodb://localhost/so-fresh-groceries', {
      useNewUrlParser: true
    })
    .then(() => {
      winston.info('connected to database...');
    });
};
