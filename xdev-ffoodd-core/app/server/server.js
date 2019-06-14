const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { logger } = require('../../config/');
const rootRoute = require('../routes/');

let morganFormat = ':method :url :status :res[content-length] - :response-time ms';

const start = ({ port }) => {
  return new Promise((resolve, reject) => {
    if (!port)
      reject(new Error('port is require'));

    const app = express();

    if (process.env.NODE_ENV === 'production')
      morganFormat = 'combined';

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(helmet());
    app.use(morgan(morganFormat, { stream: logger.stream}));

    app.use(cookieParser());

    app.use('/api', rootRoute);

    const server = app.listen(port, () => resolve(server));
  })
}

module.exports = Object.create({ start })
