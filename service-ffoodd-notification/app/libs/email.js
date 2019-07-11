const sgMail = require('@sendgrid/mail');
const { to } = require('await-to-js');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = ({ logger }) => {

  const send = async options => {
    const { recipients, sender, subject, text, html, cc, bcc, replyTo } = options;

    const [ err ] = await to(sgMail.send({
      to: recipients,
      cc,
      bcc,
      from: sender,
      replyTo,
      subject,
      text,
      html
    }));
    if (err) throw err;

    logger.info(`Email with subject *${subject}* has been sent to`, recipients);
  }

  const sendWithTemplate = async options => {
    const { recipients, sender, subject, text, html, cc, bcc, replyTo, templateId, dynamicTemplateData } = options;
    
    const [ err ] = await to(sgMail.send({
      to: recipients,
      cc,
      bcc,
      from: sender,
      replyTo,
      subject,
      text,
      html,
      templateId,
      dynamic_template_data: dynamicTemplateData
    }));

    logger.info(`Email with subject *${subject}* has been sent to`, recipients);
  }

  return {
    send,
    sendWithTemplate
  };
}
