const { createContainer, asValue } = require('awilix');

const initDI = ({ logger, serverConfigs }) => async () => {
  const container = createContainer();

  container.register({
    logger: asValue(logger),
    serverConfigs: asValue(serverConfigs)
  });

  return container;
}

module.exports = { initDI };
