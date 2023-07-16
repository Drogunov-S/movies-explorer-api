const Movie = require('../models/movie');
const {
  ERR_MESSAGE_FORBIDDEN_ELEMENT_ID,
  MOVIE_RU,
  CODE_201,
  ERROR_VALIDATION,
  MESSAGE_MOVIE_DELETE_RU,
  ERR_MESSAGE_MOVIE_DELETE_OTHER,
  MOVIE_OWNER,
} = require('../utils/constants');
const NotFoundException = require('../exceptions/notFoundException');
const DataException = require('../exceptions/dataException');
const NotAccessException = require('../exceptions/notAccessException');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate([MOVIE_OWNER])
    .then((movies) => res.send(movies))
    .catch(next);
};
const createMovie = (req, res, next) => {
  const movie = req.body;
  movie.owner = req.user._id;
  Movie.create(movie)
    .then((movieFromDb) => Movie.findById(movieFromDb._id).populate(MOVIE_OWNER))
    .then((newMovie) => res.status(CODE_201).send(newMovie))
    .catch((err) => {
      if (err.name === ERROR_VALIDATION) {
        next(new DataException(err.message));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  Movie.findById(id)
    .orFail(new NotFoundException(ERR_MESSAGE_FORBIDDEN_ELEMENT_ID(MOVIE_RU, id)))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new NotAccessException(ERR_MESSAGE_MOVIE_DELETE_OTHER));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: MESSAGE_MOVIE_DELETE_RU }));
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovieById,
};
