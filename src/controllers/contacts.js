import * as ContactsServises from '../servises/contacts-servise.js';

import { isDataHandler } from '../utils/isDataHandler.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { deleteFileFromCloudinary } from '../utils/deleteFileFromCloudinary.js';
import { parseContactsFilters } from '../utils/filters/parseContactsFilters.js';

import { sortByList } from '../db/models/Contacts.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactsFilters(req.query);
  filter.userId = req.user._id;

  const data = await ContactsServises.getContacts(
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  );

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await ContactsServises.getContact({ _id, userId });
  isDataHandler(data, 'Contact');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  let photo;
  if (req.file) {
    photo = await saveFileToCloudinary(req.file);
  }
  const { _id: userId } = req.user;
  const data = await ContactsServises.addContact({
    ...req.body,
    photo,
    userId,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;

  const existingContact = await ContactsServises.getContact({ _id, userId });
  isDataHandler(existingContact, 'Contact');

  let photo = existingContact.photo;

  if (req.file) {
    if (photo) {
      await deleteFileFromCloudinary(photo);
    }
    photo = await saveFileToCloudinary(req.file);
  }

  const updatedData = {
    ...req.body,
    photo,
  };

  const updatedContact = await ContactsServises.updateContact(
    { _id, userId },
    updatedData,
  );

  isDataHandler(updatedContact, 'Contact');

  res.status(200).json({
    status: 200,
    message: 'Successfully updated the contact!',
    data: updatedContact,
  });
};
export const deleteContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;

  const contact = await ContactsServises.getContact({ _id, userId });
  isDataHandler(contact, 'Contact');

  if (contact.photo) {
    await deleteFileFromCloudinary(contact.photo);
  }

  const data = await ContactsServises.deleteContact({ _id, userId });
  isDataHandler(data, 'Contact');

  res.status(204).send();
};
