const sgMail = require('@sendgrid/mail');
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function sendEmail(to, subject, text, attachments = []) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    text,
    attachments: attachments.map(a => ({
      content: Buffer.from(fs.readFileSync(a.path)).toString('base64'),
      filename: a.filename || 'attachment.pdf',
      type: 'application/pdf',
      disposition: 'attachment'
    }))
  };
  try {
    await sgMail.send(msg);
    console.log('Email sent to', to);
    return true;
  } catch (err) {
    console.error('SendGrid error', err?.response?.body || err.message);
    throw err;
  }
};
