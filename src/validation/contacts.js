import Joi from 'joi';
import { contactsType } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Invalid number of characters. Minimum is 3.',
    'string.max': 'Invalid number of characters. Maximum is 20.',
    'any.required': 'Name is required.',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Invalid number of characters. Minimum is 3.',
    'string.max': 'Invalid number of characters. Maximum is 20.',
    'any.required': 'Phone number is required.',
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).min(3).max(20).messages({
    'string.email': 'Invalid email format. Example: example.com',
    'string.min': 'Invalid number of characters. Minimum is 3.',
    'string.max': 'Invalid number of characters. Maximum is 20.',
  }),
  isFavourite: Joi.boolean().required().messages({
    'any.required': 'The "isFavourite" field is required.',
  }),
  contactType: Joi.string()
    .valid(...contactsType)
    .required()
    .messages({
      'any.only': `Contact type must be one of: ${contactsType.join(', ')}.`,
      'any.required': 'Contact type is required.',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Invalid number of characters. Minimum is 3.',
    'string.max': 'Invalid number of characters. Maximum is 20.',
    'any.required': 'Name is required.',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.min': 'Invalid number of characters. Minimum is 3.',
    'string.max': 'Invalid number of characters. Maximum is 20.',
    'any.required': 'Phone number is required.',
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).min(3).max(20).messages({
    'string.email': 'Invalid email format. Example: example.com',
    'string.min': 'Invalid number of characters. Minimum is 3.',
    'string.max': 'Invalid number of characters. Maximum is 20.',
  }),
  isFavourite: Joi.boolean().messages({
    'any.required': 'The "isFavourite" field is required.',
  }),
  contactType: Joi.string()
    .valid(...contactsType)
    .messages({
      'any.only': `Contact type must be one of: ${contactsType.join(', ')}.`,
      'any.required': 'Contact type is required.',
    }),
});
