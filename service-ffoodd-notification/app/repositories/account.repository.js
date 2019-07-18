'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const { ObjectID } = require('mongodb');

module.exports = ({ db }) => {
  const collection = db.collection('accounts');
  
  const create = async ({ account_id, email }) => {
    return collection.insertOne({ account_id, email });
  }

  const update = async ({ account_id, email }) => {
    return collection.updateOne({ account_id }, { $set: { email } });
  }

  const remove = async ({ account_id }) => {
    return collection.deleteOne({ account_id });
  }

  return {
    create,
    update,
    remove
  };
}
