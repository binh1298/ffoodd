const logger = require('./logger');
const di = require('./di/');

module.exports = {
  initialize: di.initialize({ logger })
}
