const { to } = require('await-to-js')
const Account = require('../repositories/account.repository');

const messages = {
  CREATE_ACCOUNT: 'CREATE_ACCOUNT',
  EMAIL_NOT_PROVIDED: 'EMAIL_NOT_PROVIDED',
  EMAIL_VERIFY_KEY: 'EMAIL_VERIFY_KEY',
  FIND_BY_USERNAME: 'FIND_BY_USERNAME',
  RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED',
  PASSWORD_RESETTED: 'PASSWORD_RESETTED'
}

const create = async (call, callback, next) => {
  const [ err, account ] = await to(Account.create(call.request));
  if (err) return next(err);

  //sendEmail create account

  callback(null, { success: true, message: messages.CREATE_ACCOUNT });
}

const newEmailVerifyKey = async (call, callback, next) => {
  const [ err, { email, emailVerifyKey } ] = await to(Account.newEmailVerifyKey(call.request));
  if (err) return next(err);

  if (!email)
    return callback(null, { success: false, message:  messages.EMAIL_NOT_PROVIDED });

  // sendEmail newKey

  callback(null, { success:true, message: messages.EMAIL_VERIFY_KEY });
}

const verifyEmail = async (call, callback, next) => {

}

const findByUsername = async (call, callback, next) => {
  const [ err, account ] = await to(Account.findByUsername(call.request.username));
  if (err) return next(err);

  callback(null, { success: true, message: messages.FIND_BY_USERNAME, account })
}

const resetPassword = async (call, callback, next) => {
  const { username, password, key } = call.request;
  const [ err, result ] = await to(Account.resetPassword({ username, password, key }));
  if (err) return next(err);

  if (!result)
     return callback(null, { success: false, message: messages.RESET_PASSWORD_FAILED});

  callback(null, { success: true, message: PASSWORD_RESETTED });
}

module.exports = {
  create,
  newEmailVerifyKey,
  verifyEmail,
  findByUsername,
  resetPassword
}
