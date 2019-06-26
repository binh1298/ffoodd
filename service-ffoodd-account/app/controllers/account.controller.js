'use strict';

const { to } = require('await-to-js');

const messages = {
  FIND_ACCOUNT_BY_ID: 'FIND_ACCOUNT_BY_ID',
  ACCOUNT_CREATED: 'ACCOUNT_CREATED',
  ACCOUNT_UPDATED: 'ACCOUNT_UPDATED',
  ACCOUNT_REMOVED: 'ACCOUNT_REMOVED',
  EMAIL_NOT_PROVIDED: 'EMAIL_NOT_PROVIDED',
  EMAIL_VERIFY_KEY: 'EMAIL_VERIFY_KEY',
  COULD_NOT_VERIFIED: 'COULD_NOT_VERIFIED',
  ACCOUNT_VERIFIED: 'ACCOUNT_VERIFIED',
  FIND_BY_USERNAME: 'FIND_BY_USERNAME',
  RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED',
  PASSWORD_RESETTED: 'PASSWORD_RESETTED',
  PASSWORD_UPDATED: 'PASSWORD_UPDATED',
  FIND_ROLES_BY_ID: 'FIND_ROLES_BY_ID',
  EMAIL_UPDATED: 'EMAIL_UPDATED'
}

module.exports = ({ accountRepository: Account }) => {
  const findById = async (call, callback, next) => {
    const [ err, account ] = await to(Account.findById(call.request.id));
    if (err) return next(err);

    callback(null, { success: true, message: messages.FIND_ACCOUNT_BY_ID });
  }

  const create = async (call, callback, next) => {
    const [ err ] = await to(Account.create(call.request));
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

  const newEmailVerifyKey = async (call, callback, next) => {
    const [ err, { email, verifyEmailKey } ] = await to(Account.newEmailVerifyKey(call.request));
    if (err) return next(err);

    if (!email)
      return callback(null, { success: false, message:  messages.EMAIL_NOT_PROVIDED });

    callback(null, { success:true, message: messages.EMAIL_VERIFY_KEY });
  }

  const verifyEmail = async (call, callback, next) => {
    const [ err, result ] = await to(Account.verifyEmail(call.request));
    if(err) return next(err);

    if (!result)
       return callback({ success: false, message: messages.COULD_NOT_VERIFIED });

    callback({ success: false, message: messages.ACCOUNT_VERIFIED });
  }

  const findByUsername = async (call, callback, next) => {
    const [ err, account ] = await to(Account.findByUsername(call.request.username));
    if (err) return next(err);

    callback(null, { success: true, message: messages.FIND_BY_USERNAME, account })
  }

  const resetPassword = async (call, callback, next) => {
    const [ err, result ] = await to(Account.resetPassword(call.request));
    if (err) return next(err);

    if (!result)
       return callback(null, { success: false, message: messages.RESET_PASSWORD_FAILED});

    callback(null, { success: true, message: messages.PASSWORD_RESETTED });
  }

  const updatePasswordById = async (call, callback, next) => {
    const [ err, result ] = await to(Account.updatePasswordById(call.request));
    if (err) return next(err);

    callback(null, { success: true, message: messages.PASSWORD_UPDATED});
  }

  const findRolesById = async (call, callback, next) => {
    const [ err, roles ] = await to(Account.findRolesById(call.request.id));
    if (err) return next(err);

    callback(null, { success: true, message: messages.FIND_ROLES_BY_ID });
  }

  const updateEmailById = async (call, callback, next) => {
    const [ err ] = await to(Account.updateEmailById(call.request));
    if (err) return next(err);

    callback(null, { success: true, message: messages.EMAIL_UPDATED });
  }

  return {
    findById,
    create,
    update,
    remove,
    newEmailVerifyKey,
    verifyEmail,
    findByUsername,
    resetPassword,
    updatePasswordById
  }
}
