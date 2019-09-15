const logger = require('./logger');
const database = require('./database/mongo.config');
const di = require('./di/');
const amqp = require('./amqp/');

module.exports = {
  initialize: di.initialize({ logger, database, amqp })
}
