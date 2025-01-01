import ContactCollections from '../db/models/Contacts.js';

export const getContacts = () => ContactCollections.find();
export const getContactsById = (id) => ContactCollections.findById(id);
export const addContact = (payload) => ContactCollections.create(payload);
export const updateContact = async (_id, payload) => {
  const result = await ContactCollections.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};
export const deleteContact = (filter) =>
  ContactCollections.findOneAndDelete(filter);
