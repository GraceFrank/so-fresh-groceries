const jwt = require('jsonwebtoken');
const config = require('config');

//authorize users to a resource if they arr login by checking if they have a valid token
function authorize(req, res, next) {
  const token = req.header(x - auth - token);
  if (!token) return res.status(401).send('access denied, no token');

  try {
    const decoded = jwt.decode(token, config.get());
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send('invalid token');
  }
}

module.exports = authorize;
