import createHttpError from 'http-errors';
export const error401Handler = (obj) => {
  if (!obj) {
    throw createHttpError(401, 'Email or password invalid');
  }
};
