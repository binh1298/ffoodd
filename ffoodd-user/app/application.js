'use strict';

require('dotenv').config();
const { asValue, asFunction } = require('awilix');

const server = require('./server/server');
const config = require('../config/');

const middlewares = require('./middlewares/');
const controllers = require('./controllers/');
const services = require('./services/');
const routes = require('./routes/');
const validators = require('./validators');
const helpers = require('./helpers/');

let container;

const registerApplicationDependences = async () => {
  container = await config.initialize();
  const logger = container.resolve('logger');

  const resolveds = await Promise.all([
    middlewares.initialize(),
    controllers.initialize(),
    routes.initialize(),
    validators.initialize()
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
    startServer: asFunction(server.start),
    connectToServices: asFunction(services.connect),
    helpers: asValue(helpers)
  });
}

registerApplicationDependences()
  .then(() => {
    const connectToServices = container.resolve('connectToServices');
    return connectToServices();
  })
  .then(gRPCClientServices => {
    const logger = container.resolve('logger');

    for (let service in gRPCClientServices) {
      logger.info(`SERVICE - DI register <---- ${service}`);
      container.register({
        [service]: asValue(gRPCClientServices[service])
      });
    }
  })
  .then(() => {
    const startServer = container.resolve('startServer');
    return startServer();
  })
  .catch(err => {
    const logger = container.resolve('logger');
    logger.error(err.message);
    logger.error(err.stack);
  });
