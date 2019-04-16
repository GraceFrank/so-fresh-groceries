// checks if user is an Admin and grants or denies access
function authAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('access denied');
  next();
}

module.exports = authAdmin;
