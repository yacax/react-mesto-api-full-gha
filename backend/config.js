const {
  NODE_ENV,
  PORT = 3000,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET,
} = process.env;

const JWT_CONST = NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET';

module.exports = {
  PORT,
  MONGODB_URL,
  JWT_CONST,
};
