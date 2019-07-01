const logger = require('./logger');
const database = require('./database/mongoose.config');
const di = require('./di/');

module.exports = {
  initializeDIContainer: di.initialize({ logger, database })
};
