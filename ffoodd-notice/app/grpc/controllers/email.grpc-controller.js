'use strict';

const { to } = require('await-to-js');

const messages = {
  EMAIL_SENT: 'EMAIL_SENT',
  EMAIL_SENT_TO_ONE_USER: 'EMAIL_SENT_TO_ONE_USER',
  EMAIL_SENT_TO_MANY_USERS: 'EMAIL_SENT_TO_MANY_USERS'
};

module.exports = ({ accountRepository: Account, email }) => {

  const send = async (call, callback, next) => {
    const { emailOptions } = call.request;

    const [ err ] = await to(email.send(emailOptions));
    if (err) return next(err);

    callback(null, { success: true, message: messages.EMAIL_SENT });
  }

  const sendToOneUser = async (call, callback, next) => {
    const { account_id, emailOptions } = call.request;
    const [ err0, account ] = await to(Account.findById({ account_id }));
    if (err0) return next(err0);

    const [ err1 ] = await to(email.send({ to: account.email, ...emailOptions }));
    if (err1) return next(err1);

    callback(null, { success: true, message: messages.EMAIL_SENT_TO_ONE_USER })
  }

  const sendToManyUsers = async (call, callback, next) => {
    const { account_ids, emailOptions } = call.request;
    const [ err0, accounts ] = await to(Account.findManyByIds({ account_ids }));
    if (err0) return next(err0);

    const emailAddresses = [];

    for (let a of accounts) {
      emailAddresses.push(a.email);
    }

    const [ err ] = await to(email.send({ to: emailAddresses, ...emailOptions }));
    if (err) return next(err);

    callback(null, { success: true, message: messages.EMAIL_SENT_TO_MANY_USERS })
  }

  return {
    send,
    sendToOneUser,
    sendToManyUsers
  };
}
