'use strict';

const start = ({ logger }) => () => new Promise((resolve, reject) => {
  process.on('uncaughtException', err => {  
    logger.error('Unhandled Exception', err);
  });

  process.on('uncaughtRejection', (err, promise) => {
    logger.error('Unhandled Rejection', err);
  });

});

module.exports = Object.create({ start });
