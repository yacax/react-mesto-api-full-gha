const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_CONST } = require('../config');
const user = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UserAlreadyExist = require('../errors/UserAlreadyExists');

const findUserById = (userId, next) => user.findById(userId)
  .then((userDate) => {
    if (!userDate) {
      return next(NotFoundError());
    }
    return userDate;
  })
  .catch(next);

module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  const userObject = {
    email,
    password: bcrypt.hashSync(password, 10),
  };

  if (name && name !== '') userObject.name = name;
  if (about && about !== '') userObject.about = about;
  if (avatar && avatar !== '') userObject.avatar = avatar;

  user.create(userObject)
    .then((userDate) => res.status(201).send({
      _id: userDate._id,
      email: userDate.email,
      name: userDate.name,
      about: userDate.about,
      avatar: userDate.avatar,
    }))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        next(err);
      } else if (err.code === 11000) {
        next(new UserAlreadyExist());
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((userDate) => {
      const token = jwt.sign(
        { _id: userDate._id },
        JWT_CONST,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  findUserById(userId, next)
    .then((userDate) => res.send({ data: userDate }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  findUserById(userId, next)
    .then((userDate) => res.send({ data: userDate }))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const fieldsToUpdate = req.body;

  user.findByIdAndUpdate(userId, fieldsToUpdate, { new: true, runValidators: true })
    .then((userDate) => {
      if (!userDate) {
        next(new NotFoundError());
        return;
      }
      res.send({ data: userDate });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError());
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  user.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((userDate) => {
      if (!userDate) {
        next(new NotFoundError());
        return;
      }
      res.send({ data: userDate });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      }
    });
};
