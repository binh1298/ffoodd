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
    return null;

  const emailVerifyKey = randomKey(6);
  const verifyEmailKeyExpDate = generateExpirationDate();

  account.emailVerifyKey = emailVerifyKey;
  account.verifyEmailKeyExpDate = verifyEmailKeyExpDate;

  account.save();

  return { email: account.email, emailVerifyKey };
}

const verifyEmail = async ({ id, email }) => {
  const account = await AccountModel.findById(id);

  if (account.emailVerifyKey != key)
    return await 'Key invalid';

  if (
    moment(account.expirationEmailKey)
      .isBefore( (new Date()).toJSON() )
  ) {
    return await 'Key expired';
  }
  
  account.isVerified = true;

  account.save();

  return await 'Verified';
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
  // findRolesById,
  // findByUsername,
  // isVerified,
  verifyEmail,
  // verifyPassword,
  // updatePasswordById
}
