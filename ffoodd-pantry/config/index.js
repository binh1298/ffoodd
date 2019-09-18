const { createContainer, asValue } = require('awilix');

const logger = require('./logger.config');
const serverConfigs = require('./server.config');

module.exports = {
  initialize: async () => {
		const container = createContainer();

	  container.register({
	    logger: asValue(logger),
	    serverConfigs: asValue(serverConfigs)
	  });

	  return container;
  }
}
