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
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
      templateId: options.templateId,
      substitutionWrappers: ['{{', '}}'],
      substitutions: options.substitutions,
      attachments: options.attachments,
      categories: options.categories,
      sendAt: options.sendAt,
      headers: {
        'X-CustomHeader': options.customHeader,
      },
      sections: {},
      customArgs: options.customArgs,
      batchId: options.batchId,
      ipPoolName: options.ipPoolName,
      mailSettings: {},
      trackingSettings: {},
    };

    const [ err ] = await to(sgMail.send(msg));
    if (err) throw err;

    logger.info(`Email with subject *${options.subject}* has been sent to`, { to: options.recipients });
  }

  return {
    send
  };
}
