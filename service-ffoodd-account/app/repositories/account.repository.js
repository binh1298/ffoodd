'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const AccountModel = require('../models/account.model');

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

const newEmailVerifyKey = ({ id, username }) => {
  
}

const isVerified = id => {
    
}

const verifyEmail = ({id, key}) => {
    
}

const verifyPassword = ({ username, key }) => {
    
}

const updatePasswordById = ({ id, password }) => {
    
}

const findRolesById = id => {
    
}

const findByUsername = username => {

}

/**private */
const generateExpirationDate = () => {
    const date = (new Date).toJSON();
    return moment(date).add(
      process.env.EMAILKEY_DURATION,
      'seconds'
    ).toJSON();
}

const randomKey = length =>Array.from({ length })
  .map(() => Math.floor(Math.random() * 10))
  .join('');

module.exports = {
  findById,
  create,
  findRolesById,
  findByUsername,
  newEmailVerifyKey,
  isVerified,
  verifyEmail,
  verifyPassword,
  updatePasswordById
}
