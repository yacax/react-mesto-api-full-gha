const jwt = require('jsonwebtoken');
const { JWT_CONST } = require('../config');
const AuthenticationError = require('../errors/AuthenticationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthenticationError());
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_CONST);
  } catch (err) {
    next(new AuthenticationError());
    return;
  }
  req.user = payload;
  next();
};
