'use strict';

require('dotenv').config();

const server = require('./server/server');
const { database, serverConfigs, logger } = require('../config/');

database.connect()
  .then(() => {
    logger.info(`Connected to MongoDB`);
  
    return server.start(serverConfigs)
  })
  .then(app => {
    logger.info(`gRPC IS READY`);
  })
  .catch(err => {
    logger.error(err.message);
    logger.error(err.stack);
  });
