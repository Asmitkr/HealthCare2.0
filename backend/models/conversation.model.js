import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        participantId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'participants.participantModel'
        },
        participantModel: {
            type: String,
            enum: ['User', 'Doctor']
        }
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }]
}, { timestamps: true });

//conversationSchema.index({ "participants.participantId": 1, "participants.participantModel": 1 }, { unique: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
