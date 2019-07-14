'use strict';

const amqp = require('amqplib/callback_api');

const connect = ({ logger }) => async () => {
  amqp.connect(process.env.AMQP_SERVER_ADDRESS, (err, connection) => {
    if (err) throw err;

    connection.createChannel(function(error1, channel) {
      if (error1)
        throw error1;

      const sendToQueue = async ({ queue, msg }) => {
        logger.log(`[*] Send to queue: ${queue}, message: ${msg}`);
        channel.sendToQueue(queue, Buffer.from(msg));
      }

      const consume = async ({ queue }) => {
        channel.assertQueue(queue, {
          durable: false
        });

        logger.log(`[*] Waiting for messages in: ${queue}`);

        channel.consume(queue, msg => {
          logger.log(`[x] Receive message: ${msg.content.toString()} from queue: ${queue}`);
        }, {
          noAck: true
        });
      }

      return {
        channel,
        sendToQueue,
        consume
      }
    });
  });
}

module.exports = connect;
