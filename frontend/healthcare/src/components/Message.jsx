import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const formattedTime = extractTime(message.createdAt);

  // Determine if the message is sent or received to apply styling
  const isSentMessage = message.senderId === authUser._id;
  const messageAlignment = isSentMessage ? "justify-end" : "justify-start";
  const bubbleBgcolor = isSentMessage ? "bg-blue-500" : "bg-gray-500"; // Example to differentiate sent and received messages

  return (
    <div className={`flex ${messageAlignment} mb-2`}>
      <div
        className={`chat-bubble text-white max-w-xs px-4 py-2 rounded-lg ${bubbleBgcolor}`}
      >
        <div>{message.message}</div>
        <div className="chat-footer opacity-50 text-xs mt-1">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
