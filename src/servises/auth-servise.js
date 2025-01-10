import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import UserCollections from '../db/models/Users.js';
import SessionCollections from '../db/models/Session.js';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth.js';

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
  // текст для помилки конфлікту описувати можна вручну таким способом
  // const { email } = payload;
  // const user = await UserCollections.findOne({ email });
  // if (user) {
  //   throw createHttpError(409, 'Email in use');
  // }

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
