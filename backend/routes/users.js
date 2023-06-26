const router = require('express').Router();
const {

  validateUserId,
  validateUserFields,
  validateBearerToken,

} = require('../utils/validators');

const {

  getUsers,
  getUserById,
  updateAvatar,
  updateProfile,
  getCurrentUser,

} = require('../controllers/user');

router.get('/', validateBearerToken, getUsers);
router.get('/me', validateBearerToken, getCurrentUser);
router.get('/:userId', validateBearerToken, validateUserId, getUserById);
router.patch('/me', validateBearerToken, validateUserFields, updateProfile);
router.patch('/me/avatar', validateBearerToken, validateUserFields, updateAvatar);

module.exports = router;
