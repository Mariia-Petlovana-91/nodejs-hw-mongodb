import mongoose from "mongoose";
import createError from "http-errors";
import * as ContactsServises from "../servises/contacts-servise.js";

export const getContactsController = async (req, res) => {
	const data = await ContactsServises.getContacts();
	res.json({
		status: 200,
		message: "Successfully found contacts!",
		data,
	});
};

export const getContactsByIdController = async (req, res) => {
	const { contactId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(contactId)) {
		throw createError(400, "Invalid ID format");
	}
	const data = await ContactsServises.getContactsById(contactId);

	if (!data) {
		throw createError(404, "Contact not found");

		// (якщо треба вручну написати без бібліотеки,щоб змінювати статус використовуємо деструктуризацію у сервeрі і статус замінюється динамічно)
		// const error = new Error("Contact not found");
		// error.status = 404;
		// throw error;
	}

	res.json({
		status: 200,
		message: `Successfully found contact with id ${contactId}!`,
		data,
	});
};
