require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { corsOptions } = require('./utils/corsOptions');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger, infoLogger } = require('./middlewares/logger');
const router = require('./routes');

const { PORT, MONGODB_URL } = require('./config');

const app = express();
app.use(helmet());

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(express.json());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use('/', router);
app.use('*', (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  infoLogger.info(`Server running on http://localhost:${PORT}`);
});
