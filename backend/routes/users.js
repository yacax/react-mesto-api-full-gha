const router = require('express').Router();
const {

  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,

} = require('../utils/validators');

const {

  getUsers,
  getUserById,
  updateAvatar,
  updateProfile,
  getCurrentUser,

} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
