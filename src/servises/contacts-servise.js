import ContactCollections from "../db/models/Contacts.js";

export const getContacts = () => ContactCollections.find();
export const getContactsById = id => ContactCollections.findById(id);
