const sgMail = require('@sendgrid/mail');
const { to } = require('await-to-js');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = ({ logger }) => {
  const sendEmail = async ({ recipients, sender, subject, text, html, cc, bcc, replyTo }) => {
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

  return {
    sendEmail
  };
}
