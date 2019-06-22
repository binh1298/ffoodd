'use strict';

require('dotenv').config();
const { asValue } = require('awilix');

const server = require('./server/server');
const middlewares = require('./middlewares/');
const config = require('../config/');

const services = {
  Account: {},
  Meal: {}
}

async function start() {
  const container = await config.initialize();
  const logger = container.resolve('logger');

  try {
    process.on('uncaughtException', err => {  
      logger.error('Unhandled Exception', err);
    })
    process.on('uncaughtRejection', (err, promise) => {
      logger.error('Unhandled Rejection', err);
    })

    // const services = await services.start();
    container.register({ services: asValue(services) });

    const resolvedMiddlewares = await middlewares.initialize(container);
    container.register({ middlewares: asValue(resolvedMiddlewares) });

    const app = await server.start(container);

    logger.info(`SERVER IS NOW LISTENING ON PORT ${app.address().port}`);
    app.on('app.close', () => {
      logger.info('App closed');
    });
  } catch(err) {
    logger.error(err.messages);
    logger.error(err.stack);
  }
}

start();
