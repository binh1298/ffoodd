const logger = require('./logger');
const database = require('./database/mongo.config');
const di = require('./di/');

module.exports = {
  initialize: di.initialize({ logger, database })
}
