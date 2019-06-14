'use strict';

require('dotenv').config();

const server = require('./server/server');
const { database, serverConfigs, logger } = require('../config/');

database.connect()
    .then(() => {
        logger.info(`Connected to MongoDB`);
        const test = new Account({
          lastname: 'Pham',
          firstname: 'Binh',
          email: 'binh1298@gmail.com',
          password: '123123',
          username: 'binh1298'
        })
        test.save();
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
