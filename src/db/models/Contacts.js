import { Schema, model } from 'mongoose';

import { contactsType } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: contactsType,
      default: 'personal',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
contactsSchema.post('save', handleSaveError);
contactsSchema.pre('findOneAndUpdate', setUpdateSettings);
contactsSchema.post('findOneAndUpdate', handleSaveError);
export const sortByList = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];
const ContactCollections = model('contact', contactsSchema);

export default ContactCollections;
