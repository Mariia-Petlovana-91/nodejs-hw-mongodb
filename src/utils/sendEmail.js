import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar.js';

const key = getEnvVar('SMTP_KEY');
const user = getEnvVar('SMTP_USER');
const host = getEnvVar('SMTP_HOST');
const port = getEnvVar('SMTP_PORT');
const from = getEnvVar('SMTP_FROM');

const nodemailerConfig = {
  host: host,
  port: port,
  secure: false,
  auth: {
    user: user,
    pass: key,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (data) => {
  const email = { ...data, from: from };
  return transport.sendMail(email);
};
