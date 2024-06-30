import { useState } from "react";
import toast from "react-hot-toast";

const useReplyAppt = () => {
  const [loading, setLoading] = useState(false);

  const replyAppt = async (data) => {
    setLoading(true);
    console.log("claim data", data);
    try {
      const res = await fetch("/api/appointment/ReplyAppointment", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (resData.error) {
        throw new Error(resData.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, replyAppt };
};

export default useReplyAppt;
