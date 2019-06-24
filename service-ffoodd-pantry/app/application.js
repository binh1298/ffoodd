'use strict';

require('dotenv').config();

const server = require('./server/server');
const config = require('../config');
const { asFunction } = require('awilix');

const repositories = require('./repositories/');
const controllers = require('./controllers/');
const routes = require('./routes/');
const libs = require('./libs/');
const pantries = require('./pantries/');

let container;

const registerApplicationDependencies = async () => {
  container = await config.initialize();
  const logger = container.resolve('logger');

  const resolveds = await Promise.all([
    repositories.initialize(),
    controllers.initialize(),
    routes.initialize(),
    libs.initialize(),
    pantries.initialize()
  ]);

  for (let resolved of resolveds) {
    for (let key in resolved) {
      logger.info(`DI register: ${key}`);
      container.register({
        [key]: asFunction(resolved[key])
      });
    }
  }

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
