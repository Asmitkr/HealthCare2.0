import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendmessage = async (req, res) => {
    try {
        const { message } = req.body;
        let senderId, senderModel, receiverId, receiverModel;

        if (req.user) {
            // Authenticated as User
            receiverId = req.params.id;
            senderId = req.user._id;
            senderModel = 'User';
            receiverModel = 'Doctor';
        } else if (req.doctor) {
            // Authenticated as Doctor
            receiverId = req.params.id;
            senderId = req.doctor._id;
            senderModel = 'Doctor';
            receiverModel = 'User';
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let conversation = await Conversation.findOne({
            $or: [
                {
                    $and: [
                        { 'participants.participantId': senderId },
                        { 'participants.participantModel': senderModel },
                        { 'participants.participantId': receiverId },
                        { 'participants.participantModel': receiverModel }
                    ]
                },
                {
                    $and: [
                        { 'participants.participantId': receiverId },
                        { 'participants.participantModel': receiverModel },
                        { 'participants.participantId': senderId },
                        { 'participants.participantModel': senderModel }
                    ]
                }
            ]
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [
                    { participantId: senderId, participantModel: senderModel },
                    { participantId: receiverId, participantModel: receiverModel }
                ]
            });
        }

        const newMsg = new Message({
            senderId,
            senderModel,
            receiverId,
            receiverModel,
            message
        });

        if (newMsg) {
            conversation.messages.push(newMsg._id);
        }

        await Promise.all([conversation.save(), newMsg.save()]);

        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //     io.to(receiverSocketId).emit("newMessage", newMsg);
        // }

        res.status(200).json(newMsg);

    } catch (error) {
        console.error("Error in send message:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getmessage = async (req, res) => {
    try {
        let senderId, senderModel, receiverModel;
        const { id: ToChatId } = req.params;

        if (req.user) {
            // Authenticated as User
            senderId = req.user._id;
            senderModel = 'User';
            receiverModel = 'Doctor';
        } else if (req.doctor) {
            // Authenticated as Doctor
            senderId = req.doctor._id;
            senderModel = 'Doctor';
            receiverModel = 'User';
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const conversation = await Conversation.findOne({
            $or: [
                {
                    $and: [
                        { 'participants.participantId': senderId },
                        { 'participants.participantModel': senderModel },
                        { 'participants.participantId': ToChatId },
                        { 'participants.participantModel': receiverModel }
                    ]
                },
                {
                    $and: [
                        { 'participants.participantId': ToChatId },
                        { 'participants.participantModel': receiverModel },
                        { 'participants.participantId': senderId },
                        { 'participants.participantModel': senderModel }
                    ]
                }
            ]
        }).populate({
            path: 'messages',
            populate: [
                { path: 'senderId', model: senderModel },
                { path: 'receiverId', model: receiverModel }
            ]
        });

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.error("Error in get message:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
