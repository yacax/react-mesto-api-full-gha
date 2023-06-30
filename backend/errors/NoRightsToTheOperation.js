const { ERROR_MESSAGES } = require('../config');

module.exports = class NoRightsToTheOperation extends Error {
  constructor(message = ERROR_MESSAGES.NO_RIGHTS_TO_THE_OPERATION) {
    super(message);
    this.statusCode = 403;
  }
};
