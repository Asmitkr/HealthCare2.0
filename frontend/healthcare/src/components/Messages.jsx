// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import MessageSkeleton from "./skeletons/MessageSkeleton";
 import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
     useListenMessages();
  console.log("messages.jsx -> data", messages);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <p className="text-center text-sky-500 mt-4">No message found</p>
      )}
    </div>
  );
};

export default Messages;
