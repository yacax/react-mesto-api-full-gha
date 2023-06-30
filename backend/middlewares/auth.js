const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

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
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET');
  } catch (err) {
    next(new AuthenticationError());
    return;
  }
  req.user = payload;
  next();
};
