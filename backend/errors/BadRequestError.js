const { ERROR_MESSAGES } = require('../config');

module.exports = class BadRequestError extends Error {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST) {
    super(message);
    this.statusCode = 400;
  }
};
