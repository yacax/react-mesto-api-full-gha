const { ERROR_MESSAGES } = require('../config');

module.exports = class AuthenticationError extends Error {
  constructor(message = ERROR_MESSAGES.AUTHENTICATION_ERROR) {
    super(message);
    this.statusCode = 401;
  }
};
