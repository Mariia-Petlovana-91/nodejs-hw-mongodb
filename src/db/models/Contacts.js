import { Schema, model} from "mongoose";

const contactsSchema = new Schema({
	name: {
		type: String,
		required:true
	},
	phoneNumber: {
		type: String,
		required:true
	},
	email: {
		type: String,
		required:false
	},
	isFavourite: {
		type: Boolean,
		default: false,
		required:true,
	},
	contactType: {
		type: String,
		enum: ["personal", "home"],
		default:"personal",
		required: true,
	}
},{
	versionKey:false,	timestamps: true
	},
);

const ContactCollections = model("contact", contactsSchema);

export default ContactCollections;
