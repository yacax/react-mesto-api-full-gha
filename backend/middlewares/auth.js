const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const AuthenticationError = require('../errors/AuthenticationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthenticationError());
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    next(new AuthenticationError());
    return;
  }
  req.user = payload;
  next();
};
