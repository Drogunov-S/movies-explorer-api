const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./utils/rateLimeterConfig');
const errorsHandler = require('./middlewares/errorsHandler');
const router = require('./routes');

const app = express();
const {
  PORT,
  DB_SCHEMA,
  DB_PORT,
  DB_URL,
} = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors());
app.use(express.json());
app.use(helmet());

mongoose.connect(`${DB_URL}:${DB_PORT}/${DB_SCHEMA}`).then(() => console.log('DB connection'));

app.use(requestLogger);
app.use(limiter);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`DB connect: ${mongoose.connection.readyState}`);
});
