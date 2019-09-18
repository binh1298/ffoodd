require('dotenv').config();

const assert = require('assert');
const { to } = require('await-to-js');

const amqpConnector = require('../config/amqp/index');

let amqp;

describe('Account consumer', () => {
  before(() => {
    return amqpConnector.connect({ logger: console })
      .then(amqpConnection => amqp = amqpConnection);
  });

  // check in server's console

  it('should consumer create account', () => {
    amqp.sendToQueue({ queue: 'account', msg: {
      event: 'CREATE_ACCOUNT',
      data: {
        _id: 1,
        email: 'quangdatpham'
      }
    }});
  });

  it('should consumer update email', () => {
    amqp.sendToQueue({ queue: 'account', msg: {
      event: 'UPDATE_EMAIL',
      data: {
        _id: 1,
        email: 'quangdatpham'
      }
    }});
  });

  it('should consumer remove account', () => {
    amqp.sendToQueue({ queue: 'account', msg: {
      event: 'REMOVE_ACCOUNT',
      data: {
        _id: 1
      }
    }});
  });

});
