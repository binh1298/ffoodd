'use strict';

const { to } = require('await-to-js');

const messages = {
  ACCOUNT_FIND_BY_ID: 'ACCOUNT_FIND_BY_ID',
  ACCOUNT_CREATED: 'ACCOUNT_CREATED',
  ACCOUNT_UPDATED: 'ACCOUNT_UPDATED',
  ACCOUNT_REMOVED: 'ACCOUNT_REMOVED',
  ACCOUNT_REMOVED_MANY: 'ACCOUNT_REMOVED_MANY',
  ACCOUNT_EMAIL_NOT_PROVIDED: 'ACCOUNT_EMAIL_NOT_PROVIDED',
  ACCOUNT_EMAIL_VERIFY_KEY: 'ACCOUNT_EMAIL_VERIFY_KEY',
  ACCOUNT_COULD_NOT_VERIFIED: 'ACCOUNT_COULD_NOT_VERIFIED',
  ACCOUNT_VERIFIED: 'ACCOUNT_VERIFIED',
  ACCOUNT_FIND_BY_USERNAME: 'ACCOUNT_FIND_BY_USERNAME',
  ACCOUNT_RESET_PASSWORD_FAILED: 'ACCOUNT_RESET_PASSWORD_FAILED',
  ACCOUNT_PASSWORD_RESETTED: 'ACCOUNT_PASSWORD_RESETTED',
  ACCOUNT_PASSWORD_UPDATED: 'ACCOUNT_PASSWORD_UPDATED',
  ACCOUNT_FIND_ROLES_BY_ID: 'ACCOUNT_FIND_ROLES_BY_ID',
  ACCOUNT_EMAIL_UPDATED: 'ACCOUNT_EMAIL_UPDATED',
  ACCOUNT_SENT_FRIEND_REQUEST: 'ACCOUNT_SENT_FRIEND_REQUEST',
  ACCOUNT_FIND_FRIEND_REQUESTS: 'ACCOUNT_FIND_FRIEND_REQUESTS',
  ACCOUNT_FIND_SENT_FRIEND_REQUESTS: 'ACCOUNT_FIND_SENT_FRIEND_REQUESTS',
  ACCOUNT_ACCEPT_FRIEND_REQUEST: 'ACCOUNT_ACCEPT_FRIEND_REQUEST',
  ACCOUNT_DECLINE_FRIEND_REQUEST: 'ACCOUNT_DECLINE_FRIEND_REQUEST'
}

module.exports = ({ accountRepository: Account }) => {
  const findById = async (call, callback, next) => {
    const [ err, account ] = await to(Account.findById(call.request.id));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_FIND_BY_ID });
  }

  const create = async (call, callback, next) => {
    const [ err ] = await to(Account.create(call.request.account));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_CREATED });
  }

  const update = async (call, callback, next) => {
    const [ err ] = await to(Account.update(call.request));
    if (err) return next(err);

    callback(null, { success: false, message: messages.ACCOUNT_UPDATED});
  }

  const remove = async (call, callback, next) => {
    const [ err ] = await to(Account.remove(call.request.id));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_REMOVED });
  }

  const removeMany = async (call, callback, next) => {
    const { ids } = call.request;
    const [ err ] = await to(Account.removeMany({ ids }));
    if (err) return next(err);

    callback(null, { success: false, message: messages.ACCOUNT_REMOVED_MANY });
  }

  const newEmailVerifyKey = async (call, callback, next) => {
    const [ err, { email, verifyEmailKey } ] = await to(Account.newEmailVerifyKey(call.request));
    if (err) return next(err);

    if (!email)
      return callback(null, { success: false, message:  messages.ACCOUNT_EMAIL_NOT_PROVIDED });

    callback(null, { success:true, message: messages.ACCOUNT_EMAIL_VERIFY_KEY });
  }

  const verifyEmail = async (call, callback, next) => {
    const [ err, result ] = await to(Account.verifyEmail(call.request));
    if(err) return next(err);

    if (!result)
       return callback({ success: false, message: messages.ACCOUNT_COULD_NOT_VERIFIED });

    callback({ success: false, message: messages.ACCOUNT_VERIFIED });
  }

  const findByUsername = async (call, callback, next) => {
    const [ err, account ] = await to(Account.findByUsername(call.request.username));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_FIND_BY_USERNAME, account })
  }

  const resetPassword = async (call, callback, next) => {
    const [ err, result ] = await to(Account.resetPassword(call.request));
    if (err) return next(err);

    if (!result)
       return callback(null, { success: false, message: messages.ACCOUNT_RESET_PASSWORD_FAILED});

    callback(null, { success: true, message: messages.ACCOUNT_PASSWORD_RESETTED });
  }

  const updatePasswordById = async (call, callback, next) => {
    const [ err, result ] = await to(Account.updatePasswordById(call.request));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_PASSWORD_UPDATED});
  }

  const findRolesById = async (call, callback, next) => {
    const [ err, roles ] = await to(Account.findRolesById(call.request.id));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_FIND_ROLES_BY_ID });
  }

  const updateEmailById = async (call, callback, next) => {
    const [ err ] = await to(Account.updateEmailById(call.request));
    if (err) return next(err);

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

    callback(null, { success: true, message: messages.ACCOUNT_FIND_FRIEND_REQUESTS });
  }

  const findSentFriendRequests = async (call, callback, next) => {
    const [ err, sentFriendRequests ] = await to(Account.findSentFriendRequests({ _id: call.request._id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_FIND_SENT_FRIEND_REQUESTS });
  }

  const acceptFriendRequest = async (call, callback, next) => {
    const { sender_id, target_id } = call.request;
    const [ err ] = await to(Account.acceptFriendRequest({ sender_id, target_id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_ACCEPT_FRIEND_REQUEST });
  }

  const declineFriendRequest = async (call, callback, next) => {
    const { sender_id, target_id } = call.request;
    const [ err ] = await to(Account.declineFriendRequest({ sender_id, target_id }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.ACCOUNT_DECLINE_FRIEND_REQUEST }); 
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
    updatePasswordById,
    updateEmailById,
    sendFriendRequest,
    findFriendRequests,
    findSentFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
  }
}
