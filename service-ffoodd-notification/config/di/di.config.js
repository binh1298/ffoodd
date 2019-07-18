const { createContainer, asValue, asFunction } = require('awilix');

const initDI = ({ logger, database, amqp }) => async () => {
  const container = createContainer();
  const db = await database.connect();
  const amqpConnection = await amqp.connect({ logger });
  
  logger.info('gRPC <---- MongoDB [connected]');

  container.register({
    logger: asValue(logger),
    db: asValue(db),
    amqp: asValue(amqpConnection)
  });

  return container;
}

module.exports = { initDI };
