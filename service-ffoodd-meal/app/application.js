'use strict';

require('dotenv').config();

const server = require('./server/server');

const config = require('../config');
const { asFunction } = require('awilix');

const repositories = require('./repositories/');
const controllers = require('./controllers/');
const routes = require('./routes/');
const libs = require('./libs/');

let container;

const registerApplicationDependencies = async () => {
  container = await config.initializeDIContainer();
  // Get the logger
  const logger = container.resolve('logger');

  // Get the functions that returns objects that will later be
  // used as dependencies
  const resolveds = await Promise.all([
    repositories.initialize(),
    controllers.initialize(),
    routes.initialize(),
    libs.initialize()
  ]);

  // Register all the dependencies to the container
  for (let resolved of resolveds) {
    for (let key in resolved) {
      container.register({
        [key]: asFunction(resolved[key])
      });
    }
  }

  container.register({
    startServer: asFunction(server.start)
  });
};

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
