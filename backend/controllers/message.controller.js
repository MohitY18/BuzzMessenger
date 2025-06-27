import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
     try{
            const {message} = req.body;
            const {id:receiverId} = req.params; //Renaming id with Receiver Id;
            const senderId = req.user._id; //This user object has been created in ProtectRoute;
     
         let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },  // With $all, you match [A,B], [B,A] all matches conversation will be provided.
	    });

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel (instead of saving individually save parallely);
		await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

        }
     catch(error){
         console.log("Error in Sending Message",error.meessage);
         res.status(500).json({error:'Internal Server Error'});
     }
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); //Using populate:- Instead of storing the id of messages(in messages array) we will get whole message object with that id;
                           

        if (!conversation) return res.status(200).json([]); //If conversation does not exist;

		const messages = conversation.messages;
		res.status(200).json(messages); //It will return the array of messages object between those two people;

	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
