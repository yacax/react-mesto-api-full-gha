const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const AuthenticationError = require('../errors/AuthenticationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthenticationError());
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthenticationError());
    return;
  }
  req.user = payload;
  next();
};
