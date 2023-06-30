const router = require('express').Router();
const publicRoutes = require('./publicRoutes');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use('/', publicRoutes);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

module.exports = router;
