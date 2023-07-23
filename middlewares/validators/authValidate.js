const { celebrate, Segments, Joi } = require('celebrate');

module.exports.validateAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});
