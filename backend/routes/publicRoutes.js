const router = require('express').Router();
const { validateAuthentication, validateUserBody } = require('../utils/validators');
const { login, createUser } = require('../controllers/user');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateAuthentication, login);
router.post('/signup', validateUserBody, createUser);

module.exports = router;
