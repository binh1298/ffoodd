'use strict';

const { to } = require('await-to-js');

const messages = {
  EMAIL_SENT: 'EMAIL_SENT'
};

module.exports = ({ accountRepository: Account, email }) => {

  const send = async (call, callback, next) => {
    const emailOptions = call.request;
    
    const [ err ] = await to(email.send(emailOptions));
    if (err) return next(err);
    
    callback(null, { success: true, message: messages.EMAIL_SENT });
  }

  return {
    send
  };
}
