const { createContainer, asValue } = require('awilix');

const initDI = ({ logger, database }) => async () => {
  const container = createContainer();
  const db = await database.connect();

  logger.info('gRPC <---- MongoDB [connected]');

  container.register({
    logger: asValue(logger),
    db: asValue(db)
  });

  return container;
}

module.exports = { initDI };
