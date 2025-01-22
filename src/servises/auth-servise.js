import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';

import UserCollections from '../db/models/Users.js';
import SessionCollections from '../db/models/Session.js';

import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';
import { isDataHandler } from '../utils/isDataHandler.js';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth.js';
import { passwordTemplatesPath } from '../constants/index.js';

const appDomain = getEnvVar('APP_DOMAIN');
const jwtToken = getEnvVar('JWT_SECRET');
const passwordTemplatesSourse = await readFile(passwordTemplatesPath, 'utf-8');
const template = Handlebars.compile(passwordTemplatesSourse);
const createSessionData = () => ({
  accessToken: randomBytes(35).toString('base64'),
  refreshToken: randomBytes(35).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifeTime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
});
const error401Handler = (obj) => {
  if (!obj) {
    throw createHttpError(401, 'Email or password invalid');
  }
};

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UserCollections.create({
    ...payload,
    password: hashPassword,
  });
  const { _id, email, name } = newUser;
  return {
    _id: _id,
    email: email,
    name: name,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollections.findOne({ email });
  error401Handler(user);

  const passwordCompare = await bcrypt.compare(password, user.password);
  error401Handler(passwordCompare);

  await SessionCollections.deleteOne({ userId: user._id });

  const sessionData = createSessionData();
  return SessionCollections.create({
    userId: user._id,
    ...sessionData,
  });
};

export const refresh = async (payload) => {
  const oldSession = await SessionCollections.findOne({
    _id: payload.sessionId,
    refreshToken: payload.refreshToken,
  });

  if (!oldSession) {
    throw createHttpError(401, 'Session not found.');
  }

  if (Date.now() > oldSession.refreshTokenLifeTime) {
    throw createHttpError(401, 'Refresh token expired.');
  }

  await SessionCollections.deleteOne({ _id: payload.sessionId });
  const sessionData = createSessionData();

  const newSession = await SessionCollections.create({
    userId: oldSession.userId,
    ...sessionData,
  });

  return newSession;
};

export const logout = async (sessionId) =>
  await SessionCollections.deleteOne({ _id: sessionId });

export const getUser = (filter) => UserCollections.findOne(filter);

export const getSession = (filter) => SessionCollections.findOne(filter);

export const requestResetToken = async (email) => {
  const user = await UserCollections.findOne({ email });
  isDataHandler(user, 'User');

  const resetToken = jwt.sign({ email }, jwtToken, { expiresIn: '60m' });

  const html = template({
    link: `${appDomain}/reset-password?token=${resetToken}`,
  });

  const resetPaswordmailOptions = {
    subject: 'Password Reset',
    to: email,
    html,
  };

  const result = await sendEmail(resetPaswordmailOptions);
  if (!result) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const { email } = jwt.verify(token, jwtToken);
    const user = await UserCollections.findOne({ email });
    isDataHandler(user, 'User');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserCollections.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
    );

    await SessionCollections.deleteOne({ userId: user._id });
  } catch (err) {
    console.log('Token verification error:', err);
    console.log(err);
    throw createHttpError(401, 'Token is expired or invalid.');
  }
};
