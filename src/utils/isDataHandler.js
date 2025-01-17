import createHttpError from 'http-errors';
export const isDataHandler = (data, obj) => {
  if (!data) {
    throw createHttpError(404, `${obj} not found`);
  }
};
