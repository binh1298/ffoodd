const { to } = require('await-to-js');

module.exports = ({ amqp, accountRepository: Account }) => {
  
  const consume = async () => {
    const [ err0, msg ] = await to(amqp.consume({ queue: 'account' }));
    if (err0) throw err0;

    const { event, data } = msg;
    let consumeEvent;

    switch (event) {
      case 'CREATE_ACCOUNT':
        consumeEvent = consumeCreateAccount;
        break;
      case 'UPDATE_EMAIL':
        consumeEvent = consumeUpdateEmail;
        break;
      case 'REMOVE_ACCOUNT':
        consumeEvent = consumeRemoveAccount;
        break;
    }

    const [ err1 ] = await to(consumeEvent(msg));
    if (err1) throw err1;
  }

  const consumeCreateAccount = async msg => {
    const { _id, email } = msg.data;
    const [ err ] = await to(Account.create({ account_id: _id, email }));
    if (err) throw err;
  }

  const consumeUpdateEmail = async msg => {
    const { _id, email } = msg.data;
    const [ err ] = await to(Account.udpate({ account_id: _id, email }));
    if (err) throw err;
  }

  const consumeRemoveAccount = async msg => {
    const { _id } = msg.data;
    const [ err ] = await to(Account.remove({ account_id: _id }));
    if (err) throw err;
  }

  return { consume };
}
