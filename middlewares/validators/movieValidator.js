const { celebrate, Segments, Joi } = require('celebrate');

const regex = /(https?:\/\/)?(www\.)?([A-z0-9-])*\.{1}[A-z0-9-]*(\/([\w#!:.?+=&%@\-/])*)?/;

module.exports.validateMovieId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    image: Joi.string().pattern(regex).required(),
    trailerLink: Joi.string().pattern(regex).required(),
    thumbnail: Joi.string().pattern(regex).required(),
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
