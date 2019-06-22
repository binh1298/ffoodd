'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const { ObjectID } = require('mongodb');
const { database } = require('../../config/');
let collection;

database.connect()
  .then(db => {
    collection = db.collection('accounts');
  });

const findById = async id => {
  return await collection.findOne({ _id: ObjectId(id) });
}

const create = async ({ username, password, email, lastname, firstname }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  return await collection.insertOne({
    username, password: hashPassword, email, lastname, firstname
  });
}

const newEmailVerifyKey = async ({ id, username }) => {
  const queryOptions = {};

  if (id) queryOptions._id =  ObjectId(id);
  if (username) queryOptions.username =  username;

  const verifyEmailKey = randomKey(6);
  const verifyEmailKeyExpDate = generateExpirationDate();

  const updated = await collection.findOneAndUpdate(queryOptions,{ $set: { verifyEmailKey, verifyEmailKeyExpDate } });
  const account = updated.value;
  
  return { email: account.email, verifyEmailKey };
}

const verifyEmail = async ({ id, email }) => {
  const account = await collection.findOne({ _id: ObjectId(id) });

  if (account.verifyEmailKey != key)
    return await false;

  if (
    moment(account.expirationEmailKey)
      .isBefore( (new Date()).toJSON() )
  ) {
    return await false;
  }
  
  collection.updateOne(account, { $set: { isVerified: true } });

  return await true;
}

const findByUsername = async username => {
  return await collection.findOne({ username });

  if (!account)
    return false;
}

const isVerified = async id => {
  const account = await collection.findOne({ _id: OjbectId(id) });

  return await account.isVerified;
}

const resetPassword = async ({ username, key, password }) => {
  const account = await collection.findOne({ username });

  if (!account)
    return false;

  if (account.verifyEmailKey != key)
    return await false;

  if (
    moment(account.expirationEmailKey)
      .isBefore( (new Date()).toJSON() )
  ) {
    return await false;
  }

  const newPassword = await bcript.hash(password, 10);

  collection.updateOne(account, { $set: { passsword: newPassword } });

  return true;
}

const updatePasswordById = async ({ id, password }) => {
  collection.updateOne({ _id: ObjectId(id) }, { $set: { password } });
}

/**private */
const generateExpirationDate = () => {
    const date = (new Date).toJSON();
    return moment(date).add(
      process.env.EMAILKEY_DURATION,
      'seconds'
    ).toJSON();
}

const randomKey = length => Array.from({ length })
  .map(() => Math.floor(Math.random() * 10))
  .join('');

module.exports = {
  findById,
  create,
  newEmailVerifyKey,
  verifyEmail,
  findByUsername,
  isVerified,
  resetPassword,
  // findRolesById,
  updatePasswordById
}
