'use strict';

const spdy = require('spdy');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const appRoot = require('app-root-path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let morganFormat = ':method :url :status :res[content-length] - :response-time ms';

const start = ({ serverConfigs: { port, ssl }, logger, requestMiddleware, rootRoute }) => async () => {
  process.on('uncaughtException', err => {  
    logger.error('Unhandled Exception', err);
  });

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  });

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

  app.use(requestMiddleware.wirePreRequest);
  
  app.use('/user', rootRoute);

  app.use(requestMiddleware.wirePostRequest);

  app.use(requestMiddleware.wireNotFoundMiddleware);

  const server = await app.listen(port);
  logger.info(`SERVER IS NOW LISTENING ON PORT ${server.address().port}`);

  return server;
}

module.exports = Object.create({ start })
