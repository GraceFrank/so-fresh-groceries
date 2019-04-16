//
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaught-exceptions.log' })
  );

  process.on('unhandledRejection', ex => {
    throw ex;
    process.exit(1);
  });

  //
  winston.add(winston.transports.File, { filename: 'error.log' });
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/so-fresh-groceries'
  });
};
