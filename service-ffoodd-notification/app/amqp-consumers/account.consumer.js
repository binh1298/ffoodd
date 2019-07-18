const { to } = require('await-to-js');

module.exports = ({ amqp }) => {
  
  const consume = async () => {
    consumeCreateAccount();
  }

  const consumeCreateAccount = async () => {
    const [ err, msg ] = await to(amqp.consume({ queue: 'account' }));
    if (err) throw err;

    const { event, data } = msg;
  }

  return consume;
}
