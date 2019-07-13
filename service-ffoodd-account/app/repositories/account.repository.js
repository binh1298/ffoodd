'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const { ObjectID } = require('mongodb');

module.exports = ({ db }) => {
  const collection = db.collection('accounts')
  
  const findById = async id => {
    return collection.findOne({ _id: ObjectId(id) });
  }

  const create = async ({ username, password, email, lastname, firstname }) => {
    const hashPassword = await bcrypt.hash(password, 10);

    return collection.insertOne({
      username, password: hashPassword, email, lastname, firstname
    });
  }

  const update = async ({ id, firstname, lastname, roles }) => {
    return collection.updateOne({ _id: ObjectId(id) }, { $set: { fistname, firstname, roles } });
  }

  const remove = async (id) => {
    return collection.deleteOne({ _id: ObjectId(id) });
  }

  const removeMany = async ({ ids }) => {
    return collection.deleteMany({ _id: { $in: ids } });
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

  const isVerified = async id => {
    const account = await collection.findOne({ _id: OjbectId(id) });

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

    const newPassword = await bcript.hash(password, 10);

    collection.updateOne(account, { $set: { passsword: newPassword } });

    return true;
  }

  const updatePasswordById = async ({ id, password }) => {
    const newPassword = await bcript.hash(password, 10);

    collection.updateOne({ _id: ObjectId(id) }, { $set: { password: newPassword } });
  }

  const findRolesById = async id => {
    const account = await collection.findOne({ _id: ObjectId(id) });

    return account.roles;
  }

  const updateEmailById = async ({ id, email }) => {
    return collection.updateOne({ id: ObjectId(id) }, { $set: { email } });
  }

  const sendFriendRequest = async ({ sender_id, target_id }) => {
    collection.findOne({ _id: ObjectId(sender_id) }, { $push: {
      sentFriendRequests: target_id
    }});
    
    collection.findOne({ _id: ObjectId(target_id) }, { $push: {
      friendRequests: sender_id
    }});
  }

  const findFriendRequests = async ({ _id }) => {
    const account = await findById({ _id });
    const friendRequests = [];

    for (let target_id of account.friendRequests) {;
      const target = await findById({ _id: target_id });

      friendRequests.push({
        _id: target_id,
        firstname: target.firstname,
        lastname: target.lastname
      });
    }

    return friendRequest;
  }

  const findSentFriendRequests = async ({ _id }) => {
    const account = await findById({ _id });
    const sentFriendRequests = [];

    for (let target_id of account.sentFriendRequests) {;
      const target = await findById({ _id: target_id });

      sentFriendRequests.push({
        _id: target_id,
        firstname: target.firstname,
        lastname: target.lastname
      });
    }

    return friendRequest;
  }

  const acceptFriendRequest = async ({ sender_id, target_id }) => {
    const senderUpdateOptons = {
      $push: { friends: target_id },
      $pull: { sentFriendRequests: target_id }
    };

    const targetUpdateOptons = {
      $push: { friends: sender_id },
      $pull: { friendRequests: sender_id }
    };

    collection.updateOne({ _id: ObjectId(sender_id) }, senderUpdateOptons);
    collection.updateOne({ _id: ObjectId(target_id) }, targetUpdateOptons);
  }

  const removeFriendRequest = async ({ sender_id, target_id }) => {
    const senderUpdateOptons = {
      $pull: { sentFriendRequests: target_id }
    };

    const targetUpdateOptons = {
      $pull: { friendRequests: sender_id }
    };

    collection.updateOne({ _id: ObjectId(sender_id) }, senderUpdateOptons);
    collection.updateOne({ _id: ObjectId(target_id) }, targetUpdateOptons);
  }

  const addOwnMeal = async ({ _id, meal_id }) => {
    collection.updateOne({ _id: ObjectId(_id) }, { $push: {
      ownMeals: meal_id
    }});
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
    sendFriendRequest,
    findFriendRequests,
    findSentFriendRequests,
    acceptFriendRequest,
    removeFriendRequest,
    addOwnMeal
  }
}
