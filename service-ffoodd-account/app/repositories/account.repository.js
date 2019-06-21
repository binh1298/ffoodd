'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const AccountModel = require('../models/account.model');
const ObjectID = require('mongoose').ObjectId;

const findById = async id => {
  return await AccountModel.findById(id);
}

const create = async ({ username, password, email, lastname, firstname }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const account = new AccountModel({
    username, password: hashPassword, email, lastname, firstname
  });

  return await account.save();
}

const newEmailVerifyKey = async ({ id, username }) => {
  const queryOptions = {};

  if (id) queryOptions._id =  ObjectId(id);
  if (username) queryOptions.username =  username;

  const account = await AccountModel.findOne(queryOptions);
  if (!account)
    return false;

  const verifyEmailKey = randomKey(6);
  const verifyEmailKeyExpDate = generateExpirationDate();

  account.verifyEmailKey = verifyEmailKey;
  account.verifyEmailKeyExpDate = verifyEmailKeyExpDate;

  account.save();

  return { email: account.email, verifyEmailKey };
}

const verifyEmail = async ({ id, email }) => {
  const account = await AccountModel.findById(id);

  if (account.verifyEmailKey != key)
    return await false;

  if (
    moment(account.expirationEmailKey)
      .isBefore( (new Date()).toJSON() )
  ) {
    return await false;
  }
  
  account.isVerified = true;

  account.save();

  return await true;
}

const findByUsername = async username => {
  return await AccountModel.findOne({ username });

  if (!account)
    return false;
}

const isVerified = async id => {
  const account = await AccountModel.findOne({ id }).select('isVerified');

  return await account.isVerified;
}

const resetPassword = async ({ username, key, password }) => {
  const account = await AccountModel.findOne({ username });

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

  account.password = await bcript.hash(password, 10);

  account.save();

  return true;
}

/**private */
const generateExpirationDate = () => {
    const date = (new Date).toJSON();
    return moment(date).add(
      process.env.EMAILKEY_DURATION,
      'seconds'
    ).toJSON();
}

const updatePasswordById = async ({ id, password }) => {
  const account = AccountModel.findOne({ id });

  account.password = await bcript.hash(password, 10);

  account.save();

  return true;
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
