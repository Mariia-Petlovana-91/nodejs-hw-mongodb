import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const isValidMondoose = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(400, 'Invalid ID format');
  }
};
