const { createContainer, asValue } = require('awilix');

const initDI = ({ logger }) => async () => {
  const container = createContainer();

  container.register({
    logger: asValue(logger)
  });

  return container;
}

module.exports = { initDI };
