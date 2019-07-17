'use strict';

const { to } = require('await-to-js');

const messages = {
  ACCOUNT_FOUND: 'ACCOUNT_FOUND',
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
  ACCOUNT_CREATED: 'ACCOUNT_CREATED',
  ACCOUNT_UPDATED: 'ACCOUNT_UPDATED',
  ACCOUNT_REMOVED: 'ACCOUNT_REMOVED',
  ACCOUNT_REMOVED_MANY: 'ACCOUNT_REMOVED_MANY',
  ACCOUNT_EMAIL_NOT_PROVIDED: 'ACCOUNT_EMAIL_NOT_PROVIDED',
  ACCOUNT_EMAIL_VERIFY_KEY: 'ACCOUNT_EMAIL_VERIFY_KEY',
  ACCOUNT_COULD_NOT_VERIFIED: 'ACCOUNT_COULD_NOT_VERIFIED',
  ACCOUNT_VERIFIED: 'ACCOUNT_VERIFIED',
  ACCOUNT_RESET_PASSWORD_FAILED: 'ACCOUNT_RESET_PASSWORD_FAILED',
  ACCOUNT_PASSWORD_RESETTED: 'ACCOUNT_PASSWORD_RESETTED',
  ACCOUNT_PASSWORD_UPDATED: 'ACCOUNT_PASSWORD_UPDATED',
  ACCOUNT_FIND_ROLES_BY_ID: 'ACCOUNT_FIND_ROLES_BY_ID',
  ACCOUNT_EMAIL_UPDATED: 'ACCOUNT_EMAIL_UPDATED',
  ACCOUNT_SENT_FRIEND_REQUEST: 'ACCOUNT_SENT_FRIEND_REQUEST',
  ACCOUNT_FIND_FRIEND_REQUESTS: 'ACCOUNT_FIND_FRIEND_REQUESTS',
  ACCOUNT_FIND_SENT_FRIEND_REQUESTS: 'ACCOUNT_FIND_SENT_FRIEND_REQUESTS',
  ACCOUNT_ACCEPT_FRIEND_REQUEST: 'ACCOUNT_ACCEPT_FRIEND_REQUEST',
  ACCOUNT_REMOVE_FRIEND_REQUEST: 'ACCOUNT_REMOVE_FRIEND_REQUEST',
  ACCOUNT_ADD_OWN_MEAL: 'ACCOUNT_ADD_OWN_MEAL',
  ACCOUNT_REMOVE_OWN_MEAL: 'ACCOUNT_REMOVE_OWN_MEAL',
  ACCOUNT_FIND_OWN_MEAL: 'ACCOUNT_FIND_OWN_MEAL'
}

module.exports = ({ accountRepository: Account, amqp }) => {

  const findById = async (call, callback, next) => {
    const { _id } = call.request;
    const [ err, account ] = await to(Account.findById({ _id }));
    if (err) return next(err);

    if (!account)
      return callback(null, { success: true, message: messages.ACCOUNT_NOT_FOUND, account: null });

    callback(null, { success: true, message: messages.ACCOUNT_FOUND, account });
  }

  const create = async (call, callback, next) => {
    const [ err, account ] = await to(Account.create(call.request.account));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'CREATE_ACCOUNT',
      data: {
        _id: account._id,
        email: account.email
      }
    }});
    
    callback(null, { success: true, message: messages.ACCOUNT_CREATED, account });
  }

  const update = async (call, callback, next) => {
    const [ err ] = await to(Account.update(call.request));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_UPDATED });
  }

  const remove = async (call, callback, next) => {
    const { _id } = call.request;
    const [ err ] = await to(Account.remove({ _id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_REMOVED });
  }

  const removeMany = async (call, callback, next) => {
    const { _ids } = call.request;
    const [ err ] = await to(Account.removeMany({ _ids }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_REMOVED_MANY });
  }

  const newEmailVerifyKey = async (call, callback, next) => {
    const { _id, username } = call.request;
    const [ err, { email, verifyEmailKey } ] = await to(Account.newEmailVerifyKey({ _id, username }));
    if (err) return next(err);

    if (!email)
      return callback(null, { success: false, message:  messages.ACCOUNT_EMAIL_NOT_PROVIDED });

    callback(null, { success: true, message: messages.ACCOUNT_EMAIL_VERIFY_KEY });
  }

  const verifyEmail = async (call, callback, next) => {
    const { _id, key } = call.request;
    const [ err, result ] = await to(Account.verifyEmail({ _id, key }));
    if(err) return next(err);

    if (!result)
      return callback({ success: false, message: messages.ACCOUNT_COULD_NOT_VERIFIED });

    callback({ success: true, message: messages.ACCOUNT_VERIFIED });
  }

  const findByUsername = async (call, callback, next) => {
    const { username } = call.request;
    const [ err, account ] = await to(Account.findByUsername({ username }));
    if (err) return next(err);

    if (!account)
      return callback(null, { success: true, message: messages.ACCOUNT_NOT_FOUND, account: null });

    callback(null, { success: true, message: messages.ACCOUNT_FOUND, account })
  }

  const resetPassword = async (call, callback, next) => {
    const { username, password, key } = call.request;
    const [ err, result ] = await to(Account.resetPassword({ username, password, key }));
    if (err) return next(err);

    if (!result)
      return callback(null, { success: false, message: messages.ACCOUNT_RESET_PASSWORD_FAILED});

    callback(null, { success: true, message: messages.ACCOUNT_PASSWORD_RESETTED });
  }

  const updatePasswordById = async (call, callback, next) => {
    const { password, _id } = call.request;
    const [ err, result ] = await to(Account.updatePasswordById({ password, _id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_PASSWORD_UPDATED});
  }

  const findRolesById = async (call, callback, next) => {
    const { _id } = call.request;
    const [ err, roles ] = await to(Account.findRolesById({ _id }));
    if (err) return next(err);

    if (!roles)
      return callback(null, { success: true, message: message.ACCOUNT_NOT_FOUND, roles: null });

    callback(null, { success: true, message: messages.ACCOUNT_FIND_ROLES_BY_ID, roles });
  }

  const updateEmailById = async (call, callback, next) => {
    const { _id, email } = call.request;
    const [ err ] = await to(Account.updateEmailById({ _id, email }));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'UPDATE_EMAIL',
      data: { _id, email }
    }});

    callback(null, { success: true, message: messages.ACCOUNT_EMAIL_UPDATED });
  }

  const sendFriendRequest = async (call, callback, next) => {
    const { sender_id, target_id } = call.request;
    const [ err ] = await to(Account.sendFriendRequest({ sender_id, target_id }));

    callback(null, { success: true, message: messages.ACCOUNT_SENT_FRIEND_REQUEST });
  }

  const findFriendRequests = async (call, callback, next) => {
    const [ err, friendRequests ] = await to(Account.findFriendRequests({ _id: call.request._id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_FIND_FRIEND_REQUESTS, friendRequests });
  }

  const findSentFriendRequests = async (call, callback, next) => {
    const [ err, sentFriendRequests ] = await to(Account.findSentFriendRequests({ _id: call.request._id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_FIND_SENT_FRIEND_REQUESTS, sentFriendRequests });
  }

  const acceptFriendRequest = async (call, callback, next) => {
    const { sender_id, target_id } = call.request;
    const [ err ] = await to(Account.acceptFriendRequest({ sender_id, target_id }));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'ADD_FRIEND',
      data: { sender_id, target_id }
    }});

    callback(null, { success: true, message: messages.ACCOUNT_ACCEPT_FRIEND_REQUEST });
  }

  const removeFriendRequest = async (call, callback, next) => {
    const { sender_id, target_id } = call.request;
    const [ err ] = await to(Account.removeFriendRequest({ sender_id, target_id }));
    if (err) return next(err);

    amqp.sendToQueue({ queue: 'account-service', msg: {
      event: 'REMOVE_FRIEND',
      data: { sender_id, target_id }
    }});

    callback(null, { success: true, message: messages.ACCOUNT_REMOVE_FRIEND_REQUEST }); 
  }

  const addOwnMeal = async (call, callback, next) => {
    const { _id, meal_id } = call.request;
    const [ err ] = await to(Account.addOwnMeal({ _id, meal_id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_ADD_OWN_MEAL });
  }

  const removeOwnMeal = async (call, callback, next) => {
    const { _id, meal_id } = call.request;
    const [ err ] = await to(Account.removeOwnMeal({ _id, meal_id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_REMOVE_OWN_MEAL })
  }

  const findOwnMeals = async (call, callback, next) => {
    const [ err, account ] = await to(Account.findById({ _id: call.request._id }));
    if (err) return next(err);

    if (!account)
      return callback(null, { success: false, message: messages.ACCOUNT_NOT_FOUND, ownMeals: null });

    callback(null, { success: true, message: messages.ACCOUNT_FIND_OWN_MEAL, ownMeals: account.ownMeals });
  }

  return {
    findById,
    create,
    update,
    remove,
    removeMany,
    newEmailVerifyKey,
    verifyEmail,
    findByUsername,
    resetPassword,
    findRolesById,
    updatePasswordById,
    updateEmailById,
    sendFriendRequest,
    findFriendRequests,
    findSentFriendRequests,
    acceptFriendRequest,
    removeFriendRequest,
    addOwnMeal,
    removeOwnMeal,
    findOwnMeals
  }
}
