'use strict';

require('dotenv').config();

const server = require('./server/server');
const config = require('../config');
const { asFunction } = require('awilix');

let container;

const registerApplicationDependencies = async () => {
  container = await config.initialize();
  const logger = container.resolve('logger');

  process.on('uncaughtException', err => {  
    logger.error('Unhandled Exception', err);
  })

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  })

  container.register({
    startServer: asFunction(server.start)
  });
}
registerApplicationDependencies()
  .then(() => {
    const startServer = container.resolve('startServer');
    return startServer();
  })
  .catch(err => {
    const logger = container.resolve('logger');
    logger.error(err.message);
    logger.error(err.stack);
  });
