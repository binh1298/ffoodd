'use strict';

require('dotenv').config();
const { asValue, asFunction } = require('awilix');

const server = require('./server/server');
const config = require('../config/');

const middlewares = require('./middlewares/');
const controllers = require('./controllers/');
const services = require('./services/');
const routes = require('./routes/');

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

    const resolveds = await Promise.all([
      middlewares.initialize(),
      controllers.initialize(),
      services.initialize(),
      routes.initialize()
    ]);

    for (let resolved of resolveds) {
      for (let key in resolved) {
        logger.info(`DI register: ${key}`);
        container.register({
          [key]: asFunction(resolved[key])
        });
      }
    }

    // const app = await server.start();

    // logger.info(`SERVER IS NOW LISTENING ON PORT ${app.address().port}`);
    // app.on('app.close', () => {
    //   logger.info('App closed');
    // });
  } catch(err) {
    logger.error(err.messages);
    logger.error(err.stack);
  }
}

start();
