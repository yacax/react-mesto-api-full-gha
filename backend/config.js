const {
  NODE_ENV,
  PORT = 3000,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET,
} = process.env;

const JWT_CONST = NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET';

const userDefaultName = 'Жак-Ив Кусто';
const userDefaultAbout = 'Исследователь';
const userDefaultAvatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const ERROR_MESSAGES = {
  NOT_FOUND: 'Запрашиваемый ресурс не найден.',
  BAD_REQUEST: 'Неверный запрос.',
  NOT_FOUND_ERROR: 'Ресурс не найден.',
  AUTHENTICATION_ERROR: 'Ошибка аутентификации',
  USER_ALREADY_EXISTS: 'Пользователь уже существует',
  NO_RIGHTS_TO_THE_OPERATION: 'Ошибка доступа',
};

module.exports = {
  PORT,
  MONGODB_URL,
  JWT_CONST,
  userDefaultName,
  userDefaultAbout,
  userDefaultAvatar,
  ERROR_MESSAGES,
};
