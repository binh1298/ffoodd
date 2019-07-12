const sgMail = require('@sendgrid/mail');
const { to } = require('await-to-js');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = ({ logger }) => {

  const send = async options => {
    const msg = {
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      from: options.from,
      subject: options.subject,
      substitutionWrappers: ['{{', '}}'],
      substitutions: options.substitutions,
      attachments: options.attachments,
      categories: options.categories,
      headers: {
        'X-CustomHeader': options.customHeader,
      },
      sections: {},
      customArgs: options.customArgs,
      batchId: options.batchId,
      ipPoolName: options.ipPoolName,
      mailSettings: {},
      trackingSettings: {}
    };

    if (options.text)
      msg.text = options.text;

    if (options.html)
      msg.html = options.html;

    if (options.sendAt)
      msg.sendAt = parseInt(options.sendAt);

    if (options.replyTo)
      msg.replyTo = options.replyTo;

    if (options.templateId)
      msg.templateId = options.templateId;

    if (
      options.attachments
      && options.attachments.constructor === Array
      && options.attachments.length !== 0
    )
      msg.attachments = options.attachments;

    const [ err ] = await to(sgMail.send(msg));
    if (err) throw err;

    logger.info(`Email with subject *${options.subject}* has been sent to`, { to: options.to });
  }

  return {
    send
  };
}
