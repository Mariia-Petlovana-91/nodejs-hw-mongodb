import nodemailer from 'nodemailer';
import 'dotenv/config';

const { SMTP_KEY, SMTP_USER, SMTP_HOST, SMTP_PORT, SMTP_EMAIL } = process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const mailOptions = {
  from: SMTP_EMAIL,
  to: 'sanel73355@dfesc.com',
  subject: 'Password Reset',
  html: `
    <p>Hello,</p>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="#">Reset Password</a>
    <p>If you didn’t request this, please ignore this email.</p>
  `,
};

const sendEmail = async () => {
  console.log('hvbwkjvwekvew');
  try {
    const info = await transport.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendEmail();
