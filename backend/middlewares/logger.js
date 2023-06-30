const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

const infoLogger = winston.createLogger({
  level: 'info',

  format: winston.format.json(),

  defaultMeta: { service: 'server-mesto' },

  transports: [

    new winston.transports.File({ filename: 'error.log', level: 'error' }),

    new winston.transports.File({ filename: 'combined.log' }),

  ],

});

module.exports = {
  requestLogger,
  errorLogger,
  infoLogger,
};
