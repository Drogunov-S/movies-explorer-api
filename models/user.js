const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validator = require('validator');
const {
  ERR_MESSAGE_MIN_VALID_USER_NAME_RU,
  ERR_MESSAGE_MAX_VALID_USER_NAME_RU,
  ERR_MESSAGE_BAD_AUTH_RU,
  ERR_MESSAGE_USER_BAD_EMAIL,
} = require('../utils/constants');
const AuthException = require('../exceptions/authException');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, ERR_MESSAGE_MIN_VALID_USER_NAME_RU],
    maxLength: [30, ERR_MESSAGE_MAX_VALID_USER_NAME_RU],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: ERR_MESSAGE_USER_BAD_EMAIL,
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findByEmailCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthException(ERR_MESSAGE_BAD_AUTH_RU));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthException(ERR_MESSAGE_BAD_AUTH_RU));
          }
          return user;
        });
    });
};

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
