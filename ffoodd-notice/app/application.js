'use strict';

const gRPCServer = require('./server/grpc-server');
const config = require('../config');
const { asFunction } = require('awilix');

const repositories = require('./repositories/');
const gRPCControllers = require('./grpc/controllers/');
const gRPCRoutes = require('./grpc/routes/');
const libs = require('./libs/');
const middlewares = require('./middlewares/');
const consumers = require('./amqp-consumers/');

let container;

const registerApplicationDependencies = async () => {
  container = await config.initialize();
  const logger = container.resolve('logger');

  const resolveds = await Promise.all([
    repositories.initialize(),
    gRPCControllers.initialize(),
    gRPCRoutes.initialize(),
    libs.initialize(),
    middlewares.initialize(),
    consumers.initialize()
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
    startGRPCServer: asFunction(gRPCServer.start)
  });
}

registerApplicationDependencies()
  .then(() => {
    const startGRPCServer = container.resolve('startGRPCServer');
    return startGRPCServer();
  })
  .then(() => {
    const accountConsumer = container.resolve('accountConsumer');
    accountConsumer.consume();
  })
  .catch(err => {
    const logger = container.resolve('logger');
    logger.error(err.message);
    logger.error(err.stack, err);
  });
