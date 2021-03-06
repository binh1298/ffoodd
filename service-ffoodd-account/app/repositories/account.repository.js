'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const { ObjectId } = require('mongodb');

module.exports = ({ db }) => {
  const collection = db.collection('accounts')
  
  const findById = async _id => {
    return collection.findOne({ _id: ObjectId(_id) });
  }

  const create = async ({ username, password, email, lastname, firstname }) => {
    const hashPassword = await bcrypt.hash(password, 10);

    const created = await collection.insertOne({
      username, password: hashPassword, email, lastname, firstname
    });

    return created.ops[0];
  }

  const update = async ({ _id, firstname, lastname, roles }) => {
    return collection.updateOne({ _id: ObjectId(_id) }, { $set: { firstname, lastname, roles } });
  }

  const remove = async _id => {
    return collection.deleteOne({ _id: ObjectId(_id) });
  }

  const removeMany = async ({ _ids }) => {
    return collection.deleteMany({ _id: { $in: _ids } });
  }

  const newEmailVerifyKey = async ({ _id, username }) => {
    const queryOptions = {};
    if (_id) queryOptions._id =  ObjectId(_id);
    if (username) queryOptions.username =  username;

    const verifyEmailKey = randomKey(6);
    const verifyEmailKeyExpDate = generateExpirationDate();

    const updated = await collection.findOneAndUpdate(queryOptions,{ $set: { verifyEmailKey, verifyEmailKeyExpDate } });
    const account = updated.value;
    
    return { email: account.email, verifyEmailKey };
  }

  const verifyEmail = async ({ _id, email }) => {
    const account = await collection.findOne({ _id: ObjectId(_id) });

    if (account.verifyEmailKey != key)
      return false;

    if (
      moment(account.expirationEmailKey)
        .isBefore( (new Date()).toJSON() )
    ) {
      return false;
    }
    
    collection.updateOne(account, { $set: { isVerified: true } });

    return true;
  }

  const findByUsername = async username => {
    return await collection.findOne({ username });
  }

  const isVerified = async _id => {
    const account = await collection.findOne({ _id: OjbectId(_id) });

    return account.isVerified;
  }

  const resetPassword = async ({ username, key, password }) => {
    const account = await collection.findOne({ username });

    if (!account)
      return false;

    if (account.verifyEmailKey != key)
      return false;

    if (
      moment(account.expirationEmailKey)
        .isBefore( (new Date()).toJSON() )
    ) {
      return false;
    }

    const newPassword = await bcrypt.hash(password, 10);

    collection.updateOne(account, { $set: { passsword: newPassword } });

    return true;
  }

  const updatePasswordById = async ({ _id, password }) => {
    const newPassword = await bcrypt.hash(password, 10);

    collection.updateOne({ _id: ObjectId(_id) }, { $set: { password: newPassword } });
  }

  const findRolesById = async _id => {
    const account = await collection.findOne({ _id: ObjectId(_id) });

    return account.roles;
  }

  const updateEmailById = async ({ _id, email }) => {
    return collection.updateOne({ _id: ObjectId(_id) }, { $set: { email } });
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

  return {
    findById,
    create,
    update,
    remove,
    removeMany,
    newEmailVerifyKey,
    verifyEmail,
    findByUsername,
    isVerified,
    resetPassword,
    updatePasswordById,
    findRolesById,
    updateEmailById
  }
}
