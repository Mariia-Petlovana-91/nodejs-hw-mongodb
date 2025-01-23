import ContactCollections from '../db/models/Contacts.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async (
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const dataQuery = ContactCollections.find();

  if (filter.userId) {
    dataQuery.where('userId').equals(filter.userId);
  }

  if (filter.isFavourite !== undefined) {
    dataQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    dataQuery.where('contactType').equals(filter.contactType);
  }

  const total = await ContactCollections.find()
    .merge(dataQuery)
    .countDocuments();

  const data = await dataQuery

    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calcPaginationData(page, perPage, total);

  return {
    data,
    ...paginationData,
  };
};

export const getContact = (filter) => ContactCollections.findOne(filter);

export const addContact = (payload) => ContactCollections.create(payload);

export const updateContact = async (filter, payload) => {
  const result = await ContactCollections.findOneAndUpdate(filter, payload, {
    new: true,
  });
  return result;
};

export const deleteContact = (filter) =>
  ContactCollections.findOneAndDelete(filter);
