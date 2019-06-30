'use strict';

require('dotenv').config();
const { asValue, asFunction } = require('awilix');

const server = require('./server/server');
const config = require('../config/');

const middlewares = require('./middlewares/');
const controllers = require('./controllers/');
const services = require('./services/');
const routes = require('./routes/');

let container;

const registerApplicationDependences = async () => {
  container = await config.initialize();
  const logger = container.resolve('logger');

  const resolveds = await Promise.all([
    middlewares.initialize(),
    controllers.initialize(),
    services.initialize(),
    routes.initialize()
  ]);

  for (let resolved of resolveds) {
    for (let key in resolved) {
      logger.info(`DI register <---- ${key}`);
      container.register({
        [key]: asFunction(resolved[key])
      });
    }
  }

  container.register({
    startServer: asFunction(server.start)
  });
}

registerApplicationDependences()
  .then(() => {
    const startServer = container.resolve('startServer');
    startServer();
  })
  .catch(err => {
    const logger = container.resolve('logger');
    logger.error(err.message);
    logger.error(err.stack);
  });
