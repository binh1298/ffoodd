const logger = require('./logger/');
const di = require('./di/');
const serverConfigs = require('./server/');

module.exports = Object.create({
  initialize: di.initialize({ logger, serverConfigs })
});
