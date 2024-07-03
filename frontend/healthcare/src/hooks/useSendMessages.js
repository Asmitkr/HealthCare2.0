import React from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = React.useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    console.log("useSendMessage -> message", "check");
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      console.log("useSendMessage -> data", data);
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
