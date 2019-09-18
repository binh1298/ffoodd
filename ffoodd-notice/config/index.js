const logger = require('./logger.config');
const mongo = require('./mongo.config');
const amqp = require('./amqp.config');
const serverConfigs = require('./server.config');
const environment = require('./environment.config');

global.configuration = environment;

module.exports = {
  initialize: async () => {
  	const { createContainer, asValue } = require('awilix');

		const container = createContainer();
	  const db = await mongo.connect();
	  const amqpConnection = await amqp.connect({ logger });

	  logger.info('gRPC <---- MongoDB [connected]');

	  container.register({
	    logger: asValue(logger),
	    db: asValue(db),
	    amqp: asValue(amqpConnection),
	    serverConfigs: asValue(serverConfigs)
	  });

	  return container;
  }
}
