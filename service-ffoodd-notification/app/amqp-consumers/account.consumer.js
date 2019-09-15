const { to } = require('await-to-js');

module.exports = ({ logger, amqp, accountRepository: Account }) => {
  
  const consume = async () => {
    
    logger.info('ACCOUNT_CONSUMER starting');

    amqp.consume({ queue: 'account' }, msg => {
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
        default:
          return;
      }

      consumeEvent(msg);
    })
  }

  const consumeCreateAccount = async msg => {
    const { _id, email } = msg.data;
    const [ err ] = await to(Account.create({ account_id: _id, email }));
    if (err) throw err;

    logger.info('ACCOUNT_CONSUMER create account', msg.data);
  }

  const consumeUpdateEmail = async msg => {
    const { _id, email } = msg.data;
    const [ err ] = await to(Account.update({ account_id: _id, email }));
    if (err) throw err;

    logger.info('ACCOUNT_CONSUMER update account', msg.data);
  }

  const consumeRemoveAccount = async msg => {
    const { _id } = msg.data;
    const [ err ] = await to(Account.remove({ account_id: _id }));
    if (err) throw err;

    logger.info('ACCOUNT_CONSUMER remove account', msg.data);
  }

  return { consume };
}
