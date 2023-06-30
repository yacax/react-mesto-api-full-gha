const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {
  userDefaultName,
  userDefaultAbout,
  userDefaultAvatar,
} = require('../config');
const AuthenticationError = require('../errors/AuthenticationError');
const { regexPatterns } = require('../utils/regexPatterns');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: userDefaultName,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: userDefaultAbout,
  },
  avatar: {
    type: String,
    default: userDefaultAvatar,
    validate: {
      validator(v) {
        return regexPatterns.link.test(v);
      },
      message: 'URL is not valid!',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthenticationError();
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthenticationError();
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
