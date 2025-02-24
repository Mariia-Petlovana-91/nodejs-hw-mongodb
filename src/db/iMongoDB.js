import mongoose from "mongoose";
import { getEvtVar } from "../utils/getEnvVar.js";

const user = getEvtVar("MONGODB_USER");
const password = getEvtVar("MONGODB_PASSWORD");
const url = getEvtVar("MONGODB_URL");
const name = getEvtVar("MONGODB_DB");

export const iMondoDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${name}?retryWrites=true&w=majority&appName=Cluster0`);
		console.log("database is connect");
	} catch (error) {
		console.log(`Error ${error.message}`);
		throw error;
	}
};
