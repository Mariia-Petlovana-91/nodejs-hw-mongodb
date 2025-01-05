import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import UserCollections from '../db/models/Users.js';
import SessionCollections from '../db/models/Session.js';

import { error401Handler } from '../utils/error401Handler.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth.js';

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

  const accessToken = randomBytes(35).toString('base64');
  const refreshToken = randomBytes(35).toString('base64');

  return SessionCollections.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  });
};
