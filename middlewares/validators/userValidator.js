const { celebrate, Joi, Segments } = require('celebrate');

module.exports.validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateUserCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    // TODO подумать о частичном обновлении
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required(),
  }),
});
