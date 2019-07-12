'use strict';

const { to } = require('await-to-js');

const messages = {
  EMAIL_SENT: 'EMAIL_SENT'
};

module.exports = ({ accountRepository: Account }) => {

  const send = async (call, callback, next) => {
    const emailOptions = call.request;

    callback(null, { success: true, message: messages.EMAIL_SENT });
  }

  return {
    send
  };
}
