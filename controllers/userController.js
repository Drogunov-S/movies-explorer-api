const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CODE_201,
  ERR_MESSAGE_FORBIDDEN_ELEMENT_ID,
  USER_RU,
  ERROR_VALIDATION,
  ERROR_CODE_409_REG_MESSAGE_RU,
  ERROR_CODE_409_UPD_MESSAGE_RU,
  ERROR_CODE_11000,
} = require('../utils/constants');
const RegEmailException = require('../exceptions/regEmailException');
const NotFoundException = require('../exceptions/notFoundException');
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  HASH_SALT,
} = require('../utils/config');
const DataException = require('../exceptions/dataException');

const findUserById = (req, res, next, id) => {
  User.findById(id)
    .orFail(new NotFoundException(ERR_MESSAGE_FORBIDDEN_ELEMENT_ID(USER_RU, id)))
    .then((user) => res.send(user))
    .catch(next);
};

const getAboutMe = (req, res, next) => {
  const { _id } = req.user;
  findUserById(req, res, next, _id);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByEmailCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      );
      res.send({ token });
    }).catch((next));
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, HASH_SALT)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(CODE_201).send(user.toJSON()))
    .catch((err) => {
      if (err.code === ERROR_CODE_11000) {
        next(new RegEmailException(ERROR_CODE_409_REG_MESSAGE_RU));
      } else if (err.name === ERROR_VALIDATION) {
        next(new DataException(err.message));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next, userData) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, userData, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err.code === ERROR_CODE_11000) {
        next(new RegEmailException(ERROR_CODE_409_UPD_MESSAGE_RU));
      } else if (err.name === ERROR_VALIDATION) {
        next(new DataException(err.message));
      } else {
        next(err);
      }
    });
};

const updateUserWithParam = (req, res, next) => {
  const { name, email } = req.body;
  updateUser(req, res, next, { name, email });
};

module.exports = {
  login,
  createUser,
  getAboutMe,
  updateUserWithParam,
};
