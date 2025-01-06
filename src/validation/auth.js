import Joi from 'joi';

import { regulaкExpressionEmail } from '../constants/auth.js';

export const authRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Invalid(name) number of characters. Minimum is 3.',
    'string.max': 'Invalid(name) number of characters. Maximum is 20.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().pattern(regulaкExpressionEmail).required().messages({
    'any.required': 'Email number is required.',
  }),
  password: Joi.string().min(6).messages({
    'string.min': 'Invalid(password) number of characters. Minimum is 6.',
  }),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(regulaкExpressionEmail).required().messages({
    'any.required': 'Email number is required.',
  }),
  password: Joi.string().min(6).messages({
    'string.min': 'Invalid(password) number of characters. Minimum is 6.',
  }),
});
