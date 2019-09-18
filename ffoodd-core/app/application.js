'use strict';

const { asValue, asFunction } = require('awilix');

const config = require('../config');
const grpcServer = require('./server/grpc-server');
const expressServer = require('./server/express-server');

const repositories = require('./repositories/');
const middlewares = require('./middlewares/');
const routes = require('./routes/');
const services = require('./services/');
const helpers = require('./helpers/');
const libs = require('./libs/');

const gRPCControllers = require('./grpc/controllers/');
const gRPCRoutes = require('./grpc/routes/');

let container;

const registerApplicationDependencies = async () => {
  container = await config.initialize();
  const logger = container.resolve('logger');

  // Get the functions that returns objects that will later be used as dependencies
  const dependencies = await Promise.all([
    repositories.gatherDependencies(),
    middlewares.gatherDependencies(),
    routes.gatherDependencies(),
    gRPCControllers.gatherDependencies(),
    gRPCRoutes.gatherDependencies(),
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
    startGRPCServer: asFunction(grpcServer.start),
    startExpressServer: asFunction(expressServer.start),
    connectToServices: asFunction(services.connect),
    helpers: asValue(helpers)
  });
};

registerApplicationDependencies()
  .then(() => {
    const connectToServices = container.resolve('connectToServices');
    return connectToServices();
  })
  .then(() => {
    const startGRPCServer = container.resolve('startGRPCServer');
    return startGRPCServer();
  })
  .then(() => {
    const startExpressServer = container.resolve('startExpressServer');
    return startExpressServer();
  })
  .catch(err => {
    const logger = container.resolve('logger');
    logger.error(err.message);
    logger.error(err.stack);
  });
