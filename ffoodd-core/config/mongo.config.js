'use strict';

const { MongoClient } = require('mongodb');

const connect = () => new Promise((resolve, reject) => {
  const configs = global.configuration.database;

  MongoClient.connect(
    configs.connectionString,
    configs.attributes,
    (err, client) => {
      if (err)
        return reject(err);

      const db = client.db(configs.dbName);
      resolve(db);
    }
  )
})

module.exports = Object.create({ connect });
