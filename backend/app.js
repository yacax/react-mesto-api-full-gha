const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { logger } = require('./utils/logger');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { validateAuthentication, validateUserBody } = require('./utils/validators');
const NoRightsToTheOperation = require('./errors/NoRightsToTheOperation');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(helmet());
const { PORT = 3001 } = process.env;

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
// });

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: function handlerError() {
    throw new NoRightsToTheOperation();
  },
});
app.use(limiter);

app.use(express.json());

app.use(requestLogger);


// Добавление обработчика запросов OPTIONS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method == 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
});


app.post('/signin', validateAuthentication, login);
app.post('/signup', validateUserBody, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
