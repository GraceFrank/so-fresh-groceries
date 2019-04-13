// checks if user is an Admin and grants or denies access
module.exports = function authAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('access denied');
  next();
};
