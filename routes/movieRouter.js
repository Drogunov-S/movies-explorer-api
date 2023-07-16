const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movieController');
const {
  ROUTE_PATH_MOVIES,
  ROUTE_PATH_MOVIES_ID,
} = require('../utils/constants');
const {
  validateCreateMovie,
  validateMovieId,
} = require('../middlewares/validators/movieValidator');

router.get(ROUTE_PATH_MOVIES, getMovies);
router.post(
  ROUTE_PATH_MOVIES,
  validateCreateMovie,
  createMovie,
);
router.delete(
  ROUTE_PATH_MOVIES_ID,
  validateMovieId,
  deleteMovieById,
);

module.exports = router;
