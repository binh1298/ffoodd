'use strict';

require('dotenv').config();

const server = require('./server/server');
const { database, serverConfigs, logger } = require('../config');

process.on('uncaughtException', err => {  
  logger.error('Unhandled Exception', err);
})

process.on('uncaughtRejection', (err, promise) => {
  logger.error('Unhandled Rejection', err);
})

server.start()
  .then(app => {
    logger.info(`gRPC IS READY`);
  })
  .catch(err => {
    logger.error(err.message);
    logger.error(err.stack);
  });
