require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { corsOptions } = require('./utils/corsOptions');
// const { logger } = require('./utils/logger');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { validateAuthentication, validateUserBody } = require('./utils/validators');
const NoRightsToTheOperation = require('./errors/NoRightsToTheOperation');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger, infoLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(helmet());

mongoose.connect(MONGODB_URL, {
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
app.use(cors(corsOptions));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateAuthentication, login);
app.post('/signup', validateUserBody, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  infoLogger.info(`Server running on http://localhost:${PORT}`);
});
