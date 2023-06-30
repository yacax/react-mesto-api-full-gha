const rateLimit = require('express-rate-limit');
const NoRightsToTheOperation = require('../errors/NoRightsToTheOperation');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: function handlerError() {
    throw new NoRightsToTheOperation();
  },
});
