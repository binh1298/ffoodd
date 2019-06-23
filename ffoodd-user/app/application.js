'use strict';

require('dotenv').config();
const { asValue } = require('awilix');

const server = require('./server/server');
const config = require('../config/');

const middlewares = require('./middlewares/');
const controllers = require('./controllers/');
const services = require('./services/');

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

    const resolvedServices = await services.initialize();
    container.register({ services: asValue(resolvedServices) });

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
