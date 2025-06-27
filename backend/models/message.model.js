import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId, //This field will store an ObjectId — a special ID used by MongoDB.
			ref: "User", //	This links (references) the ID to a document from the User collection — like a foreign key in SQL.
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		// createdAt, updatedAt
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;