'use strict';

require('dotenv').config();

const server = require('./server/server');
const { database, serverConfigs, logger } = require('../config/');

database.connect()
    .then(() => {
        logger.info(`Connected to MongoDB`);
      
        return server.start(serverConfigs)
    })
    .then(app => {
        logger.info(`SERVER IS NOW LISTENING ON PORT ${app.address().port}`);
        app.on('app.close', () => {
            logger.info('App closed');
        });
    })
    .catch(err => {
        logger.error(err.message);
        logger.error(err.stack);
    });