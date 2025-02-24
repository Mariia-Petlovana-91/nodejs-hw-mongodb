import * as ContactsServises from '../servises/contacts-servise.js';
import { isDataHandler } from '../utils/isDataHandler.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { sortByList } from '../db/models/Contacts.js';

import { parseContactsFilters } from '../utils/filters/parseContactsFilters.js';

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
  isDataHandler(data);

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await ContactsServises.addContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {

  isDataHandler(data);

  res.status(200).json({
    status: 200,
    message: 'Successfully updated the contact!',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const data = await ContactsServises.deleteContact({ _id, userId });
  isDataHandler(data);

  res.status(204).send();
};
