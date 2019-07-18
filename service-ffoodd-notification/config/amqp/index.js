'use strict';

const amqp = require('amqplib/callback_api');

const connect = ({ logger }) => new Promise((resolve, reject) => {
  amqp.connect(process.env.AMQP_SERVER_ADDRESS, (err, connection) => {
    if (err) throw err;

    connection.createChannel(function(error1, channel) {
      if (error1)
        return reject(err);

      const sendToQueue = async ({ queue, msg }) => {
        logger.info(`[*] Send to queue: ${queue}, message: `, msg);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
      }

      const consume = ({ queue }) => new Promise((resolve, reject) => {
        channel.assertQueue(queue, {
          durable: false
        });

        logger.info(`[*] Waiting for messages in: ${queue}`);

        channel.consume(queue, msg => {
          logger.info(`[x] Receive message: ${msg.content.toString()} from queue: ${queue}`);

          resolve(JSON.parse(msg));
        }, {
          noAck: true
        });
      })

      resolve({ channel, sendToQueue, consume });
    });
  });
})

module.exports = { connect };
