const { createContainer, asValue, asFunction } = require('awilix');

const initDI = ({ logger, database, amqp }) => async () => {
  const container = createContainer();
  const db = await database.connect();

  logger.info('gRPC <---- MongoDB [connected]');

  container.register({
    logger: asValue(logger),
    db: asValue(db),
    amqp: asFunction(amqp)
  });

  return container;
}

module.exports = { initDI };
