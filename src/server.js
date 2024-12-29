import express from "express";
import cors from "cors";

import  contactsRouter  from "./routers/contacts.js";

import { getEvtVar } from "./utils/getEnvVar.js";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const setupServer = () => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(logger);

	app.use("/contacts", contactsRouter);

	app.use(notFoundHandler);

	app.use(errorHandler);

	const port = Number(getEvtVar("PORT", 3000));

	app.listen(port, () => console.log("Server running on 3000 port"));
};
