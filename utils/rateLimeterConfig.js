const rateLimit = require('express-rate-limit');

const { REQUEST_RATE_LIMIT_WINDOWS_MS, REQUEST_RATE_LIMIT_COUNT } = require('./config');

const limiter = rateLimit.rateLimit({
  windowMs: REQUEST_RATE_LIMIT_WINDOWS_MS,
  max: REQUEST_RATE_LIMIT_COUNT,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
