const router = require('express').Router();
const {
  updateUserWithParam,
  getAboutMe,
} = require('../controllers/userController');

const {
  ROUTE_PATH_USER_ME,
} = require('../utils/constants');
const {
  validateUser,
} = require('../middlewares/validators/userValidator');

router.get(ROUTE_PATH_USER_ME, getAboutMe);
router.patch(ROUTE_PATH_USER_ME, validateUser, updateUserWithParam);

module.exports = router;
