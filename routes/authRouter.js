const router = require('express').Router();
const {
  login,
  createUser,
} = require('../controllers/userController');

const {
  ROUTE_PATH_REGISTER,
  ROUTE_PATH_LOGIN,
} = require('../utils/constants');
const {
  validateAuth,
} = require('../middlewares/validators/authValidate');
const {
  validateUserCreate,
} = require('../middlewares/validators/userValidator');

router.post(
  ROUTE_PATH_REGISTER,
  validateUserCreate,
  createUser,
);
router.post(
  ROUTE_PATH_LOGIN,
  validateAuth,
  login,
);

module.exports = router;
