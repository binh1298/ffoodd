'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const { ObjectID } = require('mongodb');

module.exports = ({ db }) => {
  const collection = db.collection('accounts');
  
  const findById = async ({ account_id }) => {
    return collection.findOne({ account_id });
  }

  const findManyByIds = async ({ account_ids }) => {
    const accounts = [];
    const cursor = await collection.find({ account_id: { $in: account_ids } });
    cursor.forEach((a, i) => account.push(a));
    
    return accounts;
  }

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
    findById,
    findManyByIds,
    create,
    update,
    remove
  };
}
