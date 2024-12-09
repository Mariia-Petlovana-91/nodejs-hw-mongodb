import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEvtVar } from "./utils/getEnvVar.js";
import * as ContactsServises from "./servises/contacts-servise.js";

export const setupServer = () => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(pino({
		transport: {
			target: "pino-pretty"
		}
	}));

	app.get("/contacts", async (req, res) => {
		const data = await ContactsServises.getContacts();
		res.json({
			status: 200,
			message: "Successfully found contacts!",
			data,
		});
	});

	app.get("/contacts/:contactId", async (req, res) => {
		const { contactId } = req.params;
		const data = await ContactsServises.getContactsById(contactId);

		if (!data) {
			return res.status(404).json({
				status: 404,
				message: "Contact not found"
			});
		}

		res.json({
			status: 200,
			message: `Successfully found contact with id ${contactId}!`,
			data,
		});
	});

	app.use((req, res) => {
		res.status(404).json({
			message: 'Not found'
		});
	});

	const port = Number(getEvtVar("PORT", 3000));

	app.listen(port, () => console.log("Server running on 3000 port"));
};
