const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UserAlreadyExist = require('../errors/UserAlreadyExists');
const AuthenticationError = require('../errors/AuthenticationError');
const NoRightsToTheOperation = require('../errors/NoRightsToTheOperation');

module.exports = ((err, req, res, next) => {
  if (err instanceof NotFoundError
    || err instanceof BadRequestError
    || err instanceof UserAlreadyExist
    || err instanceof AuthenticationError
    || err instanceof NoRightsToTheOperation) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message || 'Internal Server Error' });
    next();
  }
});
