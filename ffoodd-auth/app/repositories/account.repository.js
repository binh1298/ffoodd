'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const { ObjectId } = require('mongodb');

module.exports = ({ db }) => {
  const collection = db.collection('accounts')

  const findById = async ({ _id }) => {
    return collection.findOne({ _id: ObjectId(_id) });
  }

  const create = async ({ username, password, email, lastname, firstname }) => {
    const hashPassword = await bcrypt.hash(password, 10);

    const response = await collection.insertOne({
      username, password: hashPassword, email, lastname, firstname
    });

    return response.ops[0];
  }

  const update = async ({ _id, firstname, lastname, roles }) => {
    return collection.updateOne({ _id: ObjectId(_id) }, { $set: { firstname, lastname, roles } });
  }

  const remove = async ({ _id }) => {
    return collection.deleteOne({ _id: ObjectId(_id) });
  }

  const removeMany = async ({ _ids }) => {
    return collection.deleteMany({ _id: { $in: _ids } });
  }

  const newEmailVerifyKey = async ({ _id, username }) => {
    const queryOptions = {};
    if (_id) queryOptions._id =  ObjectId(_id);
    if (username) queryOptions.username =  username;

    if (Object.keys(queryOptions).length === 0)
      return null;

    const verifyEmailKey = randomKey(6);
    const verifyEmailKeyExpDate = generateExpirationDate();

    const response = await collection.findOneAndUpdate(queryOptions, { $set: { verifyEmailKey, verifyEmailKeyExpDate } });
    const account = response.value;
    if (!account)
      return null;

    return { email: account.email, verifyEmailKey };
  }

  const verifyEmail = async ({ _id, email }) => {
    const account = await collection.findOne({ _id: ObjectId(_id) });

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

    collection.updateOne(account, { $set: { isVerified: true } });

    return true;
  }

  const findByUsername = async ({ username }) => {
    return collection.findOne({ username });
  }

  const isVerified = async ({ _id }) => {
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

  const findRolesById = async ({ _id }) => {
    const account = await collection.findOne({ _id: ObjectId(_id) });

    if (!account)
      return null;

    return account.roles;
  }

  const updateEmailById = async ({ _id, email }) => {
    return collection.updateOne({ _id: ObjectId(_id) }, { $set: { email } });
  }

  const sendFrReq = async ({ sender_id, target_id }) => {
    collection.updateOne({ _id: ObjectId(sender_id) }, { $push: {
      sentFrReqs: target_id
    }});

    collection.updateOne({ _id: ObjectId(target_id) }, { $push: {
      frReqs: sender_id
    }});
  }

  const findSentFrReqs = async ({ _id }) => {
    const account = await findById({ _id });
    const sentFrReqs = [];

    if (!account.sentFrReqs || account.sentFrReqs.length === 0)
      return [];

    for (let target_id of account.sentFrReqs) {;
      const target = await findById({ _id: target_id });

      sentFrReqs.push({
        _id: target_id,
        firstname: target.firstname,
        lastname: target.lastname
      });
    }

    return sentFrReqs;
  }

  const findFrReqs = async ({ _id }) => {
    const account = await findById({ _id });
    const frReqs = [];

    if (!account.frReqs || account.frReqs.length === 0)
      return [];

    for (let target_id of account.frReqs) {;
      const target = await findById({ _id: target_id });

      frReqs.push({
        _id: target_id,
        firstname: target.firstname,
        lastname: target.lastname
      });
    }

    return frReqs;
  }

  const acceptFrReq = async ({ sender_id, target_id }) => {
    const senderUpdateOptons = {
      $push: { friends: target_id },
      $pull: { sentFrReqs: target_id }
    };

    const targetUpdateOptons = {
      $push: { friends: sender_id },
      $pull: { FrReqs: sender_id }
    };

    collection.updateOne({ _id: ObjectId(sender_id) }, senderUpdateOptons);
    collection.updateOne({ _id: ObjectId(target_id) }, targetUpdateOptons);
  }

  const removeFrReq = async ({ sender_id, target_id }) => {
    const senderUpdateOptons = {
      $pull: { sentFrReqs: target_id }
    };

    const targetUpdateOptons = {
      $pull: { FrReqs: sender_id }
    };

    collection.updateOne({ _id: ObjectId(sender_id) }, senderUpdateOptons);
    collection.updateOne({ _id: ObjectId(target_id) }, targetUpdateOptons);
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
    updateEmailById,
    sendFrReq,
    findFrReqs,
    findSentFrReqs,
    acceptFrReq,
    removeFrReq
  }
}
