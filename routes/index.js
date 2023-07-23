const router = require('express').Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const { auth } = require('../middlewares/auth');
const { errorPage } = require('../middlewares/errorPage');
const { ROUTE_PATH_ALL } = require('../utils/constants');

router.use(authRouter);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.use(ROUTE_PATH_ALL, errorPage);

module.exports = router;
