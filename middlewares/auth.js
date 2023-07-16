const jwt = require('jsonwebtoken');
const AuthException = require('../exceptions/authException');
const {
  ERR_MESSAGE_NO_AUTH_RU,
} = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

module.exports.auth = (req, res, next) => {
  let payload;

  try {
    const { authorization } = req.headers;
    const token = authorization ? authorization.substring(7) : null;
    if (!token) {
      return next(new AuthException(ERR_MESSAGE_NO_AUTH_RU));
    }
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthException(`${ERR_MESSAGE_NO_AUTH_RU}`));
  }

  req.user = payload;

  return next();
};
