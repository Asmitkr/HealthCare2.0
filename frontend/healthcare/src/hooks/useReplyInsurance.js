import { useState } from "react";
import toast from "react-hot-toast";

const useReplyInsurance = () => {
  const [loading, setLoading] = useState(false);

  const replyInsurance = async (data) => {
    setLoading(true);
    console.log(data);

    try {
      const res = await fetch("/api/insurance/ReplyInsurance", {
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

  return { loading, replyInsurance };
};

export default useReplyInsurance;
