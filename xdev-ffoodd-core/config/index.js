const serverSettings = require('./server.config');
const logger = require('./logger/');
const database = require('./database/mongo.config')

module.exports = {
    serverSettings,
    logger,
    database
}