const config = require('config');

//check if jwt has been set in the environment variable, if not set exit app
module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR, jwtPrivateKey not set');
    process.exit(1);
  }
};
