const { createContainer, asValue } = require('awilix');

const initDI = ({ logger, serverConfigs, database }) => async () => {
  const container = createContainer();
  const db = await database.connect();

  logger.info('gRPC <---- MongoDB [connected]');

  container.register({
    logger: asValue(logger),
    serverConfigs: asValue(serverConfigs),
    database: asValue(db)
  });

  return container;
}

module.exports = { initDI };
