const mongoose = require('mongoose');

module.exports = function validateId(req, res, next) {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validId) return res.status(400).send('invalidId');
  next();
};
