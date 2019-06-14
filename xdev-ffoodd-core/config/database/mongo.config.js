'use strict';

const mongoose = require('mongoose');

const config = require('./db.config');

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect(config.connectionString, config.attributes)
    .then(() => {
      resolve();
    })
    .catch(err => {
      reject(new Error(`Error while connecting to MongoDB, err: ${err.stack}`));
    });
})

module.exports = Object.create({ connect })
