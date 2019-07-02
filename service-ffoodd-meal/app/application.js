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
  const logger = container.resolve('logger');

  // Get the functions that returns objects that will later be used as dependencies
  const dependencies = await Promise.all([
    repositories.gatherDependencies(),
    controllers.gatherDependencies(),
    routes.gatherDependencies(),
    libs.gatherDependencies()
  ]);

  // Register all the dependencies to the container
  for (let dependency of dependencies) {
    for (let object in dependency) {
      container.register({
        [object]: asFunction(dependency[object])
      });
      logger.info(`DI Register: ${object}`);
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
