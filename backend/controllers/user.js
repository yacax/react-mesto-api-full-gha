const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
// const { checkIdValidity } = require('../utils/checkIdValidity');
const BadRequestError = require('../errors/BadRequestError');
// const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const AuthenticationError = require('../errors/AuthenticationError');
const UserAlreadyExist = require('../errors/UserAlreadyExists');

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

  // userObject.name = name;
  // userObject.about = about;
  // userObject.avatar = avatar;

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

  return user.findOne({ email }).select('+password')
    .then((userDate) => {
      if (!userDate) {
        throw new AuthenticationError();
      }

      return bcrypt.compare(password, userDate.password)
        .then((isMatch) => {
          if (!isMatch) {
            throw new AuthenticationError();
          }

          const token = jwt.sign(
            { _id: userDate._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
            { expiresIn: '7d' },
          );

          res.send({ token });
        });
    })
    .catch(() => {
      next(new AuthenticationError());
    });

  // ==========================

  // return user.findUserByCredentials(email, password)
  //   .then((userDate) => {
  //     if (!userDate) {
  //       throw new AuthenticationError();
  //     }

  //     return bcrypt.compare(password, userDate.password)
  //       .then((isMatch) => {
  //         if (!isMatch) {
  //           throw new AuthenticationError();
  //         }

  //         const token = jwt.sign(
  //           { _id: userDate._id },
  //           NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
  //           { expiresIn: '7d' },
  //         );

  //         res.send({ token });
  //       });
  //   })
  //   .catch(next);

  // ======================
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  // if (!checkIdValidity(userId, next)) {
  //   return;
  // }
  user.findById(userId)
    .then((userDate) => {
      if (!userDate) {
        next(new NotFoundError());
        return;
      }
      res.send({ data: userDate });
    })
    .catch(next);
  // .catch(() => next(new InternalServerError()));
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  // if (!checkIdValidity(userId, next)) {
  //   return;
  // }
  user.findById(userId)
    .then((userDate) => {
      if (!userDate) {
        next(new NotFoundError());
        return;
      }
      res.send({ data: userDate });
    })
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
